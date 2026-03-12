"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { registrationSchema } from "@/lib/validations/admin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface FormRegistrationProps {
	branches?: any[];
	courses?: any[];
}

const FormRegistration = ({ branches = [], courses = [] }: FormRegistrationProps) => {
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

			toast.success("Đăng ký giữ chỗ thành công! Chúng tôi sẽ liên hệ lại sớm.");
			reset();
		} catch (error: any) {
			console.error("Error submitting registration:", error);
			toast.error(error.message || "Lỗi khi gửi thông tin đăng ký. Vui lòng thử lại.");
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0, x: 30 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			className="w-full rounded-xl bg-white p-4 shadow-2xl lg:w-1/2 lg:p-12"
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
					{errors.parentName && <p className="ml-2 text-xs text-red-500">{errors.parentName.message}</p>}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="space-y-1">
						<input
							{...register("email")}
							type="email"
							placeholder="Nhập email"
							className={`w-full border bg-slate-50 px-6 py-4 ${errors.email ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
						/>
						{errors.email && <p className="ml-2 text-xs text-red-500">{errors.email.message}</p>}
					</div>
					<div className="space-y-1">
						<input
							{...register("phone")}
							type="tel"
							placeholder="Nhập số điện thoại"
							className={`w-full border bg-slate-50 px-6 py-4 ${errors.phone ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
						/>
						{errors.phone && <p className="ml-2 text-xs text-red-500">{errors.phone.message}</p>}
					</div>
				</div>

				<div className="space-y-1">
					<input
						{...register("childName")}
						type="text"
						placeholder="Nhập họ tên của con"
						className={`w-full border bg-slate-50 px-6 py-4 ${errors.childName ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
					/>
					{errors.childName && <p className="ml-2 text-xs text-red-500">{errors.childName.message}</p>}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="space-y-1">
						<input
							{...register("childClass")}
							type="text"
							placeholder="Nhập lớp con học"
							className={`w-full border bg-slate-50 px-6 py-4 ${errors.childClass ? "border-red-500" : "border-slate-100"} rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
						/>
						{errors.childClass && <p className="ml-2 text-xs text-red-500">{errors.childClass.message}</p>}
					</div>
					<div className="relative space-y-1">
						<select
							{...register("course")}
							className={`w-full border bg-slate-50 px-6 py-4 ${errors.course ? "border-red-500" : "border-slate-100"} appearance-none rounded-xl text-slate-500 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
						>
							<option value="">Chọn khóa học</option>
							{courses.map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>
						<ChevronDown
							className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
							size={20}
						/>
						{errors.course && <p className="ml-2 text-xs text-red-500">{errors.course.message}</p>}
					</div>
				</div>

				<div className="relative space-y-1">
					<select
						{...register("branch")}
						className={`w-full border bg-slate-50 px-6 py-4 ${errors.branch ? "border-red-500" : "border-slate-100"} appearance-none rounded-xl text-slate-500 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none`}
					>
						<option value="">Chọn cơ sở gần bạn</option>
						{branches.map((b) => (
							<option key={b.id} value={b.id}>
								{b.name}
							</option>
						))}
					</select>
					<ChevronDown
						className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
						size={20}
					/>
					{errors.branch && <p className="ml-2 text-xs text-red-500">{errors.branch.message}</p>}
				</div>

				<Button
					type="submit"
					size="lg"
					disabled={isSubmitting}
					className="mt-4 w-full rounded-xl text-lg font-black tracking-wider text-white uppercase shadow-lg shadow-blue-200 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-70"
				>
					{isSubmitting ? "ĐANG XỬ LÝ..." : "GIỮ CHỖ NGAY"}
				</Button>

				<p className="mt-6 text-center font-medium text-slate-600">
					* Vui lòng để ý điện thoại, chúng tôi sẽ liên hệ bạn sớm (trong vòng 24h)
				</p>
			</form>
		</motion.div>
	);
};

export default FormRegistration;
