"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const titleMap: Record<string, string> = {
	"/": "Tổng quan",
	"/schedules": "Lịch khai giảng",
	"/events": "Quản lý sự kiện",
	"/students": "Quản lý học viên",
	"/branches": "Quản lý cơ sở",
	"/programs": "Chương trình học",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const title = titleMap[pathname] || "BeeEnglish Admin";

	return (
		<div className="min-h-screen bg-[#f8f9fa]">
			<Sidebar />
			<div className="pl-64">
				<main className="p-8">{children}</main>
			</div>
		</div>
	);
}
