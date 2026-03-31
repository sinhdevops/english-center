"use client";

import { motion } from "motion/react";
import { ClipboardList, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registrationSchema } from "@/lib/validations/admin";
import { toast } from "sonner";
import { InputValidation } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


type RegistrationFormValues = z.infer<typeof registrationSchema>;

const CATEGORY_SLUG = "danh-gia-nang-luc-tu-duy";

const quizCategories = [
	{
		nhom: "3-4-tuoi",
		ageLabel: "3-4 tuổi",
		name: "Mầm non",
		description: "Khám phá thế giới quan và tư duy sơ khai thông qua hình ảnh.",
		icon: ClipboardList,
		color: "#E2F5E9",
		iconColor: "#4CAF50",
		btnBorder: "border-[#4CAF50]",
		btnText: "text-[#4CAF50]",
	},
	{
		nhom: "4-5-tuoi",
		ageLabel: "4-5 tuổi",
		name: "Tiền tiểu học",
		description: "Chuẩn bị hành trang vững chắc với các bài tập nhận diện số và chữ.",
		icon: ClipboardList,
		color: "#E3F2FD",
		iconColor: "#2196F3",
		btnBorder: "border-[#2196F3]",
		btnText: "text-[#2196F3]",
	},
	{
		nhom: "5-6-tuoi",
		ageLabel: "5-6 tuổi",
		name: "Tiểu học cơ bản",
		description: "Phát triển tư duy logic, toán học và khả năng giải quyết vấn đề.",
		icon: ClipboardList,
		color: "#FFEBEE",
		iconColor: "#F44336",
		btnBorder: "border-[#F44336]",
		btnText: "text-[#F44336]",
	},
	{
		nhom: "tieu-hoc",
		ageLabel: "Tiểu học",
		name: "Tiểu học nâng cao",
		description: "Thử thách bản thân với các bài toán tư duy phức tạp và trừu tượng.",
		icon: ClipboardList,
		color: "#FFF3E0",
		iconColor: "#FF9800",
		btnBorder: "border-[#FF9800]",
		btnText: "text-[#FF9800]",
	},
];

export default function PageContent({ branches = [], courses = [] }: { branches: any; courses: any }) {
	const methods = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			parentName: "",
			phone: "",
			childName: "Chưa cập nhật",
			email: "khachhang@gmail.com",
			childClass: "Chưa cập nhật",
			course: "STEM/Robotics",
			branch: "Trực tuyến",
		},
	});

	const {
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data: RegistrationFormValues) => {
		try {
			const response = await fetch("/api/registrations", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Lỗi khi gửi thông tin");
			}

			toast.success("Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ lại sớm.");
			reset();
		} catch (error: any) {
			console.error("Error submitting registration:", error);
			toast.error(error.message || "Lỗi khi gửi thông tin đăng ký. Vui lòng thử lại.");
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-[#008037] pb-24 pt-20 lg:pb-36 lg:pt-28">
				{/* Decorative shapes */}
				<div className="absolute top-0 right-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/4 rounded-full bg-white/5 blur-3xl" />
				<div className="absolute bottom-0 left-0 h-[300px] w-[300px] translate-y-1/2 -translate-x-1/4 rounded-full bg-white/5 blur-3xl" />
				<div className="absolute top-10 left-10 h-64 w-64 rounded-full border border-white/10" />

				<div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-6 text-4xl font-black tracking-tight uppercase md:text-5xl lg:text-6xl"
					>
						Thử trình STEM & ROBOTIS
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="mx-auto max-w-3xl text-base font-medium text-white/90 lg:text-lg"
					>
						Khám phá hàng ngàn bài test online <span className="font-bold">MIỄN PHÍ</span> — đánh giá năng lực tư duy cho mọi độ tuổi.
					</motion.p>
				</div>
			</section>

			{/* Registration Form Overlay */}
			<div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 lg:-mt-20">
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					className="relative overflow-hidden rounded-[20px] bg-white p-6 shadow-xl lg:p-10"
				>
					{/* Decorative shapes inside registration card */}
					<div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#E8F5E9]/50" />
					<div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#E8F5E9]/50" />

					<div className="relative z-10">
						<h2 className="mb-8 text-center text-[32px] font-semibold text-slate-800">
							ĐĂNG KÝ NHẬN TƯ VẤN
						</h2>
						<FormProvider {...methods}>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col items-start justify-center gap-4 md:flex-row"
							>
								<div className="w-full md:w-80">
									<InputValidation
										name="parentName"
										placeholder="Nhập họ tên của bạn"
										className="rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4.5 text-slate-700 outline-none transition-all focus:border-[#2196F3] focus:bg-white"
									/>
								</div>
								<div className="w-full md:w-80">
									<InputValidation
										name="phone"
										placeholder="Nhập số điện thoại"
										className="rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4.5 text-slate-700 outline-none transition-all focus:border-[#2196F3] focus:bg-white"
									/>
								</div>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-10 py-4.5 font-bold text-white shadow-lg shadow-blue-200 active:scale-95 disabled:bg-slate-400 md:w-auto"
								>
									{isSubmitting ? <Loader2 size={20} className="animate-spin" /> : "Đăng ký tư vấn"}
								</button>
							</form>
						</FormProvider>
					</div>
				</motion.div>
			</div>

			{/* Test Selection Section */}
			<section className="mx-auto max-w-7xl px-4 pb-20 pt-16">
				<div className="mb-12">
					<motion.h2
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="text-3xl font-black tracking-tight text-slate-800 uppercase lg:text-4xl"
					>
						Đánh giá năng lực
					</motion.h2>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{quizCategories.map((cat, idx) => {
						const Icon = cat.icon;
						return (
							<Link
								key={idx}
								href={`/kiem-tra-truc-tuyen/${CATEGORY_SLUG}?nhom=${cat.nhom}`}
								className="group relative flex cursor-pointer flex-col aspect-[282/306] overflow-hidden rounded-xl p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
								style={{ backgroundColor: cat.color }}
							>
								{/* Decorative circles in cards */}
								<div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20" />
								<div className="absolute top-0 right-0 h-[100%] w-[100%] opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 0%, transparent 70%)" }} />

								<div className="relative z-10 flex flex-col h-full">
									<div className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-white shadow-sm mb-6">
										<Icon size={30} style={{ color: cat.iconColor }} />
									</div>
									<p className="mb-1 text-sm font-bold text-slate-500 uppercase">{cat.ageLabel}</p>
									<h3 className="mb-4 text-2xl font-black text-slate-800 leading-tight">
										{cat.name}
									</h3>
									<p className="mb-3 flex-1 text-[15px] font-medium text-slate-500/90 leading-relaxed">
										{cat.description}
									</p>
									<div className={`inline-flex w-fit items-center justify-center rounded-full border bg-white px-8 py-2.5 font-bold transition-all group-hover:bg-slate-50 ${cat.btnBorder} ${cat.btnText} text-sm`}>
										Test ngay
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</section>
		</div>
	);
}
