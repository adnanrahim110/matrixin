/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/services/web-designing",
        destination: "/services/web-designing-services",
        permanent: true,
      },
      {
        source: "/services/web-development",
        destination: "/services/web-development-services",
        permanent: true,
      },
      {
        source: "/services/digital-marketing",
        destination: "/services/digital-marketing-services",
        permanent: true,
      },
      {
        source: "/services/graphic-designing",
        destination: "/services/graphic-designing-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
