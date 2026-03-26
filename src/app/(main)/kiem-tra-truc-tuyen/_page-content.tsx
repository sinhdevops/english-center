"use client";

import { motion } from "motion/react";
import { Brain, Star, Trophy, Target, GraduationCap, ChevronRight, ClipboardList } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import CardRegistration from "@/components/pages/shared/card-registration";

const CATEGORY_SLUG = "danh-gia-nang-luc-tu-duy";

const quizCategories = [
	{
		nhom: "3-4-tuoi",
		ageLabel: "3-4 TUỔI",
		name: "Mầm Non",
		description: "Khám phá thế giới quan và tư duy sơ khai thông qua hình ảnh.",
		icon: Brain,
		iconBg: "bg-blue-50",
		iconColor: "text-blue-500",
	},
	{
		nhom: "4-5-tuoi",
		ageLabel: "4-5 TUỔI",
		name: "Tiền Tiểu Học",
		description: "Chuẩn bị hành trang vững chắc với các bài tập nhận diện số và chữ.",
		icon: Star,
		iconBg: "bg-green-50",
		iconColor: "text-green-500",
	},
	{
		nhom: "5-6-tuoi",
		ageLabel: "5-6 TUỔI",
		name: "Tiểu Học Cơ Bản",
		description: "Phát triển tư duy logic, toán học và khả năng giải quyết vấn đề.",
		icon: Trophy,
		iconBg: "bg-orange-50",
		iconColor: "text-orange-500",
	},
	{
		nhom: "tieu-hoc",
		ageLabel: "TIỂU HỌC",
		name: "Tiểu Học Nâng Cao",
		description: "Thử thách bản thân với các bài toán tư duy phức tạp và trừu tượng.",
		icon: Target,
		iconBg: "bg-purple-50",
		iconColor: "text-purple-500",
	},
];

export default function PageContent({ branches = [], courses = [] }: { branches: any; courses: any }) {
	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-[#ED1C24] pt-10 pb-20 lg:pt-14 lg:pb-28">
				<div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
				<div className="absolute right-0 bottom-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-black/5 blur-3xl" />

				<div className="relative z-10 mx-auto max-w-7xl px-4">
					<div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
						<div className="w-full text-center text-white md:text-left lg:w-3/5">
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm"
							>
								<Star size={14} className="text-yellow-300" />
								Kiểm tra trực tuyến miễn phí
							</motion.div>
							<motion.h1
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.05 }}
								className="mb-3 text-4xl leading-tight font-black tracking-tight uppercase lg:text-6xl"
							>
								Thử trình <br />
								<span className="text-white/90">STEM & Robotics</span>
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 }}
								className="text-base font-medium text-white/80 lg:text-lg"
							>
								Khám phá hàng ngàn bài test online{" "}
								<span className="font-black text-yellow-400">MIỄN PHÍ</span>
								{" "}— đánh giá năng lực tư duy cho mọi độ tuổi.
							</motion.p>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.15 }}
							className="flex w-full flex-wrap justify-center gap-4 lg:w-2/5 lg:justify-end"
						>
							{[
								{ value: "1000+", label: "Bài test" },
								{ value: "4", label: "Cấp độ" },
								{ value: "100%", label: "Miễn phí" },
							].map((stat) => (
								<div key={stat.label} className="flex flex-col items-center rounded-2xl bg-white/15 px-8 py-5 backdrop-blur-sm">
									<span className="text-3xl font-black text-white lg:text-4xl">{stat.value}</span>
									<span className="mt-1 text-sm font-medium text-white/70">{stat.label}</span>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Registration Form Overlay */}
			<div className="relative z-20 mx-auto -mt-14 max-w-7xl px-4 pb-10 lg:-mt-20">
				<CardRegistration branches={branches} courses={courses} />
			</div>

			<div className="bg-white py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb items={[{ label: "Test online", active: true }]} variant="dark" />
				</div>
			</div>

			{/* Test Selection Section */}
			<section className="mx-auto max-w-7xl px-4 pb-20 pt-10">
				<div className="mb-16 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-4 text-4xl font-semibold tracking-tight uppercase lg:text-5xl"
					>
						Đánh giá năng lực
					</motion.h2>
					<div className="mx-auto h-1.5 w-24 rounded-full bg-[#ED1C24]" />
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{quizCategories.map((cat, idx) => {
						const Icon = cat.icon;
						return (
							<Link
								key={idx}
								href={`/kiem-tra-truc-tuyen/${CATEGORY_SLUG}?nhom=${cat.nhom}`}
								className="group flex cursor-pointer flex-col rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-md"
							>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: idx * 0.1 }}
								>
									<div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cat.iconBg}`}>
										<Icon size={24} className={cat.iconColor} />
									</div>
									<p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">{cat.ageLabel}</p>
									<h3 className="mb-2 text-xl font-bold text-slate-800">{cat.name}</h3>
									<p className="mb-6 flex-1 text-sm text-slate-500">{cat.description}</p>
												<button className="flex items-center gap-1 text-sm font-bold text-[#ED1C24] transition-colors group-hover:text-[#c0151b]">
										Xem bài test <ChevronRight size={16} />
									</button>
								</motion.div>
							</Link>
						);
					})}
				</div>
			</section>

			{/* Footer Info */}
			<section className="bg-slate-50 py-20">
				<div className="mx-auto max-w-7xl px-4 text-center md:text-left">
					<div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
						<div className="space-y-4">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
								<ClipboardList size={32} />
							</div>
							<h4 className="text-xl font-bold text-slate-900">1000+ Bài Test</h4>
							<p className="text-sm text-slate-500">
								Hệ thống ngân hàng câu hỏi đa dạng, bám sát chương trình học.
							</p>
						</div>
						<div className="space-y-4">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
								<Trophy size={32} />
							</div>
							<h4 className="text-xl font-bold text-slate-900">Kết quả tức thì</h4>
							<p className="text-sm text-slate-500">
								Nhận kết quả và lời giải chi tiết ngay sau khi hoàn thành bài thi.
							</p>
						</div>
						<div className="space-y-4">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
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
