"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
	ChevronRight,
	Trophy,
	ClipboardList,
	GraduationCap,
	BookOpen,
	Calendar,
	Book,
	ArrowRight,
	User,
	Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useAuthStore } from "@/store/useAuthStore";

interface TestDetailPageProps {
	category: string;
}

const SidebarItem: React.FC<{ icon: any; title: string; colorClass: string; active?: boolean }> = ({
	icon: Icon,
	title,
	colorClass,
	active,
}) => (
	<div
		className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 transition-all lg:gap-4 lg:p-3 ${
			active
				? "border-slate-200 bg-white shadow-lg"
				: "border-transparent bg-white hover:border-slate-100 hover:shadow-md"
		}`}
	>
		<div
			className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg lg:h-12 lg:w-12 ${colorClass} text-slate-700 transition-transform group-hover:scale-110`}
		>
			<Icon size={20} className="lg:hidden" />
			<Icon size={24} className="hidden lg:block" />
		</div>
		<span
			className={`text-xs font-bold lg:text-sm ${active ? "text-stem-blue" : "group-hover:text-stem-blue text-slate-600"}`}
		>
			{title}
		</span>
		<div className="ml-auto opacity-0 transition-opacity lg:group-hover:opacity-100">
			<ChevronRight size={14} className="text-slate-300 lg:size-4" />
		</div>
	</div>
);

