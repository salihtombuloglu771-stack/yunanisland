import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { days, adults, budgetLevel, style, islandSlug } = body as {
    days: number
    adults: number
    budgetLevel: 'budget' | 'mid' | 'luxury'
    style: 'romantic' | 'family' | 'adventure' | 'nightlife' | 'relax'
    islandSlug?: string
  }

  if (!days || days < 1 || days > 14) {
    return NextResponse.json({ error: 'Gün sayısı 1-14 arasında olmalı.' }, { status: 400 })
  }

  const supabase = await createClient()

  let islandsQuery = supabase.from('islands').select('id, name, slug, description, budget_level, best_time_to_visit').eq('is_published', true)
  if (islandSlug) islandsQuery = islandsQuery.eq('slug', islandSlug)
  const { data: islands } = await islandsQuery

  const islandIds = (islands ?? []).map((i) => i.id)

  const [{ data: beaches }, { data: restaurants }, { data: hotels }] = await Promise.all([
    supabase.from('beaches').select('name, island_id, beach_type, family_friendly, sunset_rating').in('island_id', islandIds),
    supabase.from('restaurants').select('name, island_id, cuisine, price_level, sea_view').in('island_id', islandIds).eq('price_level', budgetLevel === 'budget' ? 'budget' : budgetLevel === 'luxury' ? 'expensive' : 'mid'),
    supabase.from('hotels').select('name, island_id, category, price_range').in('island_id', islandIds),
  ])

  const context = (islands ?? []).map((island) => {
    const islandBeaches = (beaches ?? []).filter((b) => b.island_id === island.id).map((b) => b.name)
    const islandRestaurants = (restaurants ?? []).filter((r) => r.island_id === island.id).map((r) => `${r.name} (${r.cuisine ?? 'genel'})`)
    const islandHotels = (hotels ?? []).filter((h) => h.island_id === island.id).map((h) => `${h.name} (${h.category})`)
    return `### ${island.name}\n${island.description ?? ''}\nEn iyi ziyaret zamanı: ${island.best_time_to_visit ?? 'belirtilmemiş'}\nPlajlar: ${islandBeaches.join(', ') || 'yok'}\nRestoranlar: ${islandRestaurants.join(', ') || 'yok'}\nOteller: ${islandHotels.join(', ') || 'yok'}`
  }).join('\n\n')

  if (!context) {
    return NextResponse.json({ error: 'Seçilen kriterlere uygun veri bulunamadı.' }, { status: 400 })
  }

  const styleLabels: Record<string, string> = {
    romantic: 'romantik / balayı',
    family: 'aile dostu',
    adventure: 'macera / aktivite odaklı',
    nightlife: 'gece hayatı / eğlence odaklı',
    relax: 'sakin / dinlenme odaklı',
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `Sen Yunanisland adlı bir Yunan Adaları gezi platformunun AI seyahat planlayıcısısın. SADECE sana verilen gerçek ada/plaj/restoran/otel verilerini kullanarak bir gezi planı oluştur — asla var olmayan yer/isim uydurma. Yanıtı şu JSON şemasıyla ver: {"title": string, "summary": string, "days": [{"day": number, "title": string, "activities": string[]}], "tips": string[]}. Türkçe yaz.`,
        },
        {
          role: 'user',
          content: `${days} günlük, ${adults} yetişkin için, ${budgetLevel === 'budget' ? 'bütçe dostu' : budgetLevel === 'luxury' ? 'lüks' : 'orta segment'} bütçeli, ${styleLabels[style]} tarzda bir gezi planı hazırla.\n\nKullanabileceğin gerçek veriler:\n\n${context}`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) {
      return NextResponse.json({ error: 'AI yanıt üretemedi.' }, { status: 500 })
    }

    const plan = JSON.parse(raw)
    return NextResponse.json({ plan })
  } catch (err) {
    if (err instanceof OpenAI.APIError && err.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'AI servisi şu anda kullanılamıyor (OpenAI hesap bakiyesi/faturalama gerekiyor). Lütfen daha sonra tekrar deneyin.' },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: 'Gezi planı oluşturulurken bir hata oluştu.' }, { status: 500 })
  }
}
