"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Trophy, Users, MapPin, BookOpen, ClipboardList, X, ImagePlay, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { IMAGES } from "../../../../public/statics/images";
import { LogoutButton } from "@/components/auth/logout-button";

const navItems = [
	{ name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
	{ name: "Đăng ký mới", href: "/admin/registrations", icon: ClipboardList },
	{ name: "Lịch khai giảng", href: "/admin/schedules", icon: CalendarDays },
	{ name: "Sự kiện", href: "/admin/events", icon: Trophy },
	{ name: "Học viên", href: "/admin/students", icon: Users },
	{ name: "Cơ sở", href: "/admin/branches", icon: MapPin },
	{ name: "Chương trình học", href: "/admin/programs", icon: BookOpen },
	{ name: "Banner", href: "/admin/banners", icon: ImagePlay },
	{ name: "Kết quả bài test", href: "/admin/quiz-results", icon: FileText },
];

interface SidebarProps {
	isOpen?: boolean;
	onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
	const pathname = usePathname();

	return (
		<>
			{/* Mobile Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
					/>
				)}
			</AnimatePresence>

			<aside
				className={cn(
					"fixed top-0 left-0 z-50 h-screen w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0",
					isOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="flex h-full flex-col px-3 py-4">
					<div className="mb-8 flex items-center justify-between px-2">
						<Link href={"/"} className="flex flex-col items-center">
							<Image
								src={IMAGES.logo}
								alt="Logo"
								width={140}
								height={48}
								className="h-auto w-full max-w-[120px]"
							/>
						</Link>
						<button
							onClick={onClose}
							className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
						>
							<X size={20} />
						</button>
					</div>

					<nav className="flex-1 space-y-1">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									onClick={onClose}
									className={cn(
										"group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200",
										isActive
											? "bg-stem-blue text-white shadow-lg shadow-blue-200"
											: "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
									)}
								>
									<item.icon
										className={cn(
											"mr-3 h-5 w-5 transition-colors",
											isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600",
										)}
									/>
									{item.name}
								</Link>
							);
						})}
					</nav>

					<div className="mt-auto space-y-1 border-t border-slate-100 pt-4">
						<LogoutButton
							className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-50 disabled:opacity-50"
							iconSize={20}
						/>
					</div>
				</div>
			</aside>
		</>
	);
}
