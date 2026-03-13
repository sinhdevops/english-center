import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import LayoutAdmin from "@/components/layout/admin/AdminLayout";

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
		<div className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<LayoutAdmin>{children}</LayoutAdmin>
		</div>
	);
}
