"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import React from "react";

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
		<section id="registration-form" className="bg-slate-50 py-24">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl lg:flex-row">
					<div className="bg-stem-blue flex w-full flex-col justify-center p-12 text-white lg:w-1/2 lg:p-16">
						<h2 className="mb-8 text-4xl leading-tight font-bold uppercase lg:text-5xl">
							Đăng ký học thử <br /> & nhận quà tặng
						</h2>
						<p className="mb-12 text-lg leading-relaxed font-medium text-white/80">
							Hãy để STEMKey đồng hành cùng con chinh phục tương lai. Đăng ký ngay để nhận ưu đãi đặc biệt
							và lộ trình học cá nhân hóa.
						</p>
						<div className="space-y-6">
							{[
								"Test năng lực miễn phí",
								"Học thử cùng giáo viên tinh hoa",
								"Quà tặng bộ học liệu sáng tạo",
							].map((text, i) => (
								<div key={i} className="flex items-center gap-4">
									<div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm">
										✓
									</div>
									<span className="font-bold">{text}</span>
								</div>
							))}
						</div>
					</div>

					<div className="w-full p-12 lg:w-1/2 lg:p-16">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="space-y-2">
									<label htmlFor="parentName" className="text-sm font-bold text-slate-700">
										Họ và tên phụ huynh *
									</label>
									<input
										id="parentName"
										{...register("parentName")}
										className={`w-full rounded-xl border px-5 py-4 ${errors.parentName ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 transition-all outline-none focus:ring-2`}
										placeholder="Ví dụ: Nguyễn Văn A"
									/>
									{errors.parentName && (
										<p className="mt-1 text-xs text-red-500">{errors.parentName.message}</p>
									)}
								</div>
								<div className="space-y-2">
									<label htmlFor="phone" className="text-sm font-bold text-slate-700">
										Số điện thoại *
									</label>
									<input
										id="phone"
										{...register("phone")}
										className={`w-full rounded-xl border px-5 py-4 ${errors.phone ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 transition-all outline-none focus:ring-2`}
										placeholder="Ví dụ: 0912345678"
									/>
									{errors.phone && (
										<p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<label htmlFor="email" className="text-sm font-bold text-slate-700">
									Email liên lạc *
								</label>
								<input
									id="email"
									{...register("email")}
									className={`w-full rounded-xl border px-5 py-4 ${errors.email ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 transition-all outline-none focus:ring-2`}
									placeholder="Ví dụ: phuhuynh@gmail.com"
								/>
								{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
							</div>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="space-y-2">
									<label htmlFor="childName" className="text-sm font-bold text-slate-700">
										Họ tên của con *
									</label>
									<input
										id="childName"
										{...register("childName")}
										className={`w-full rounded-xl border px-5 py-4 ${errors.childName ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 transition-all outline-none focus:ring-2`}
									/>
									{errors.childName && (
										<p className="mt-1 text-xs text-red-500">{errors.childName.message}</p>
									)}
								</div>
								<div className="space-y-2">
									<label htmlFor="childClass" className="text-sm font-bold text-slate-700">
										Lớp của con *
									</label>
									<input
										id="childClass"
										{...register("childClass")}
										className={`w-full rounded-xl border px-5 py-4 ${errors.childClass ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 transition-all outline-none focus:ring-2`}
									/>
									{errors.childClass && (
										<p className="mt-1 text-xs text-red-500">{errors.childClass.message}</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="space-y-2">
									<label htmlFor="course" className="text-sm font-bold text-slate-700">
										Khóa học quan tâm *
									</label>
									<select
										id="course"
										{...register("course")}
										className={`w-full rounded-xl border px-5 py-4 ${errors.course ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 bg-white transition-all outline-none focus:ring-2`}
									>
										<option value="">Chọn khóa học</option>
										<option value="Toán tư duy">Toán tư duy</option>
										<option value="Robotics">Robotics</option>
										<option value="Tiếng Anh">Tiếng Anh</option>
									</select>
								</div>
								<div className="space-y-2">
									<label htmlFor="branch" className="text-sm font-bold text-slate-700">
										Cơ sở đăng ký *
									</label>
									<select
										id="branch"
										{...register("branch")}
										className={`w-full rounded-xl border px-5 py-4 ${errors.branch ? "border-red-500" : "border-slate-200"} focus:ring-stem-blue/20 bg-white transition-all outline-none focus:ring-2`}
									>
										<option value="">Chọn cơ sở</option>
										<option value="Nam An Khánh">Nam An Khánh</option>
										<option value="Đống Đa">Đống Đa</option>
									</select>
								</div>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="shadow-stem-blue/20 mt-4 w-full rounded-2xl py-6 text-lg font-black tracking-widest uppercase shadow-xl"
							>
								{isSubmitting ? "Đang gửi..." : "Đăng ký giữ chỗ ngay"}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(RegistrationSection);
