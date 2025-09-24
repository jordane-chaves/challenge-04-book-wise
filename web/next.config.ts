import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  images: {
    qualities: [25, 50, 75, 100],
  },
}

export default nextConfig
