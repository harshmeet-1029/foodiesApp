/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
