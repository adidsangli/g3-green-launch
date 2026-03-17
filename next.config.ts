import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/g3-green-launch",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
