import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yunanisland — Yunan Adaları Gezi Rehberi',
    short_name: 'Yunanisland',
    description: 'Yunan Adaları için kapsamlı gezi rehberi: adalar, plajlar, restoranlar, feribot rotaları ve daha fazlası.',
    start_url: '/',
    // 'browser' (not 'standalone') avoids Android Play Protect flagging the
    // Chrome-generated WebAPK as an unrecognized package — see HAGAT Akademi notes.
    display: 'browser',
    background_color: '#0f172a',
    theme_color: '#0ea5e9',
    icons: [
      { src: '/icons/192', sizes: '192x192', type: 'image/png' },
      { src: '/icons/512', sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
