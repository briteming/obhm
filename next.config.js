const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/page',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
