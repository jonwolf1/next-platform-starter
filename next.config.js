module.exports = {
  async redirects() {
    return [
      {
        source: '/auth/callback',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
