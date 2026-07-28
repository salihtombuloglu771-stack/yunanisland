import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata = {
  title: 'Gizlilik Politikası — Yunanisland',
  description: 'Yunanisland gizlilik politikası ve çerez kullanımı hakkında bilgi.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16 prose dark:prose-invert prose-sm sm:prose-base">
        <h1>Gizlilik Politikası</h1>
        <p className="text-sm text-neutral-500 not-prose mb-6">Son güncelleme: Temmuz 2026</p>

        <p>
          Bu sayfa Yunanisland (&quot;biz&quot;, &quot;site&quot;) tarafından hangi verilerin toplandığını,
          nasıl kullanıldığını ve ziyaretçilerin haklarını genel hatlarıyla açıklar. Bu metin genel bir
          bilgilendirme şablonudur; site üzerinden reklam veya ticari faaliyet yürütülmeye başlanmadan
          önce bir hukuk danışmanına gösterilmesi önerilir.
        </p>

        <h2>Topladığımız Veriler</h2>
        <ul>
          <li><strong>Hesap bilgileri:</strong> Kayıt olduğunuzda e-posta adresiniz ve (varsa) adınız Supabase üzerinde güvenle saklanır.</li>
          <li><strong>Kullanım verileri:</strong> Hangi sayfaları ziyaret ettiğiniz ve arama sorgularınız, siteyi geliştirmek amacıyla anonim istatistiksel olarak kaydedilir.</li>
          <li><strong>Çerezler:</strong> Dil tercihiniz (TR/EN/EL) ve açık/koyu tema tercihiniz tarayıcınızda çerez/localStorage olarak saklanır. Bunlar zorunlu, işlevsel çerezlerdir.</li>
          <li><strong>İçerik katkılarınız:</strong> Favoriler, yorumlar, seyahat notları ve gezi hikayeleri gibi eklediğiniz içerikler hesabınızla ilişkilendirilerek saklanır.</li>
        </ul>

        <h2>Reklamlar ve Üçüncü Taraf Hizmetler</h2>
        <p>
          Sitede ileride Google AdSense gibi üçüncü taraf reklam ağları kullanılabilir. Bu ağlar,
          ilgi alanınıza uygun reklam gösterebilmek için tarayıcınıza çerez yerleştirebilir ve
          gezinme geçmişinizi kullanabilir. Google&apos;ın reklam çerezleri hakkında bilgi ve
          tercihlerinizi yönetme seçenekleri için{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
            Google Reklam Politikaları
          </a>{' '}
          sayfasını ziyaret edebilirsiniz.
        </p>
        <p>
          Ayrıca site; hava durumu (Open-Meteo), harita (OpenStreetMap) ve döviz kurları (Frankfurter)
          gibi ücretsiz açık API&apos;lerden veri çeker — bu istekler kişisel veri içermez.
        </p>

        <h2>Verilerinizin Kullanımı</h2>
        <p>
          Topladığımız veriler yalnızca siteyi çalıştırmak, geliştirmek ve (aktifse) size uygun
          reklam/içerik göstermek amacıyla kullanılır. Verileriniz üçüncü taraflara satılmaz.
        </p>

        <h2>Haklarınız</h2>
        <p>
          Hesabınızla ilişkili verileri görüntüleme, düzenleme veya silme talebinizi{' '}
          hesap ayarlarınızdan ya da bizimle iletişime geçerek iletebilirsiniz. Hesabınızı
          sildiğinizde favori, yorum ve seyahat notlarınız da kalıcı olarak silinir.
        </p>

        <h2>İletişim</h2>
        <p>
          Bu politika hakkında sorularınız için site üzerinden bize ulaşabilirsiniz.
        </p>
      </main>

      <SiteFooter />
    </div>
  )
}
