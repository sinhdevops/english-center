"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Trophy, Users, MapPin, BookOpen, LogOut, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { IMAGES } from "../../../../public/statics/images";

const navItems = [
	{ name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
	{ name: "Đăng ký mới", href: "/admin/registrations", icon: ClipboardList },
	{ name: "Lịch khai giảng", href: "/admin/schedules", icon: CalendarDays },
	{ name: "Sự kiện", href: "/admin/events", icon: Trophy },
	{ name: "Học viên", href: "/admin/students", icon: Users },
	{ name: "Cơ sở", href: "/admin/branches", icon: MapPin },
	{ name: "Chương trình học", href: "/admin/programs", icon: BookOpen },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="fixed top-0 left-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition-transform">
			<div className="flex h-full flex-col px-3 py-4">
				<div className="mb-8 flex flex-col items-center">
					<div className="flex items-center justify-center rounded-xl bg-white p-2 shadow-lg shadow-blue-100/50">
						<Image
							src={IMAGES.logo}
							alt="Logo"
							width={180}
							height={60}
							className="h-auto w-full max-w-[140px]"
						/>
					</div>
				</div>

				<nav className="flex-1 space-y-1">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									"group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
									isActive
										? "text-stem-blue bg-blue-50"
										: "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
								)}
							>
								<item.icon
									className={cn(
										"mr-3 h-5 w-5 transition-colors",
										isActive ? "text-stem-blue" : "text-slate-400 group-hover:text-slate-600",
									)}
								/>
								{item.name}
								{isActive && (
									<motion.div
										layoutId="active-pill"
										className="bg-stem-blue absolute right-2 h-1.5 w-1.5 rounded-full"
									/>
								)}
							</Link>
						);
					})}
				</nav>

				<div className="mt-auto space-y-1 border-t border-slate-100 pt-4">
					<button className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50">
						<LogOut className="mr-3 h-5 w-5" />
						Đăng xuất
					</button>
				</div>
			</div>
		</aside>
	);
}
