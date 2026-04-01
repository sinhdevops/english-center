"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen ">
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
			<div className="flex flex-col lg:pl-64">
				<Header onMenuClick={() => setIsSidebarOpen(true)} />
				<main className="p-4 md:p-8">{children}</main>
			</div>
		</div>
	);
}
