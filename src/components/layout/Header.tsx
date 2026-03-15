"use client";

import React, { useState } from "react";
import { Phone, MapPin, Search, Menu, LogOut, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { logout as logoutAction } from "@/app/auth/login/actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/lib/supabase-client";

export const Header: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
	const { user, profile, logout } = useAuthStore();
	const [showDropdown, setShowDropdown] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	const handleLogout = async () => {
		setShowDropdown(false);
		await supabase.auth.signOut();
		const res = await logoutAction();
		if (res?.error) {
			toast.error(res.error);
		} else {
			logout();
			toast.success("Đã đăng xuất");
		}
	};

	const handleSearch = (e?: React.KeyboardEvent | React.MouseEvent) => {
		if (e && "key" in e && e.key !== "Enter") return;
		if (searchQuery.trim()) {
			router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	return (
		<header className="sticky top-0 z-60 border-b border-slate-50 bg-white px-4 py-3 lg:static lg:border-none">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
				{/* Logo */}
				<div className="relative h-[54px] w-[136px]">
					<Link href="/" aria-label="Trang chủ STEMKey">
						<Image
							src="/statics/images/logo.svg"
							alt="Logo STEMKey"
							fill
							className="object-contain"
							priority
						/>
					</Link>
				</div>

				{/* Contact Info (Desktop Only) */}
				<div className="hidden items-center gap-8 text-sm text-slate-600 lg:flex">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50">
							<Phone size={18} className="text-stem-blue" />
						</div>
						<div className="flex flex-col">
							<span className="text-[13px]">0325 610 016</span>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50">
							<MapPin size={18} className="text-stem-blue" />
						</div>
						<div className="flex flex-col">
							<span className="text-[13px]">Nam An Khánh, Hà Nội</span>
						</div>
					</div>
				</div>

				{/* Search & Auth (Responsive) */}
				<div className="flex items-center gap-3 lg:gap-4">
					<div className="hidden sm:w-48 lg:relative lg:flex lg:w-64">
						<input
							type="text"
							placeholder="Tìm kiếm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={handleSearch}
							aria-label="Tìm kiếm nội dung"
							className="focus:ring-stem-blue/20 w-full rounded-full border border-slate-200 bg-slate-50 py-2 pr-10 pl-4 text-sm focus:ring-2 focus:outline-none"
						/>
						<Search
							size={16}
							onClick={handleSearch}
							className="hover:text-stem-blue absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400"
							aria-hidden="true"
						/>
					</div>

					<div className="hidden items-center gap-2 lg:flex">
						{user ? (
							<div className="relative">
								<button
									onClick={() => setShowDropdown(!showDropdown)}
									className="group flex items-center gap-3 rounded-full border border-slate-100 bg-white p-1 pr-4 transition-all hover:border-slate-200 hover:shadow-md"
								>
									<div className="bg-stem-blue flex h-10 w-10 items-center justify-center rounded-full font-bold text-white uppercase shadow-sm">
										{profile?.full_name?.charAt(0) || user.email?.charAt(0)}
									</div>
									<div className="flex flex-col items-start">
										<span className="line-clamp-1 max-w-32 text-xs font-bold text-slate-800">
											{profile?.full_name || "Thành viên"}
										</span>
										<span className="text-[10px] font-medium text-slate-400">Tài khoản</span>
									</div>
									<ChevronDown
										size={16}
										className={`text-slate-400 transition-transform ${showDropdown ? "rotate-180" : ""}`}
									/>
								</button>

								<AnimatePresence>
									{showDropdown && (
										<>
											<div
												className="fixed inset-0 z-50"
												onClick={() => setShowDropdown(false)}
											/>
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 10 }}
												className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-2xl"
											>
												<div className="border-b border-slate-50 px-4 py-3">
													<p className="text-sm font-bold text-slate-900">
														{profile?.full_name || "Thành viên"}
													</p>
													<p className="truncate text-xs text-slate-500">{user.email}</p>
												</div>
												{/* <div className="p-1">
													<Link
														href="/thong-tin-ca-nhan"
														onClick={() => setShowDropdown(false)}
														className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
													>
														<UserIcon size={18} />
														Thông tin cá nhân
													</Link>
												</div> */}
												<div className="border-t border-slate-50 p-1">
													<button
														onClick={handleLogout}
														className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
													>
														<LogOut size={18} />
														Đăng xuất
													</button>
												</div>
											</motion.div>
										</>
									)}
								</AnimatePresence>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<Link href="/dang-nhap">
									<Button variant="primary" size="sm" className="rounded-full px-6 font-bold">
										Đăng nhập
									</Button>
								</Link>
								<Link href="/dang-ky">
									<Button variant="outline" size="sm" className="rounded-full px-6 font-bold">
										Đăng ký
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>

				<button
					onClick={toggleMenu}
					aria-label="Mở menu điều hướng"
					className="hover:text-stem-red p-2 text-slate-600 transition-colors lg:hidden"
				>
					<Menu size={24} aria-hidden="true" />
				</button>
			</div>
		</header>
	);
};
