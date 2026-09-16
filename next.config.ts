import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Tüm rotalara uygulanan temel güvenlik header'ları. CSP'nin script-src
        // kısmı bilinçli olarak eklenmedi: AdSense reklamları googlesyndication/
        // doubleclick alt alan adlarını dinamik ve sık değişen şekilde kullanıyor,
        // buradan canlı reklam gösterimini test edemediğimiz için eksik/yanlış bir
        // allowlist doğrudan reklam gelirini kırabilir — script-src riski kullanıcıyla
        // konuşulup ayrı bir turda (gerekirse report-only ile) ele alınmalı.
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), payment=(), usb=(), geolocation=(self)' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Kullanıcının yanlışlıkla aldığı ikinci (noktasız ı) domain — asıl siteye yönlendir.
      {
        source: "/:path*",
        has: [{ type: "host", value: "xn--yunansland-1ub.com" }],
        destination: "https://yunanisland.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.xn--yunansland-1ub.com" }],
        destination: "https://yunanisland.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
