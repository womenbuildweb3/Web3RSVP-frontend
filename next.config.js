module.exports = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/my-events/upcoming",
        permanent: true,
      },
      {
        source: "/dashboard/my-events",
        destination: "/dashboard/my-events/upcoming",
        permanent: true,
      },
      {
        source: "/dashboard/my-rsvps",
        destination: "/dashboard/my-rsvps/upcoming",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
};
