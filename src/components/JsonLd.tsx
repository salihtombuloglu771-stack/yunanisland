export function JsonLd({ data }: { data: object }) {
  // "<" kaçışlanıyor — aksi halde bir alan (örn. admin panelinden girilen bir
  // açıklama) yanlışlıkla "</script><script>...</script>" içerirse script
  // etiketinden çıkıp sayfaya rastgele HTML/JS enjekte edebilirdi.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
