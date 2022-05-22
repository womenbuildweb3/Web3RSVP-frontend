module.exports = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/my-events/[address]/upcoming",
        permanent: true,
      },
      {
        source: "/my-events/[address]",
        destination: "/my-events/[address]/upcoming",
        permanent: true,
      },
      {
        source: "/my-rsvps/[address]",
        destination: "/my-rsvps/[address]/upcoming",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
};
