import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import MainLayout from "@/components/layout/main-layout";
import "@/app/globals.css";
import AppProvider from "@/providers/app-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Toaster } from "sonner";

const nunito = Nunito_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	variable: "--font-nunito",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://stemkey.vn"),
	title: {
		default: "STEMKey - Hệ thống giáo dục Tư duy, Ngôn ngữ & Công nghệ",
		template: "%s | STEMKey",
	},
	description:
		"STEMKey - Hệ thống giáo dục toàn diện cho trẻ từ 4-10 tuổi, tập trung phát triển Tư duy (Toán tư duy), Ngôn ngữ (Tiếng Anh) và Công nghệ (Robotics).",
	keywords: ["STEM", "STEMKey", "Toán tư duy", "Robotics", "Tiếng Anh cho trẻ", "Giáo dục tiểu học"],
	openGraph: {
		type: "website",
		locale: "vi_VN",
		url: "https://stemkey.vn",
		siteName: "STEMKey",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "STEMKey - Khơi nguồn sáng tạo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "STEMKey - Hệ thống giáo dục Tư duy, Ngôn ngữ & Công nghệ",
		description: "Khám phá lộ trình học tập toàn diện cho trẻ tại STEMKey.",
		images: ["/og-image.jpg"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi" suppressHydrationWarning>
			<body className={`${nunito.variable} bg-white font-sans text-slate-900 antialiased`}>
				<AppProvider>
					<AuthProvider>
						<MainLayout>{children}</MainLayout>
					</AuthProvider>
				</AppProvider>
				<Toaster richColors position="top-right" closeButton />
			</body>
		</html>
	);
}
