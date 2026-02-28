"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
	label: string;
	href?: string;
	subItems?: { label: string; href: string }[];
}

export const Navbar: React.FC<{ isMenuOpen: boolean; toggleMenu: () => void }> = ({ isMenuOpen, toggleMenu }) => {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const [expandedItem, setExpandedItem] = useState<string | null>(null);

	const pathname = usePathname();

	const navItems: NavItem[] = [
		{ label: "Trang chủ", href: "/" },
		{
			label: "Về chúng tôi",
			href: "/ve-chung-toi",
			subItems: [
				{
					label: "Câu chuyện của STEMKey",
					href: "/ve-chung-toi/cuoi-chuyen-cua-stemkey",
				},
				{
					label: "Tầm nhìn, sứ mệnh",
					href: "/ve-chung-toi/tam-nhien-su-menh",
				},
				{
					label: "Triết lý, phương pháp đào tạo",
					href: "/ve-chung-toi/triet-ly-phuong-phap-dao-tao",
				},
				{
					label: "Mô hình lớp học",
					href: "/ve-chung-toi/mo-hinh-lop-hoc",
				},
				{
					label: "Đội ngũ giáo viên",
					href: "/ve-chung-toi/doi-ngu-giao-vien",
				},
				{
					label: "Học viên xuất sắc",
					href: "/ve-chung-toi/hoc-vien-xuat-sac",
				},
				{
					label: "Hệ thống cơ sở",
					href: "/ve-chung-toi/he-thong-co-so",
				},
				{
					label: "Báo chí viết gì về chúng tôi",
					href: "/ve-chung-toi/bao-chi-viet-gi-nhe-chung-toi",
				},
				{
					label: "LMS học tập",
					href: "/ve-chung-toi/lms-hoc-tap",
				},
			],
		},
		{
			label: "Góc ba mẹ",
			href: "/goc-ba-me",
			subItems: [
				{
					label: "Kinh nghiệm nuôi dạy con",
					href: "/goc-ba-me/kinh-nghiem-nuoi-day-con",
				},
				{
					label: "Góc chuyên gia",
					href: "/goc-ba-me/goc-chuyen-gia",
				},
				{
					label: "STEM tại nhà",
					href: "/goc-ba-me/stem-tai-nha",
				},
			],
		},
		{
			label: "Khóa học",
			href: "/khoa-hoc",
			subItems: [
				{
					label: "Robotics mầm non",
					href: "/khoa-hoc/robotics-mam-non",
				},
				{
					label: "STEM Tiểu học",
					href: "/khoa-hoc/stem-tieu-hoc",
				},
				{
					label: "STEM THCS",
					href: "/khoa-hoc/stem-thcs",
				},
				{
					label: "Lập trình Scratch",
					href: "/khoa-hoc/lap-trinh-scratch",
				},
			],
		},
		{ label: "Lịch khai giảng", href: "/lich-khai-giang" },
		{
			label: "Góc học tập",
			href: "/goc-hoc-tap",
			subItems: [
				{
					label: "Tài liệu học tập",
					href: "/goc-hoc-tap/tai-lieu-hoc-tap",
				},
				{
					label: "Video bài giảng",
					href: "/goc-hoc-tap/video-bai-giang",
				},
				{
					label: "Thử thách tuần",
					href: "/goc-hoc-tap/thu-thach-tuan",
				},
			],
		},
		{ label: "Test online", href: "/test-online" },
		{
			label: "Tin tức",
			href: "/tin-tuc",
			subItems: [
				{
					label: "Tin tức mới nhất",
					href: "/tin-tuc/tin-tuc-moi-nhat",
				},
				{
					label: "Sự kiện",
					href: "/tin-tuc/su-kien",
				},
				{
					label: "Hoạt động ngoại khóa",
					href: "/tin-tuc/hoat-dong-ngoai-khoa",
				},
				{
					label: "Kỳ thi học bổng",
					href: "/tin-tuc/ky-thi-hoc-bong",
				},
				{
					label: "Tuyển dụng",
					href: "/tin-tuc/tuyen-dung",
				},
			],
		},
		{ label: "Liên hệ", href: "/lien-he" },
	];

	return (
		<nav className="sticky top-0 z-50 border-b border-slate-100 bg-white">
			<div className="mx-auto max-w-7xl px-4">
				{/* Desktop Menu */}
				<div className="hidden items-center justify-center space-x-8 py-4 lg:flex">
					{navItems.map((item) => (
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
									/>
								)}
								{pathname === item.href && (
									<motion.div
										layoutId="activeTab"
										className="text-stem-blue absolute right-0 bottom-0 left-0 h-0.5"
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
							className="fixed top-0 right-0 bottom-0 z-[70] flex w-[85%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
						>
							<div className="flex items-center justify-between border-b border-slate-100 p-4">
								<div className="flex items-center gap-2">
									<div className="bg-stem-blue flex h-8 w-8 items-center justify-center rounded-full text-white">
										<span className="text-xs font-bold">SK</span>
									</div>
									<span className="font-bold text-slate-900">STEMKey</span>
								</div>
								<button
									onClick={toggleMenu}
									className="hover:text-stem-blue p-2 text-slate-600 transition-colors"
								>
									<X size={24} />
								</button>
							</div>

							<div className="flex-grow space-y-6 overflow-y-auto px-4 py-6">
								{/* Search in Sidebar */}
								<div className="relative">
									<input
										type="text"
										placeholder="Tìm kiếm nội dung..."
										className="focus:ring-stem-blue/20 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-4 text-sm focus:ring-2 focus:outline-none"
									/>
									<Search
										size={18}
										className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
									/>
								</div>

								<div className="space-y-4">
									{navItems.map((item) => (
										<div key={item.label} className="space-y-2">
											<button
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
													/>
												)}
												{pathname === item.href && (
													<motion.div
														layoutId="activeTab"
														className="bg-stem-blue absolute right-0 bottom-0 left-0 h-0.5"
													/>
												)}
											</button>

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
															className="hover:text-stem-blue w-full py-1 text-left text-sm text-slate-600 transition-colors"
														>
															{subItem.label}
														</Link>
													))}
												</motion.div>
											)}
										</div>
									))}
								</div>
							</div>

							<div className="space-y-3 border-t border-slate-100 bg-slate-50/50 p-6">
								<button className="bg-stem-blue w-full rounded-2xl py-4 text-sm font-black tracking-wider text-white uppercase shadow-lg shadow-blue-500/20">
									Đăng nhập
								</button>
								<button className="w-full rounded-2xl border border-slate-200 bg-white py-4 text-sm font-black tracking-wider text-slate-800 uppercase">
									Đăng ký
								</button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</nav>
	);
};
