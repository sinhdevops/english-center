import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "English Center Admin",
	description: "Hệ thống quản lý trung tâm Anh ngữ",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="vi" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<body className="bg-[#f8f9fa] text-slate-900 antialiased" suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
}
