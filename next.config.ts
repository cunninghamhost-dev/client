import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
//import withSvgr from 'next-plugin-svgr';

const nextConfig: NextConfig = {
  /* config options here */
  //output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tiqwa.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();

//export default withSvgr(nextConfig);
export default withNextIntl(nextConfig);
