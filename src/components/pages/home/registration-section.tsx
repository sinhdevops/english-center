"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { home } from "../../../../public/statics/images";

const registrationSchema = z.object({
	parentName: z.string().min(1, "Vui lòng nhập họ tên"),
	email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
	phone: z
		.string()
		.min(10, "Số điện thoại phải có ít nhất 10 số")
		.max(11, "Số điện thoại không quá 11 số")
		.regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
	childName: z.string().min(1, "Vui lòng nhập họ tên của con"),
	childClass: z.string().min(1, "Vui lòng nhập lớp của con"),
	course: z.string().min(1, "Vui lòng nhập khóa học quan tâm"),
	branch: z.string().min(1, "Vui lòng chọn cơ sở"),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const RegistrationSection = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			parentName: "",
			email: "",
			phone: "",
			childName: "",
			childClass: "",
			course: "",
			branch: "",
		},
	});

	const onSubmit = async (data: RegistrationFormValues) => {
		console.log("Registration data:", data);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		alert("Đăng ký giữ chỗ thành công! Chúng tôi sẽ liên hệ lại sớm.");
		reset();
	};

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="relative flex flex-col items-center gap-12 overflow-hidden rounded-xl bg-[#00BA3D] p-8 lg:flex-row lg:gap-20 lg:p-16">
					{/* Left: Content & Image */}
					<div className="z-10 w-full text-white lg:w-1/2">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="mb-6 text-4xl font-black tracking-tight lg:text-4xl"
						>
							QUÀ TẶNG HẤP DẪN
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="mb-12 max-w-md text-lg font-medium opacity-90 lg:text-xl"
						>
							Cơ hội nhận học bổng lên tới 40% và các phần quà hấp dẫn khác đang chờ bạn
						</motion.p>

						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, type: "spring" }}
							className="relative"
						>
							<Image
								src={home.register}
								alt="Gifts"
								className="h-auto w-full drop-shadow-2xl"
								referrerPolicy="no-referrer"
							/>
						</motion.div>
					</div>

					{/* Right: Form Card */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="w-full rounded-xl bg-white p-8 shadow-2xl lg:w-1/2 lg:p-12"
					>
						<h3 className="mb-8 flex items-center gap-2 text-[18px] font-medium">
							Tư vấn lộ trình học và ưu đãi → Đăng ký giữ chỗ ngay
						</h3>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div className="space-y-1">
								<input
									{...register("parentName")}
									type="text"
									placeholder="Nhập họ tên của bạn"
									className={`w-full border bg-slate-50 px-6 py-4 ${errors.parentName ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
								/>
								{errors.parentName && (
									<p className="ml-2 text-xs text-red-500">{errors.parentName.message}</p>
								)}
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-1">
									<input
										{...register("email")}
										type="email"
										placeholder="Nhập email"
										className={`w-full border bg-slate-50 px-6 py-4 ${errors.email ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
									/>
									{errors.email && (
										<p className="ml-2 text-xs text-red-500">{errors.email.message}</p>
									)}
								</div>
								<div className="space-y-1">
									<input
										{...register("phone")}
										type="tel"
										placeholder="Nhập số điện thoại"
										className={`w-full border bg-slate-50 px-6 py-4 ${errors.phone ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
									/>
									{errors.phone && (
										<p className="ml-2 text-xs text-red-500">{errors.phone.message}</p>
									)}
								</div>
							</div>

							<div className="space-y-1">
								<input
									{...register("childName")}
									type="text"
									placeholder="Nhập họ tên của con"
									className={`w-full border bg-slate-50 px-6 py-4 ${errors.childName ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
								/>
								{errors.childName && (
									<p className="ml-2 text-xs text-red-500">{errors.childName.message}</p>
								)}
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-1">
									<input
										{...register("childClass")}
										type="text"
										placeholder="Nhập lớp con học"
										className={`w-full border bg-slate-50 px-6 py-4 ${errors.childClass ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
									/>
									{errors.childClass && (
										<p className="ml-2 text-xs text-red-500">{errors.childClass.message}</p>
									)}
								</div>
								<div className="space-y-1">
									<input
										{...register("course")}
										type="text"
										placeholder="Nhập khóa học"
										className={`w-full border bg-slate-50 px-6 py-4 ${errors.course ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
									/>
									{errors.course && (
										<p className="ml-2 text-xs text-red-500">{errors.course.message}</p>
									)}
								</div>
							</div>

							<div className="space-y-1">
								<select
									{...register("branch")}
									className={`w-full border bg-slate-50 px-6 py-4 ${errors.branch ? "border-red-500" : "border-slate-100"} appearance-none rounded-xl text-slate-500 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
								>
									<option value="">Chọn cơ sở gần bạn</option>
									<option value="Cơ sở Nam An Khánh">Cơ sở Nam An Khánh</option>
									<option value="Cơ sở Quận 7">Cơ sở Quận 7</option>
								</select>
								{errors.branch && <p className="ml-2 text-xs text-red-500">{errors.branch.message}</p>}
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="mt-4 w-full rounded-xl py-5 text-lg font-black tracking-wider text-white uppercase shadow-lg shadow-blue-200 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-70"
							>
								{isSubmitting ? "ĐANG XỬ LÝ..." : "GIỮ CHỖ NGAY"}
							</Button>

							<p className="mt-6 text-center text-sm font-medium text-slate-400">
								* Vui lòng để ý điện thoại, chúng tôi sẽ liên hệ bạn sớm (trong vòng 24h)
							</p>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(RegistrationSection);
