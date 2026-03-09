"use client";

import { motion } from "motion/react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registrationSchema } from "@/lib/validations/admin";
import { ChevronDown, Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const CardRegistration = () => {
	const [branches, setBranches] = useState<any[]>([]);
	const [courses, setCourses] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const { data: bData } = await supabase.from("branches").select("id, name");
			const { data: cData } = await supabase.from("courses").select("id, name");
			if (bData) setBranches(bData);
			if (cData) setCourses(cData);
		};
		fetchData();
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
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

			toast.success("Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ lại sớm.");
			reset();
		} catch (error: any) {
			console.error("Error submitting registration:", error);
			toast.error(error.message || "Lỗi khi gửi thông tin đăng ký. Vui lòng thử lại.");
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-black/10 lg:p-12"
		>
			<div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<h2 className="text-2xl font-black text-slate-900 lg:text-3xl">Đăng ký nhận tư vấn</h2>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				<div className="space-y-2">
					<label className="ml-1 text-[11px] font-black tracking-wider text-slate-400 uppercase">
						Họ và tên phụ huynh
					</label>
					<input
						{...register("parentName")}
						type="text"
						placeholder="Nhập họ tên bạn"
						className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-4 focus:outline-none ${
							errors.parentName
								? "border-red-500 focus:ring-red-100"
								: "border-slate-100 focus:ring-blue-50"
						}`}
					/>
					{errors.parentName && (
						<p className="ml-1 text-[10px] font-bold text-red-500">{errors.parentName.message}</p>
					)}
				</div>
				<div className="space-y-2">
					<label className="ml-1 text-[11px] font-black tracking-wider text-slate-400 uppercase">
						Họ tên con
					</label>
					<input
						{...register("childName")}
						type="text"
						placeholder="Nhập họ tên con"
						className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-4 focus:outline-none ${
							errors.childName
								? "border-red-500 focus:ring-red-100"
								: "border-slate-100 focus:ring-blue-50"
						}`}
					/>
					{errors.childName && (
						<p className="ml-1 text-[10px] font-bold text-red-500">{errors.childName.message}</p>
					)}
				</div>
				<div className="space-y-2">
					<label className="ml-1 text-[11px] font-black tracking-wider text-slate-400 uppercase">
						Số điện thoại
					</label>
					<input
						{...register("phone")}
						type="tel"
						placeholder="Nhập số điện thoại"
						className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-4 focus:outline-none ${
							errors.phone ? "border-red-500 focus:ring-red-100" : "border-slate-100 focus:ring-blue-50"
						}`}
					/>
					{errors.phone && <p className="ml-1 text-[10px] font-bold text-red-500">{errors.phone.message}</p>}
				</div>
				<div className="space-y-2">
					<label className="ml-1 text-[11px] font-black tracking-wider text-slate-400 uppercase">Email</label>
					<input
						{...register("email")}
						type="email"
						placeholder="Nhập email"
						className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-4 focus:outline-none ${
							errors.email ? "border-red-500 focus:ring-red-100" : "border-slate-100 focus:ring-blue-50"
						}`}
					/>
					{errors.email && <p className="ml-1 text-[10px] font-bold text-red-500">{errors.email.message}</p>}
				</div>
				<div className="space-y-2">
					<label className="ml-1 text-[11px] font-black tracking-wider text-slate-400 uppercase">
						Con học lớp
					</label>
					<input
						{...register("childClass")}
						type="text"
						placeholder="Nhập lớp con học"
						className={`w-full grow rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-4 focus:outline-none ${
							errors.childClass
								? "border-red-500 focus:ring-red-100"
								: "border-slate-100 focus:ring-blue-50"
						}`}
					/>
					{errors.childClass && (
						<p className="ml-1 text-[10px] font-bold text-red-500">{errors.childClass.message}</p>
					)}
				</div>
				<div className="space-y-2">
					<label className="ml-1 text-[11px] font-black tracking-wider text-slate-400 uppercase">
						Khóa học quan tâm
					</label>
					<div className="relative">
						<select
							{...register("course")}
							className={`w-full grow appearance-none rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-4 focus:outline-none ${
								errors.course
									? "border-red-500 focus:ring-red-100"
									: "border-slate-100 focus:ring-blue-50"
							}`}
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
							size={16}
						/>
					</div>
					{errors.course && (
						<p className="ml-1 text-[10px] font-bold text-red-500">{errors.course.message}</p>
					)}
				</div>
				<div className="space-y-2">
					<label className="ml-1 text-[11px] font-black tracking-wider text-slate-400 uppercase">
						Cơ sở đào tạo
					</label>
					<div className="relative">
						<select
							{...register("branch")}
							className={`w-full grow appearance-none rounded-2xl border bg-slate-50 px-5 py-4 text-sm transition-all focus:ring-4 focus:outline-none ${
								errors.branch
									? "border-red-500 focus:ring-red-100"
									: "border-slate-100 focus:ring-blue-50"
							}`}
						>
							<option value="">Chọn cơ sở</option>
							{branches.map((b) => (
								<option key={b.id} value={b.id}>
									{b.name}
								</option>
							))}
						</select>
						<ChevronDown
							className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
							size={16}
						/>
					</div>
					{errors.branch && (
						<p className="ml-1 text-[10px] font-bold text-red-500">{errors.branch.message}</p>
					)}
				</div>
				<div className="flex items-end">
					<Button type="submit" disabled={isSubmitting} className="flex w-full items-center gap-2">
						{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
						{isSubmitting ? "Đang gửi..." : "Đăng ký tư vấn"}
					</Button>
				</div>
			</form>
		</motion.div>
	);
};

export default CardRegistration;
