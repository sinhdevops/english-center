"use client";

import React from "react";
import { motion } from "motion/react";
import { ClipboardList, GraduationCap, BookOpen, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import CardRegistration from "@/components/pages/shared/card-registration";

const TestCard: React.FC<{
	title: string;
	icon: any;
	colorClass: string;
	delay: number;
	onClick: () => void;
}> = ({ title, icon: Icon, colorClass, delay, onClick }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ delay }}
		onClick={onClick}
		className="group flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl border border-slate-100 bg-white pb-8 text-center shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl"
	>
		<div className={`relative mb-12 h-32 w-full ${colorClass}`}>
			<div className="absolute top-1/2 left-1/2 z-20 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-lg transition-transform duration-300 group-hover:scale-110">
				<Icon size={40} className="text-inherit" />
			</div>
			<div
				className="absolute right-0 bottom-0 left-0 h-8 bg-white"
				style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
			/>
		</div>
		<h3 className="group-hover:text-stem-blue px-6 text-lg leading-tight font-bold text-slate-800 transition-colors">
			{title}
		</h3>
	</motion.div>
);

export default function TestOnlinePage() {
	const router = useRouter();

	const testCategories = [
		{
			title: "Đề thi học sinh giỏi",
			icon: Trophy,
			colorClass: "bg-[#a8e0d9]",
			delay: 0.1,
			slug: "hoc-sinh-gioi",
		},
		{
			title: "Đề thi thử trường CLC",
			icon: ClipboardList,
			colorClass: "bg-[#c3b1e1]",
			delay: 0.2,
			slug: "thi-thu-truong-clc",
		},
		{
			title: "Đề thi thử học kỳ",
			icon: GraduationCap,
			colorClass: "bg-[#fbc4ab]",
			delay: 0.3,
			slug: "thi-thu-hoc-ky",
		},
		{
			title: "Bài tập bổ trợ theo SGK",
			icon: BookOpen,
			colorClass: "bg-[#f9a8a8]",
			delay: 0.4,
			slug: "bai-tap-ho-tro",
		},
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-[#ED1C24] pt-16 pb-32 lg:pb-48">
				<div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
				<div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-black/5 blur-3xl" />

				<div className="relative z-10 mx-auto max-w-7xl px-4">
					<div className="flex flex-col items-center gap-12 lg:flex-row">
						<div className="w-full text-center text-white md:text-left lg:w-1/2">
							<motion.h1
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								className="mb-6 text-5xl leading-tight font-black tracking-tight uppercase lg:text-7xl"
							>
								Thử trình <br />
								<span className="font-bold text-white/90">STEM & Robotics</span>
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 }}
								className="text-xl font-medium text-white/80 lg:text-2xl"
							>
								Khám phá hàng ngàn bài test online{" "}
								<span className="font-black text-yellow-400">MIỄN PHÍ</span>
							</motion.p>

							<div className="mx-auto mt-12 grid w-32 grid-cols-6 gap-2 opacity-30 md:mx-0">
								{[...Array(24)].map((_, i) => (
									<div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
								))}
							</div>
						</div>

						<div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								className="relative"
							>
								<div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl lg:h-80 lg:w-80" />
								<div className="relative z-10 h-64 w-64 overflow-hidden rounded-full border-8 border-white/20 shadow-2xl lg:h-80 lg:w-80">
									<Image
										src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600"
										alt="Student"
										fill
										className="object-cover"
										referrerPolicy="no-referrer"
										priority
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Registration Form Overlay */}
			<div className="relative z-20 mx-auto -mt-24 max-w-7xl px-4 text-center md:text-left lg:-mt-32">
				<CardRegistration />
			</div>

			<div className="bg-white py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb items={[{ label: "Test online", active: true }]} variant="dark" />
				</div>
			</div>

			{/* Test Selection Section */}
			<section className="mx-auto max-w-7xl px-4 py-20">
				<div className="mb-16 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-4 text-4xl font-black tracking-tight text-slate-900 uppercase lg:text-5xl"
					>
						Lựa chọn bài test
					</motion.h2>
					<div className="mx-auto h-1.5 w-24 rounded-full bg-[#ED1C24]" />
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{testCategories.map((cat, idx) => (
						<TestCard key={idx} {...cat} onClick={() => router.push(`kiem-tra-truc-tuyen/${cat.slug}`)} />
					))}
				</div>
			</section>

			{/* Footer Info */}
			<section className="bg-slate-50 py-20">
				<div className="mx-auto max-w-7xl px-4 text-center md:text-left">
					<div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
						<div className="space-y-4">
							<div className="text-stem-blue mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
								<ClipboardList size={32} />
							</div>
							<h4 className="text-xl font-bold text-slate-900">1000+ Bài Test</h4>
							<p className="text-sm text-slate-500">
								Hệ thống ngân hàng câu hỏi đa dạng, bám sát chương trình học.
							</p>
						</div>
						<div className="space-y-4">
							<div className="text-stem-green mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
								<Trophy size={32} />
							</div>
							<h4 className="text-xl font-bold text-slate-900">Kết quả tức thì</h4>
							<p className="text-sm text-slate-500">
								Nhận kết quả và lời giải chi tiết ngay sau khi hoàn thành bài thi.
							</p>
						</div>
						<div className="space-y-4">
							<div className="text-stem-red mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
								<GraduationCap size={32} />
							</div>
							<h4 className="text-xl font-bold text-slate-900">Lộ trình cá nhân</h4>
							<p className="text-sm text-slate-500">
								Đề xuất khóa học phù hợp dựa trên kết quả đánh giá năng lực.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
