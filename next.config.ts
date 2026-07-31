import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
