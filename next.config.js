module.exports = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/my-events/upcoming",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
};
