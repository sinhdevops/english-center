"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { logout as logoutAction } from "@/app/auth/login/actions";
import { toast } from "sonner";
import { NAV_ITEMS } from "@/constants";
import { supabase } from "@/lib/supabase-client";

export const Navbar: React.FC<{ isMenuOpen: boolean; toggleMenu: () => void }> = ({ isMenuOpen, toggleMenu }) => {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const [expandedItem, setExpandedItem] = useState<string | null>(null);

	const { user, profile, logout } = useAuthStore();

	const pathname = usePathname();

	return (
		<nav className="sticky top-0 z-50 border-b border-slate-100 bg-white">
			<div className="mx-auto max-w-7xl px-4">
				{/* Desktop Menu */}
				<div className="hidden items-center justify-center space-x-8 py-4 lg:flex">
					{NAV_ITEMS.map((item) => (
						<div
							key={item.label}
							className="group relative"
							onMouseEnter={() => setHoveredItem(item.label)}
							onMouseLeave={() => setHoveredItem(null)}
						>
							<Link
								href={item.href || "#"}
								className={`relative flex items-center gap-1 pb-1 text-sm font-medium whitespace-nowrap transition-colors ${
									pathname === item.href ? "text-stem-blue" : "hover:text-stem-blue text-slate-600"
								}`}
							>
								{item.label}
								{item.subItems && (
									<ChevronDown
										size={14}
										className={`transition-transform duration-200 ${hoveredItem === item.label ? "rotate-180" : ""}`}
										aria-hidden="true"
									/>
								)}
								{pathname === item.href && (
									<motion.div
										layoutId="activeTab"
										className="bg-stem-blue absolute right-0 bottom-0 left-0 h-0.5"
									/>
								)}
							</Link>

							{/* Dropdown Menu */}
							<AnimatePresence>
								{item.subItems && hoveredItem === item.label && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										transition={{ duration: 0.2 }}
										className={`absolute z-50 mt-2 w-64 overflow-hidden rounded-lg border border-slate-100 bg-white py-2 shadow-xl ${
											item.label === "Tin tức" || item.label === "Liên hệ" ? "right-0" : "left-0"
										}`}
									>
										{item.subItems.map((subItem) => (
											<Link
												key={subItem.label}
												href={subItem.href}
												className="hover:text-stem-blue block w-full border-b border-slate-50 px-4 py-2.5 text-left text-sm text-slate-600 transition-colors last:border-0 hover:bg-slate-50"
											>
												{subItem.label}
											</Link>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}

					{/* Desktop Auth State */}
				</div>
			</div>

			{/* Mobile Menu Drawer Overlay */}
			<AnimatePresence>
				{isMenuOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={toggleMenu}
							className="fixed inset-0 z-50 bg-black/50 lg:hidden"
						/>
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							className="max-sm fixed top-0 right-0 bottom-0 z-70 flex w-[85%] flex-col bg-white shadow-2xl lg:hidden"
						>
							<div className="flex items-center justify-between gap-2 border-b border-slate-100 p-4">
								<div className="relative flex-1 lg:hidden">
									<label htmlFor="mobile-search" className="sr-only">
										Tìm kiếm nội dung
									</label>
									<input
										id="mobile-search"
										type="text"
										placeholder="Tìm kiếm nội dung..."
										className="focus:ring-stem-blue/20 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-4 text-sm focus:ring-2 focus:outline-none"
									/>
									<Search
										size={18}
										className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
										aria-hidden="true"
									/>
								</div>

								<button
									onClick={toggleMenu}
									aria-label="Đóng menu"
									className="hover:text-stem-blue p-2 text-slate-600 transition-colors"
								>
									<X size={24} aria-hidden="true" />
								</button>
							</div>

							<div className="grow space-y-6 overflow-y-auto px-4 py-6">
								{/* Search in Sidebar */}

								<div className="space-y-4">
									{NAV_ITEMS.map((item) => {
										const Comp = item?.subItems?.length ? "button" : Link;
										return (
											<div key={item.label} className="space-y-2">
												<Comp
													href={item.href || "#"}
													onClick={() => {
														if (item.subItems) {
															setExpandedItem(
																expandedItem === item.label ? null : item.label,
															);
														} else {
															toggleMenu();
														}
													}}
													className={`relative flex items-center gap-1 pb-1 text-sm font-medium whitespace-nowrap transition-colors ${
														pathname === item.href ? "text-stem-blue" : "text-slate-800"
													}`}
												>
													{item.label}
													{item.subItems && (
														<ChevronDown
															size={20}
															className={`transition-transform duration-200 ${expandedItem === item.label ? "rotate-180" : ""}`}
															aria-hidden="true"
														/>
													)}
													{pathname === item.href && (
														<motion.div
															layoutId="activeTab"
															className="bg-stem-blue absolute right-0 bottom-0 left-0 h-0.5"
														/>
													)}
												</Comp>

												{item.subItems && expandedItem === item.label && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: "auto" }}
														className="ml-2 space-y-3 overflow-hidden border-l-2 border-slate-100 pt-2 pl-4"
													>
														{item.subItems.map((subItem) => (
															<Link
																href={subItem.href}
																key={subItem.label}
																onClick={toggleMenu}
																className="hover:text-stem-blue block w-full py-1 text-left text-sm text-slate-600 transition-colors"
															>
																{subItem.label}
															</Link>
														))}
													</motion.div>
												)}
											</div>
										);
									})}
								</div>
							</div>

							<div className="space-y-3 border-t border-slate-100 bg-slate-50/50 p-6">
								{user ? (
									<div className="space-y-4">
										<div className="flex items-center gap-3 px-2">
											<div className="bg-stem-blue flex h-10 w-10 items-center justify-center rounded-full font-bold text-white uppercase">
												{profile?.full_name?.charAt(0) || user.email?.charAt(0)}
											</div>
											<div>
												<p className="font-bold text-slate-800">
													{profile?.full_name || "Thành viên"}
												</p>
												<p className="text-xs text-slate-500">{user.email}</p>
											</div>
										</div>
										<Link
											href="/dashboard"
											onClick={toggleMenu}
											className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white py-4 text-sm font-black tracking-wider text-slate-800 uppercase"
										>
											Bảng điều khiển
										</Link>
										<button
											onClick={async () => {
												await supabase.auth.signOut();
												await logoutAction();
												logout();
												toggleMenu();
												toast.success("Đã đăng xuất");
											}}
											className="w-full rounded-2xl bg-red-50 py-4 text-sm font-black tracking-wider text-red-500 uppercase"
										>
											Đăng xuất
										</button>
									</div>
								) : (
									<>
										<Link
											href="/dang-nhap"
											onClick={toggleMenu}
											className="bg-stem-blue flex w-full items-center justify-center rounded-2xl py-4 text-sm font-black tracking-wider text-white uppercase shadow-lg shadow-blue-500/20"
										>
											Đăng nhập
										</Link>
										<Link
											href="/dang-ky"
											onClick={toggleMenu}
											className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white py-4 text-sm font-black tracking-wider text-slate-800 uppercase"
										>
											Đăng ký
										</Link>
									</>
								)}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</nav>
	);
};
