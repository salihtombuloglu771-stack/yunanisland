'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { hasAnalyticsConsent, onConsentChange } from '@/lib/cookieConsent'

// Yer tutucu / hazır altyapı: NEXT_PUBLIC_GA_MEASUREMENT_ID ve
// NEXT_PUBLIC_YANDEX_METRICA_ID env değişkenleri Vercel'e eklendiğinde
// başka hiçbir kod değişikliği gerekmeden devreye girer. İkisi de
// ziyaretçi çerez onayı verene kadar hiç yüklenmez.
export function AnalyticsScripts() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    setConsented(hasAnalyticsConsent())
    return onConsentChange(setConsented)
  }, [])

  if (!consented) return null

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID

  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
          </Script>
        </>
      )}

      {yandexId && (
        <>
          <Script id="yandex-metrica" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${yandexId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mc.yandex.ru/watch/${yandexId}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </noscript>
        </>
      )}
    </>
  )
}
