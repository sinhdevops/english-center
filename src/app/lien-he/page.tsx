"use client";

import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-slate-50 py-12 lg:py-20">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header Section */}
				<div className="mb-16 text-center">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-4 text-4xl font-black text-slate-900"
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
					{[
						{
							icon: <Phone className="text-stem-blue" />,
							title: "Hotline",
							detail: "0325 610 016",
							sub: "Hỗ trợ 24/7",
						},
						{
							icon: <Mail className="text-stem-green" />,
							title: "Email",
							detail: "contact@stemkey.edu.vn",
							sub: "Phản hồi trong 24h",
						},
						{
							icon: <Clock className="text-orange-500" />,
							title: "Giờ làm việc",
							detail: "08:00 - 21:00",
							sub: "Thứ 2 - Chủ Nhật",
						},
					].map((item, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
						>
							<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
								{item.icon}
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
					className="overflow-hidden rounded-[40px] border border-slate-100 bg-white shadow-xl"
				>
					<div className="flex flex-col lg:flex-row">
						{/* Form Side */}
						<div className="w-full p-8 lg:w-1/2 lg:p-12">
							<form className="space-y-6">
								<div className="grid grid-cols-1 gap-6">
									<div>
										<input
											type="text"
											placeholder="Họ và tên phụ huynh"
											className="focus:ring-stem-blue/20 w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:outline-none"
										/>
									</div>
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										<input
											type="email"
											placeholder="Email"
											className="focus:ring-stem-blue/20 w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:outline-none"
										/>
										<input
											type="tel"
											placeholder="Số điện thoại"
											className="focus:ring-stem-blue/20 w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:outline-none"
										/>
									</div>
									<div>
										<input
											type="text"
											placeholder="Họ tên con"
											className="focus:ring-stem-blue/20 w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:outline-none"
										/>
									</div>
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										<input
											type="text"
											placeholder="Con học lớp"
											className="focus:ring-stem-blue/20 w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:outline-none"
										/>
										<select className="focus:ring-stem-blue/20 w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-slate-500 transition-all focus:ring-2 focus:outline-none">
											<option value="">Chọn cơ sở</option>
											<option value="nam-an-khanh">STEMKey Nam An Khánh</option>
											<option value="ha-dong">STEMKey Hà Đông</option>
											<option value="cau-giay">STEMKey Cầu Giấy</option>
										</select>
									</div>
									<div>
										<textarea
											placeholder="Nhập tin nhắn"
											rows={4}
											className="focus:ring-stem-blue/20 w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:outline-none"
										></textarea>
									</div>
								</div>
								<button
									type="submit"
									className="bg-stem-blue flex w-full transform items-center justify-center gap-3 rounded-2xl py-5 text-xl font-black text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 hover:bg-red-700"
								>
									GỬI <Send size={20} />
								</button>
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
									<div>
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
