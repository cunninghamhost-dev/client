declare module 'next-svgr' {
  import type { NextConfig } from 'next';

  // `withSvgr` is a higher-order function that wraps NextConfig
  export function withSvgr(config: NextConfig): NextConfig;
}
