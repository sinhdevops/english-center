"use client";

import { User as UserIcon, Menu, Bell, Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

interface HeaderProps {
	onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
	const { user, profile } = useAuthStore();

	return (
		<header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:px-8">
			<div className="flex items-center gap-4">
				<button onClick={onMenuClick} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
					<Menu size={22} />
				</button>

				<div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5 text-slate-500 lg:flex">
					<Search size={16} />
					<input
						type="text"
						placeholder="Tìm kiếm..."
						className="bg-transparent text-sm outline-hidden focus:ring-0"
					/>
				</div>
			</div>

			<div className="flex items-center gap-3 lg:gap-6">
				<div className="flex items-center gap-3">
					<div className="hidden text-right sm:block">
						<p className="text-sm font-bold text-slate-900">
							{profile?.full_name || user?.email?.split("@")[0] || "Admin User"}
						</p>
						<p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
							{profile?.role === "admin" ? "Quản trị viên" : "Nhân viên"}
						</p>
					</div>
					<div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm ring-1 ring-slate-200">
						{profile?.avatar_url ? (
							<Image src={profile.avatar_url} alt="Avatar" fill className="object-cover" />
						) : (
							<div className="flex h-full w-full items-center justify-center text-slate-400">
								<UserIcon size={18} />
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
