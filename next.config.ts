import type { NextConfig } from "next";

const environment =
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "prod" ? "prod" : "dev";

const SELF = "'self'";

const appDirectives = {
  "default-src": [SELF],
  "script-src": [SELF, "'unsafe-eval'"],
  "script-src-elem": [SELF],
  "style-src": [SELF],
  "style-src-elem": [SELF],
  "img-src": [SELF, "data:"],
  "font-src": [SELF, "https://cdn.nav.no"],
  "worker-src": [SELF],
  "connect-src": [SELF, "https://*.nav.no"],
};

const nextConfig: NextConfig = {
  async headers() {
    const { buildCspHeader } = await import(
      "@navikt/nav-dekoratoren-moduler/ssr/index.js"
    );
    const cspValue = await buildCspHeader(appDirectives, { env: environment });
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspValue,
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  output: "standalone",
  basePath: "/syk/aktivitetskrav",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  productionBrowserSourceMaps: true,
  experimental: {
    optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],
  },
};

export default nextConfig;
