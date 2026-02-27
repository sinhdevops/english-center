"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, ChevronRight, Phone, Mail } from "lucide-react";

const navItems = [
	{ name: "Trang chủ", href: "/" },
	{
		name: "Về chúng tôi",
		href: "/vct-cau-chuyen-cua-ms-hoa-junior",
		dropdown: [{ name: "Câu chuyện Ms Hoa Junior", href: "/vct-cau-chuyen-cua-ms-hoa-junior" }],
	},
	{
		name: "Khóa học",
		href: "/khoa-hoc-tieu-chuan",
		dropdown: [
			{ name: "Hệ tiêu chuẩn", href: "/khoa-hoc-tieu-chuan" },
			{ name: "Hệ chuyên và cân chuyên", href: "/khoa-hoc-chuyen" },
			{ name: "IELTS MASTER", href: "/ielts-master" },
			{ name: "Lớp học 1 - 1", href: "/lop-hoc-1-1" },
		],
	},
	{ name: "Tài liệu", href: "/tai-lieu" },
	{ name: "Tin tức", href: "/tin-tuc" },
	{ name: "Liên hệ", href: "/lien-he" },
];

const Header = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

	const toggleSubMenu = (name: string) => {
		setOpenSubMenu(openSubMenu === name ? null : name);
	};

	return (
		<header className="bg-primary sticky top-0 z-50 w-full text-white shadow-md">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
				{/* Logo */}
				<Link href="/" className="flex shrink-0 items-center">
					<div className="text-primary rounded-md bg-white px-3 py-1 text-xl font-bold tracking-tighter shadow-sm">
						MS HOA <span className="text-accent">JUNIOR</span>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex lg:items-center lg:gap-6">
					{navItems.map((item) => (
						<div key={item.name} className="group relative">
							<Link
								href={item.href}
								className="hover:text-accent flex items-center gap-1.5 py-4 text-sm font-semibold transition-all duration-300"
							>
								{item.name}
								{item.dropdown && (
									<ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
								)}
							</Link>
							{item.dropdown && (
								<div className="invisible absolute top-[calc(100%-0.5rem)] left-0 z-50 w-64 origin-top translate-y-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
									<div className="mt-2 overflow-hidden rounded-xl border border-zinc-100 bg-white p-2 shadow-2xl">
										{item.dropdown.map((sub) => (
											<Link
												key={sub.name}
												href={sub.href}
												className="text-dark hover:bg-light hover:text-primary group/item flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all"
											>
												<span className="transition-transform duration-300 group-hover/item:translate-x-1">
													{sub.name}
												</span>
												<div className="bg-primary h-1.5 w-1.5 rounded-full opacity-0 transition-all group-hover/item:opacity-100" />
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</nav>

				{/* Search and Action */}
				<div className="flex items-center gap-4">
					<div
						className={`relative hidden items-center xl:flex ${true ? "w-48" : "w-10"} transition-all duration-300`}
					>
						<button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10">
							<Search className="h-5 w-5" />
						</button>
						<input
							type="text"
							placeholder="Tìm kiếm..."
							className="text-dark absolute h-10 w-full rounded-full bg-white px-4 py-2 outline-none"
							autoFocus
							onBlur={() => setIsSearchOpen(false)}
						/>
					</div>

					<Link
						href="/lien-he"
						className="bg-accent hover:bg-accent/90 hidden rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all active:scale-95 sm:block"
					>
						Đăng ký tư vấn
					</Link>

					<button
						className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 lg:hidden"
						onClick={() => setIsMobileMenuOpen(true)}
					>
						<Menu className="h-6 w-6" />
					</button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 z-50 flex justify-end lg:hidden">
					{/* Overlay Background */}
					<div
						className="bg-dark/60 absolute inset-0 backdrop-blur-sm transition-opacity duration-300"
						onClick={() => setIsMobileMenuOpen(false)}
					/>

					{/* Sidebar Content */}
					<div className="relative flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300">
						{/* Close Button Header */}
						<div className="flex items-center justify-between border-b border-zinc-50 p-6">
							<div className="text-primary font-heading text-lg font-extrabold tracking-tighter">
								MS HOA{" "}
								<span className="text-accent decoration-primary/10 underline underline-offset-4">
									JUNIOR
								</span>
							</div>
							<button
								className="hover:text-dark text-zinc-400 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<X className="h-8 w-8" />
							</button>
						</div>

						<div className="custom-scrollbar flex-1 overflow-y-auto">
							<div className="p-6">
								{/* Search Input in Mobile Menu */}
								<div className="relative mb-8">
									<input
										type="text"
										placeholder="Tìm kiếm..."
										className="text-dark focus:border-primary w-full rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-4 pr-12 transition-all outline-none focus:bg-white"
									/>
									<Search className="absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2 text-zinc-400" />
								</div>

								{/* Navigation Links */}
								<nav className="space-y-1">
									{navItems.map((item) => (
										<div key={item.name} className="border-b border-zinc-50 last:border-0">
											<div className="flex items-center justify-between">
												<Link
													href={item.href}
													className={`flex-1 py-4 text-[17px] font-bold tracking-tight transition-colors ${openSubMenu === item.name ? "text-primary" : "text-dark hover:text-primary"}`}
													onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
												>
													{item.name}
												</Link>
												{item.dropdown && (
													<button
														onClick={() => toggleSubMenu(item.name)}
														className={`p-4 transition-transform duration-300 ${openSubMenu === item.name ? "rotate-90" : ""}`}
													>
														<ChevronRight
															className={`h-5 w-5 ${openSubMenu === item.name ? "text-primary" : "text-zinc-300"}`}
														/>
													</button>
												)}
											</div>

											{/* Mobile Dropdown */}
											{item.dropdown && openSubMenu === item.name && (
												<div className="bg-light/50 mb-2 overflow-hidden rounded-2xl px-2 pb-2">
													{item.dropdown.map((sub) => (
														<Link
															key={sub.name}
															href={sub.href}
															className="text-dark hover:text-primary flex items-center gap-2 px-4 py-3.5 text-[15px] font-medium transition-all"
															onClick={() => setIsMobileMenuOpen(false)}
														>
															<div className="h-1 w-1 rounded-full bg-zinc-300" />
															{sub.name}
														</Link>
													))}
												</div>
											)}
										</div>
									))}
								</nav>
							</div>
						</div>

						{/* Footer in Mobile Menu */}
						<div className="space-y-6 border-t border-zinc-100 bg-zinc-50 p-6">
							<div className="space-y-4">
								<div className="flex items-center gap-4 rounded-2xl border border-zinc-100/50 bg-white p-3.5 shadow-sm">
									<div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
										<Phone className="h-4 w-4" />
									</div>
									<a href="tel:0965500306" className="text-dark text-[15px] font-bold tracking-tight">
										0965 500 306
									</a>
								</div>
								<div className="flex items-center gap-4 rounded-2xl border border-zinc-100/50 bg-white p-3.5 shadow-sm">
									<div className="bg-accent/10 text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
										<Mail className="h-4 w-4" />
									</div>
									<a
										href="mailto:tuvan@mshoajunior.edu.vn"
										className="text-dark truncate text-[15px] font-bold tracking-tight"
									>
										tuvan@mshoajunior.edu.vn
									</a>
								</div>
							</div>

							<Link
								href="/lien-he"
								className="bg-accent shadow-accent/20 block w-full rounded-2xl py-4.5 text-center font-extrabold text-white shadow-xl transition-all active:scale-[0.98]"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Đăng ký tư vấn
							</Link>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
