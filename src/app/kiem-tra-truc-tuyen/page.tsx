"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
	ChevronRight,
	ClipboardList,
	GraduationCap,
	BookOpen,
	Trophy,
	Send,
	Loader2,
	CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const consultationSchema = z.object({
	parentName: z.string().min(2, "Vui lòng nhập họ tên phụ huynh"),
	childName: z.string().min(2, "Vui lòng nhập họ tên con"),
	phone: z.string().regex(/^(0|84)(3|5|7|8|9)([0-9]{8})$/, "Số điện thoại không hợp lệ"),
	email: z.string().email("Email không hợp lệ"),
	grade: z.string().min(1, "Vui lòng nhập lớp của con"),
	campus: z.string().min(1, "Vui lòng chọn cơ sở đào tạo"),
	message: z.string().optional(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

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
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ConsultationFormValues>({
		resolver: zodResolver(consultationSchema),
	});

	const onSubmit = async (data: ConsultationFormValues) => {
		setIsSubmitting(true);
		console.log("Form data:", data);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsSubmitting(false);
		setIsSuccess(true);
		reset();
		setTimeout(() => setIsSuccess(false), 5000);
	};

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
			<section className="relative overflow-hidden bg-[#e31e24] pt-16 pb-32 lg:pb-48">
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
								<span className="text-white/90">STEM & Robotics</span>
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 }}
								className="text-xl font-medium text-white/80 lg:text-2xl"
							>
								Khám phá hàng ngàn bài test online{" "}
								<span className="font-black text-yellow-300">MIỄN PHÍ</span>
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
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-black/10 lg:p-12"
				>
					<div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
						<h2 className="text-2xl font-black text-slate-900 lg:text-3xl">Đăng ký nhận tư vấn</h2>
						{isSuccess && (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600"
							>
								<CheckCircle2 size={18} />
								Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.
							</motion.div>
						)}
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
					>
						<div className="space-y-2">
							<label className="ml-1 text-xs font-bold text-slate-400 uppercase">
								Họ và tên phụ huynh
							</label>
							<input
								{...register("parentName")}
								type="text"
								placeholder="Nhập họ tên bạn"
								className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-2 focus:outline-none ${
									errors.parentName
										? "border-red-500 focus:ring-red-200"
										: "focus:ring-stem-blue/20 border-slate-100"
								}`}
							/>
							{errors.parentName && (
								<p className="ml-1 text-[10px] font-bold text-red-500">{errors.parentName.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="ml-1 text-xs font-bold text-slate-400 uppercase">Họ tên con</label>
							<input
								{...register("childName")}
								type="text"
								placeholder="Nhập họ tên con"
								className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-2 focus:outline-none ${
									errors.childName
										? "border-red-500 focus:ring-red-200"
										: "focus:ring-stem-blue/20 border-slate-100"
								}`}
							/>
							{errors.childName && (
								<p className="ml-1 text-[10px] font-bold text-red-500">{errors.childName.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="ml-1 text-xs font-bold text-slate-400 uppercase">Số điện thoại</label>
							<input
								{...register("phone")}
								type="tel"
								placeholder="Nhập số điện thoại"
								className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-2 focus:outline-none ${
									errors.phone
										? "border-red-500 focus:ring-red-200"
										: "focus:ring-stem-blue/20 border-slate-100"
								}`}
							/>
							{errors.phone && (
								<p className="ml-1 text-[10px] font-bold text-red-500">{errors.phone.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="ml-1 text-xs font-bold text-slate-400 uppercase">Email</label>
							<input
								{...register("email")}
								type="email"
								placeholder="Nhập email"
								className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-2 focus:outline-none ${
									errors.email
										? "border-red-500 focus:ring-red-200"
										: "focus:ring-stem-blue/20 border-slate-100"
								}`}
							/>
							{errors.email && (
								<p className="ml-1 text-[10px] font-bold text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="ml-1 text-xs font-bold text-slate-400 uppercase">Con học lớp</label>
							<input
								{...register("grade")}
								type="text"
								placeholder="Nhập lớp con học"
								className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-2 focus:outline-none ${
									errors.grade
										? "border-red-500 focus:ring-red-200"
										: "focus:ring-stem-blue/20 border-slate-100"
								}`}
							/>
							{errors.grade && (
								<p className="ml-1 text-[10px] font-bold text-red-500">{errors.grade.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="ml-1 text-xs font-bold text-slate-400 uppercase">Cơ sở đào tạo</label>
							<div className="relative">
								<select
									{...register("campus")}
									className={`w-full grow appearance-none rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-2 focus:outline-none ${
										errors.campus
											? "border-red-500 focus:ring-red-200"
											: "focus:ring-stem-blue/20 border-slate-100"
									}`}
								>
									<option value="">Chọn cơ sở</option>
									<option value="cs1">Cơ sở 1: Hà Nội</option>
									<option value="cs2">Cơ sở 2: TP.HCM</option>
									<option value="cs3">Cơ sở 3: Đà Nẵng</option>
								</select>
								<ChevronRight
									className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rotate-90 text-slate-400"
									size={16}
								/>
							</div>
							{errors.campus && (
								<p className="ml-1 text-[10px] font-bold text-red-500">{errors.campus.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<label className="ml-1 text-xs font-bold text-slate-400 uppercase">Bạn cần tư vấn?</label>
							<input
								{...register("message")}
								type="text"
								placeholder="Nhập nội dung cần tư vấn"
								className="focus:ring-stem-blue/20 w-full grow rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-2 focus:outline-none"
							/>
						</div>
						<div className="flex items-end">
							<button
								type="submit"
								disabled={isSubmitting}
								className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00a699] py-4 text-sm font-black tracking-widest text-white uppercase shadow-lg shadow-[#00a699]/20 transition-all hover:bg-[#008c81] disabled:cursor-not-allowed disabled:opacity-70"
							>
								{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
								{isSubmitting ? "Đang gửi..." : "Đăng ký tư vấn"}
							</button>
						</div>
					</form>
				</motion.div>
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
					<div className="bg-stem-red mx-auto h-1.5 w-24 rounded-full" />
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
