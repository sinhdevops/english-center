import React from "react";
import { Phone, MapPin, Search, Menu } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export const Header: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
	return (
		<header className="border-b border-slate-50 bg-white px-4 py-3 lg:border-none">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
				{/* Logo */}
				<div className="relative h-[54px] w-[136px]">
					<Image src="/statics/images/logo.png" alt="Logo" fill className="object-contain" />
				</div>

				{/* Contact Info (Desktop Only) */}
				<div className="hidden items-center gap-8 text-sm text-slate-600 lg:flex">
					<div className="flex items-center gap-2">
						<div className="rounded-full bg-slate-50 p-2">
							<Phone size={16} className="text-stem-blue" />
						</div>
						<span className="font-medium">0325 610 016</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="rounded-full bg-slate-50 p-2">
							<MapPin size={16} className="text-stem-blue" />
						</div>
						<span className="font-medium">Nam An Khánh, Hà Nội</span>
					</div>
				</div>

				{/* Search & Auth (Responsive) */}
				<div className="flex items-center gap-3 lg:gap-4">
					<div className="hidden sm:relative sm:flex sm:w-48 lg:w-64">
						<input
							type="text"
							placeholder="Tìm kiếm"
							className="focus:ring-stem-blue/20 w-full rounded-full border border-slate-200 bg-slate-50 py-2 pr-10 pl-4 text-sm focus:ring-2 focus:outline-none"
						/>
						<Search size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400" />
					</div>

					<div className="hidden items-center gap-2 xl:flex">
						<Button variant="primary" className="px-4">
							Đăng nhập
						</Button>
						<Button variant="outline" className="px-4">
							Đăng ký
						</Button>
					</div>
				</div>

				<button
					onClick={toggleMenu}
					className="hover:text-stem-red p-2 text-slate-600 transition-colors xl:hidden"
				>
					<Menu size={24} />
				</button>
			</div>
		</header>
	);
};
