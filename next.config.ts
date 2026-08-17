import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: isProd && isGithubPages ? '/webkonicnew/' : '',
  basePath: isProd && isGithubPages ? '/webkonicnew' : '',
  distDir: 'out'
};

export default nextConfig;
