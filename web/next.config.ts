import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/**`)],
  },
}

export default nextConfig
