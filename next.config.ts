import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true, // requires Turbopack which causes OOM on low-memory machines
  typescript: {
    ignoreBuildErrors: true, // TS verified separately via tsc --noEmit
  },
  experimental: {
    cpus: 1,
    webpackMemoryOptimizations: true,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
    memoryBasedWorkersCount: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
