import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  // Nếu bạn đặt file request ở chỗ khác, ví dụ: './src/i18n/request.ts'
  // './i18n/request.ts'
);

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
		remotePatterns: [{ protocol: "https", hostname: "**" }],
		formats: ["image/avif", "image/webp"],
	},
};

export default withNextIntl(nextConfig);