export default function TestOnlineDetail({ category }: TestDetailPageProps) {
	const { user } = useAuthStore();
	const [activeGrade, setActiveGrade] = useState("Lớp 3");
	const [showLoginModal, setShowLoginModal] = useState(false);

	const grades = ["Lớp 3", "Lớp 4", "Lớp 5"];
	const router = useRouter();

	const testSections = [
		{ title: "Starters Full Test" },
		{ title: "Starters Listening Test" },
		{
			title: "Starters Reading and Writing Test",
			items: [
				{
					id: 1,
					title: `STEMKey - Đề ôn thi HSG - ${activeGrade} - Test 1`,
					img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
				},
				{
					id: 2,
					title: `STEMKey - Đề ôn thi HSG - ${activeGrade} - Test 2`,
					img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
				},
				{
					id: 3,
					title: `STEMKey - Đề ôn thi HSG - ${activeGrade} - Test 3`,
					img: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&q=80&w=400",
				},
			],
		},
		{
			title: `Đề thi HSG ${activeGrade}`,
			items: [
				{
					id: 1,
					title: `STEMKey - Đề ôn thi HSG - ${activeGrade} - Test 1`,
					img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
				},
				{
					id: 2,
					title: `STEMKey - Đề ôn thi HSG - ${activeGrade} - Test 2`,
					img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
				},
				{
					id: 3,
					title: `STEMKey - Đề ôn thi HSG - ${activeGrade} - Test 3`,
					img: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&q=80&w=400",
				},
			],
		},
	];

	const sidebarCategories = [
		{
			title: "Đề thi học sinh giỏi",
			icon: Trophy,
			colorClass: "bg-[#a8e0d9]",
			active: category === "Đề thi học sinh giỏi",
		},
		{
			title: "Đề thi thử trường CLC",
			icon: ClipboardList,
			colorClass: "bg-[#c3b1e1]",
			active: category === "Đề thi thử trường CLC",
		},
		{
			title: "Đề thi thử học kỳ",
			icon: GraduationCap,
			colorClass: "bg-[#fbc4ab]",
			active: category === "Đề thi thử học kỳ",
		},
		{
			title: "Bài tập bổ trợ theo SGK",
			icon: BookOpen,
			colorClass: "bg-[#f9a8a8]",
			active: category === "Bài tập bổ trợ theo SGK",
		},
	];

	const handleTestClick = (test: any) => {
		if (!user) {
			setShowLoginModal(true);
			return;
		}
		router.push(`/bai-thi/${test.id}`);
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="border-b border-slate-50 bg-white py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb
						items={[
							{ label: "Test", href: "/kiem-tra-truc-tuyen" },
							{ label: activeGrade, active: true },
						]}
						variant="dark"
					/>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
				<div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
					{/* Main Content */}
					<div className="w-full lg:w-2/3">
						{/* Grade Tabs */}
						<div className="no-scrollbar mb-8 flex overflow-x-auto border-b border-slate-100 lg:mb-12">
							{grades.map((grade) => (
								<button
									key={grade}
									onClick={() => setActiveGrade(grade)}
									className={`relative px-6 py-3 text-base font-bold whitespace-nowrap transition-all lg:px-12 lg:py-4 lg:text-lg ${
										activeGrade === grade ? "text-stem-blue" : "text-slate-400 hover:text-slate-600"
									}`}
								>
									{grade}
									{activeGrade === grade && (
										<motion.div
											layoutId="activeGradeTab"
											className="bg-stem-blue absolute right-0 bottom-0 left-0 h-1"
										/>
									)}
								</button>
							))}
						</div>

						{/* Test Sections */}
						<div className="space-y-16">
							{testSections.map((section, idx) => (
								<div key={idx} className="space-y-6 lg:space-y-8">
									{section.title && (
										<div className="flex items-center gap-3 lg:gap-4">
											<div className="bg-stem-blue h-6 w-1 rounded-full lg:h-8 lg:w-1.5" />
											<h2 className="text-xl font-black text-slate-800 lg:text-2xl">
												{section.title}
											</h2>
										</div>
									)}

									{section.items && (
										<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
											{section.items.map((item) => (
												<motion.div
													key={item.id}
													whileHover={{ y: -5 }}
													className="group cursor-pointer"
													onClick={() => handleTestClick(item)}
												>
													<div className="relative mb-3 aspect-16/10 overflow-hidden rounded-2xl border border-slate-100 shadow-md lg:mb-4">
														<Image
															src={item.img}
															alt={item.title}
															fill
															sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
															className="object-cover transition-transform duration-500 group-hover:scale-110"
															referrerPolicy="no-referrer"
														/>
														<div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
														<div className="absolute inset-3 flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white/90 p-3 text-center shadow-sm lg:inset-4 lg:p-4">
															<div className="text-stem-blue mb-0.5 text-[8px] font-black tracking-widest uppercase lg:mb-1 lg:text-[10px]">
																STEMKey
															</div>
															<div className="mb-0.5 text-[10px] font-bold text-slate-800 lg:mb-1 lg:text-xs">
																Đề ôn thi HSG - {activeGrade}
															</div>
															<div className="text-[8px] text-slate-500 lg:text-[10px]">
																(Test {item.id})
															</div>
														</div>
													</div>
													<h3 className="group-hover:text-stem-blue line-clamp-2 text-sm leading-snug font-bold text-slate-700 transition-colors">
														{item.title}
													</h3>
												</motion.div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Sidebar */}
					<div className="w-full space-y-8 lg:w-1/3">
						{/* Test Categories */}
						<div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-5 lg:p-6">
							<h3 className="mb-4 px-1 text-lg font-black text-slate-900 lg:mb-6 lg:px-2 lg:text-xl">
								Các nhóm test
							</h3>
							<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:gap-3">
								{sidebarCategories.map((cat, idx) => (
									<SidebarItem key={idx} {...cat} />
								))}
							</div>
						</div>

						{/* Quick Links */}
						<div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
							<div className="border-b border-slate-100 bg-slate-50/30 p-5">
								<h3 className="font-bold text-slate-900">Liên kết nhanh</h3>
							</div>
							<div className="divide-y divide-slate-50">
								<div className="group flex cursor-pointer items-center justify-between p-5 transition-colors hover:bg-slate-50">
									<div className="flex items-center gap-3">
										<Calendar size={18} className="text-slate-400" />
										<span className="text-sm font-medium text-slate-600">Lịch khai giảng</span>
									</div>
									<span className="text-stem-blue flex items-center gap-1 text-xs font-bold">
										Xem chi tiết <ArrowRight size={12} />
									</span>
								</div>
								<div className="group flex cursor-pointer items-center justify-between p-5 transition-colors hover:bg-slate-50">
									<div className="flex items-center gap-3">
										<Book size={18} className="text-slate-400" />
										<span className="text-sm font-medium text-slate-600">
											Giáo trình tự học STEM
										</span>
									</div>
									<span className="text-stem-blue flex items-center gap-1 text-xs font-bold">
										Xem chi tiết <ArrowRight size={12} />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Yêu cầu đăng nhập">
				<div className="space-y-6 text-center">
					<div className="text-stem-red mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 shadow-inner">
						<Lock size={40} />
					</div>

					<div className="space-y-2">
						<h4 className="text-xl font-bold text-slate-900">Bạn chưa đăng nhập</h4>
						<p className="text-sm leading-relaxed text-slate-500">
							Vui lòng đăng nhập tài khoản STEMKey để có thể tham gia làm bài thi và lưu lại kết quả học
							tập của mình.
						</p>
					</div>

					<div className="flex flex-col gap-3 pt-2">
						<Button
							variant="primary"
							className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold"
							onClick={() => {
								setShowLoginModal(false);
								router.push("/dang-nhap");
							}}
						>
							<User size={18} /> Đăng nhập ngay
						</Button>
						<button
							onClick={() => setShowLoginModal(false)}
							className="py-2 text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
						>
							Để sau
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
