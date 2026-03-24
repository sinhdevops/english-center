"use client";

import { motion } from "motion/react";
import { Brain, Star, Trophy, Target, Clock, ClipboardList, GraduationCap, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import CardRegistration from "@/components/pages/shared/card-registration";

const CATEGORY_SLUG = "danh-gia-nang-luc-tu-duy";

const quizCategories = [
	{
		nhom: "tu-duy-3-4-tuoi",
		ageLabel: "3-4 TUỔI",
		name: "Mầm Non",
		description: "Khám phá thế giới quan và tư duy sơ khai thông qua hình ảnh.",
		icon: Brain,
		iconBg: "bg-blue-50",
		iconColor: "text-blue-500",
		duration: "45 phút",
		questions: 30,
	},
	{
		nhom: "tu-duy-4-5-tuoi",
		ageLabel: "4-5 TUỔI",
		name: "Tiền Tiểu Học",
		description: "Chuẩn bị hành trang vững chắc với các bài tập nhận diện số và chữ.",
		icon: Star,
		iconBg: "bg-green-50",
		iconColor: "text-green-500",
		duration: "45 phút",
		questions: 30,
	},
	{
		nhom: "tu-duy-5-6-tuoi",
		ageLabel: "5-6 TUỔI",
		name: "Tiểu Học Cơ Bản",
		description: "Phát triển tư duy logic, toán học và khả năng giải quyết vấn đề.",
		icon: Trophy,
		iconBg: "bg-orange-50",
		iconColor: "text-orange-500",
		duration: "60 phút",
		questions: 30,
	},
	{
		nhom: "tu-duy-tieu-hoc",
		ageLabel: "Tiểu Học",
		name: "Tiểu Học Nâng Cao",
		description: "Thử thách bản thân với các bài toán tư duy phức tạp và trừu tượng.",
		icon: Target,
		iconBg: "bg-purple-50",
		iconColor: "text-purple-500",
		duration: "60 phút",
		questions: 30,
	},
];

export default function PageContent({ branches = [], courses = [] }: { branches: any; courses: any }) {
	const router = useRouter();

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
								<div className="relative z-10 h-64 w-64 overflow-hidden rounded-full border-8 border-white/20 lg:h-80 lg:w-80">
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
			<div className="relative z-20 mx-auto -mt-24 max-w-7xl px-4 text-left lg:-mt-32">
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
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className="group flex cursor-pointer flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-md transition-all hover:shadow-xl"
								onClick={() => router.push(`/kiem-tra-truc-tuyen/${CATEGORY_SLUG}?nhom=${cat.nhom}`)}
							>
								<div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cat.iconBg}`}>
									<Icon size={24} className={cat.iconColor} />
								</div>
								<p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">{cat.ageLabel}</p>
								<h3 className="mb-2 text-xl font-bold text-slate-800">{cat.name}</h3>
								<p className="mb-6 flex-1 text-sm text-slate-500">{cat.description}</p>
								<div className="mb-4 flex items-center gap-4 text-xs text-slate-400">
									<span className="flex items-center gap-1"><Clock size={13} /> {cat.duration}</span>
									<span className="flex items-center gap-1"><ClipboardList size={13} /> {cat.questions} câu</span>
								</div>
								<button className="flex items-center gap-1 text-sm font-bold text-[#ED1C24] transition-colors group-hover:text-[#c0151b]">
									Bắt đầu <ChevronRight size={16} />
								</button>
							</motion.div>
						);
					})}
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
