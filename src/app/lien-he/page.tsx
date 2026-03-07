"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, BRANCHES } from "@/constants";

const contactSchema = z.object({
	parentName: z.string().min(1, "Vui lòng nhập họ tên"),
	email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
	phone: z
		.string()
		.min(10, "Số điện thoại phải có ít nhất 10 số")
		.max(11, "Số điện thoại không quá 11 số")
		.regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
	childName: z.string().min(1, "Vui lòng nhập họ tên của con"),
	childClass: z.string().min(1, "Vui lòng nhập lớp của con"),
	branch: z.string().min(1, "Vui lòng chọn cơ sở"),
	message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const IconMap: Record<string, any> = {
	phone: <Phone className="text-stem-blue" />,
	email: <Mail className="text-stem-green" />,
	time: <Clock className="text-orange-500" />,
};

export default function ContactPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			parentName: "",
			email: "",
			phone: "",
			childName: "",
			childClass: "",
			branch: "",
			message: "",
		},
	});

	const onSubmit = async (data: ContactFormValues) => {
		console.log("Contact form data:", data);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		alert("Gửi thông tin thành công! Chúng tôi sẽ liên hệ lại sớm.");
		reset();
	};

	return (
		<div className="min-h-screen bg-slate-50 py-12 text-center lg:py-20">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header Section */}
				<div className="mb-16 text-center">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-4 text-4xl font-black text-slate-900 uppercase"
					>
						LIÊN HỆ VỚI CHÚNG TÔI
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="mx-auto max-w-2xl text-slate-600"
					>
						Ba mẹ có bất kỳ thắc mắc nào về chương trình học hoặc cần tư vấn lộ trình học tập cho con, đừng
						ngần ngại để lại thông tin nhé!
					</motion.p>
				</div>

				{/* Contact Info Cards */}
				<div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
					{CONTACT_INFO.map((item, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
						>
							<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
								{IconMap[item.type]}
							</div>
							<h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
							<p className="mb-1 text-xl font-black text-slate-800">{item.detail}</p>
							<p className="text-sm text-slate-400">{item.sub}</p>
						</motion.div>
					))}
				</div>

				{/* Form & Map Section */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="rounded-40 overflow-hidden border border-slate-100 bg-white shadow-xl"
				>
					<div className="flex flex-col lg:flex-row">
						{/* Form Side */}
						<div className="w-full p-8 text-left lg:w-1/2 lg:p-12">
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								<div className="grid grid-cols-1 gap-6">
									<div className="space-y-1">
										<input
											{...register("parentName")}
											type="text"
											placeholder="Họ và tên phụ huynh"
											className={`w-full border bg-slate-50 px-6 py-4 ${errors.parentName ? "border-red-500" : "border-slate-100"} focus:ring-stem-blue/20 rounded-2xl transition-all focus:ring-2 focus:outline-none`}
										/>
										{errors.parentName && (
											<p className="ml-2 text-xs text-red-500">{errors.parentName.message}</p>
										)}
									</div>
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										<div className="space-y-1">
											<input
												{...register("email")}
												type="email"
												placeholder="Email"
												className={`w-full border bg-slate-50 px-6 py-4 ${errors.email ? "border-red-500" : "border-slate-100"} focus:ring-stem-blue/20 rounded-2xl transition-all focus:ring-2 focus:outline-none`}
											/>
											{errors.email && (
												<p className="ml-2 text-xs text-red-500">{errors.email.message}</p>
											)}
										</div>
										<div className="space-y-1">
											<input
												{...register("phone")}
												type="tel"
												placeholder="Số điện thoại"
												className={`w-full border bg-slate-50 px-6 py-4 ${errors.phone ? "border-red-500" : "border-slate-100"} focus:ring-stem-blue/20 rounded-2xl transition-all focus:ring-2 focus:outline-none`}
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
											placeholder="Họ tên con"
											className={`w-full border bg-slate-50 px-6 py-4 ${errors.childName ? "border-red-500" : "border-slate-100"} focus:ring-stem-blue/20 rounded-2xl transition-all focus:ring-2 focus:outline-none`}
										/>
										{errors.childName && (
											<p className="ml-2 text-xs text-red-500">{errors.childName.message}</p>
										)}
									</div>
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										<div className="space-y-1">
											<input
												{...register("childClass")}
												type="text"
												placeholder="Con học lớp"
												className={`w-full border bg-slate-50 px-6 py-4 ${errors.childClass ? "border-red-500" : "border-slate-100"} focus:ring-stem-blue/20 rounded-2xl transition-all focus:ring-2 focus:outline-none`}
											/>
											{errors.childClass && (
												<p className="ml-2 text-xs text-red-500">{errors.childClass.message}</p>
											)}
										</div>
										<div className="space-y-1">
											<select
												{...register("branch")}
												className={`w-full border bg-slate-50 px-6 py-4 ${errors.branch ? "border-red-500" : "border-slate-100"} focus:ring-stem-blue/20 rounded-2xl text-slate-500 transition-all focus:ring-2 focus:outline-none`}
											>
												<option value="">Chọn cơ sở</option>
												{BRANCHES.map((branch) => (
													<option key={branch.value} value={branch.value}>
														{branch.label}
													</option>
												))}
											</select>
											{errors.branch && (
												<p className="ml-2 text-xs text-red-500">{errors.branch.message}</p>
											)}
										</div>
									</div>
									<div className="space-y-1">
										<textarea
											{...register("message")}
											placeholder="Nhập tin nhắn"
											rows={4}
											className="focus:ring-stem-blue/20 w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 font-medium transition-all focus:ring-2 focus:outline-none"
										></textarea>
									</div>
								</div>
								<Button type="submit" disabled={isSubmitting} className="w-full">
									{isSubmitting ? "ĐANG GỬI..." : "GỬI"} <Send size={20} />
								</Button>
							</form>
						</div>

						{/* Map Side */}
						<div className="relative min-h-[400px] w-full lg:w-1/2">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.846513689445!2d105.7112345!3d21.0007654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134539665555555%3A0x5555555555555555!2zTmFtIEFuIEtow6FuaCwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1709100000000!5m2!1svi!2s"
								className="absolute inset-0 h-full w-full border-0"
								allowFullScreen={true}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>

							{/* Overlay info */}
							<div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
								<div className="flex items-start gap-3">
									<div className="bg-stem-blue flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
										<MapPin size={20} />
									</div>
									<div className="text-left">
										<h4 className="font-bold text-slate-900">STEMKey Nam An Khánh</h4>
										<p className="text-sm text-slate-600">
											Khu đô thị Nam An Khánh, Hoài Đức, Hà Nội
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
