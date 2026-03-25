
"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
	Target,
	Eye,
	Zap,
	Shield,
	Users,
	Rocket,
	BookOpen,
	CheckCircle,
	ArrowRight,
} from "lucide-react";
import {
	ABOUT_STATS,
	ABOUT_FEATURES,
	PROGRAMS_DATA,
	EXCLUSIVE_MODEL_ITEMS,
	MISSION_VISION,
	CORE_VALUES,
} from "@/constants";
import Teachers from "@/components/pages/home/teachers";
import { HomeImages } from "../../../../public/statics/images";
import { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { BookOpen, Users, Zap, CheckCircle };
const VALUE_ICONS = [Zap, Shield, Users, Rocket];

const GRADIENTS = [
	{ background: "linear-gradient(286.12deg, #FFCA74 9.13%, #C80057 86.64%)" },
	{ background: "linear-gradient(106.99deg, #211BCF 12.88%, #FF60B2 92.58%)" },
	{ background: "linear-gradient(284.83deg, #FFF357 16%, #00771E 96.5%)" },
];

export default function AboutPage() {
	return (
		<div className="overflow-hidden bg-white">
			{/* ── 1. HERO ── */}
			<section className="relative max-h-[400px] min-h-[400px] overflow-hidden bg-slate-950 lg:flex">

				{/* ── LEFT PANEL ── */}
				<div className="relative z-10 flex flex-col justify-center px-8 py-10 lg:w-[52%] lg:px-16 lg:py-0">

					{/* oversized watermark */}
					<div
						aria-hidden
						className="font-utm-azuki pointer-events-none absolute -bottom-4 left-0 select-none text-[120px] leading-none font-black tracking-tighter text-white/[0.04] uppercase lg:text-[160px]"
					>
						STEMKEY
					</div>

					{/* accent bar */}
					<motion.div
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="bg-stem-blue mb-4 h-1 w-12 origin-left rounded-full"
					/>

<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="mb-6 text-4xl leading-[1.1] font-black tracking-tight text-white uppercase lg:text-5xl"
					>
						Về <span className="text-stem-blue">Chúng Tôi</span>
					</motion.h1>

					{/* Program badges */}
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.35 }}
						className="flex flex-wrap gap-2"
					>
						{[
							{ label: "Toán Tư Duy", color: "bg-rose-500" },
							{ label: "Robotics", color: "bg-indigo-500" },
							{ label: "Tiếng Anh", color: "bg-emerald-500" },
						].map((b, i) => (
							<span
								key={i}
								className={`${b.color} rounded-full px-3.5 py-1 text-xs font-bold tracking-wider text-white uppercase`}
							>
								{b.label}
							</span>
						))}
					</motion.div>
				</div>

				{/* ── RIGHT PANEL — image ── */}
				<div className="relative hidden lg:block lg:w-[48%]">
					{/* diagonal clip */}
					<div
						className="absolute inset-0"
						style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0% 100%)" }}
					>
						<Image
							src={HomeImages.image5}
							alt="Học sinh STEMKey"
							fill
							className="object-cover"
							priority
						/>
						{/* gradient overlay */}
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(to right, rgba(2,6,23,0.6) 0%, transparent 40%), linear-gradient(to top, rgba(2,6,23,0.5) 0%, transparent 50%)",
							}}
						/>
					</div>

					{/* floating stat card */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.8, type: "spring" }}
						className="absolute right-8 bottom-12 rounded-2xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-md"
					>
						<div className="mb-1 text-3xl font-black text-white">1+</div>
						<div className="text-xs font-bold tracking-wider text-slate-400 uppercase">Năm hoạt động</div>
						<div className="bg-stem-blue mt-3 h-0.5 w-8 rounded-full" />
					</motion.div>

					
				</div>

				{/* mobile background */}
				<div className="absolute inset-0 lg:hidden">
					<Image src={HomeImages.image5} alt="" fill className="object-cover opacity-20" />
				</div>
			</section>

			{/* ── 2. STORY ── */}
			<section className="bg-white py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-4">
					<div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
						{/* Left text */}
						<motion.div
							initial={{ opacity: 0, x: -40 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<span className="bg-stem-blue/10 text-stem-blue mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
								Câu chuyện của chúng tôi
							</span>
							<h2 className="mb-5 text-3xl font-bold text-slate-900 lg:text-4xl">
								Khơi nguồn đam mê — <br className="hidden lg:block" />
								Định hình tương lai
							</h2>
							<p className="mb-8 text-base leading-relaxed text-slate-600">
								STEMKey ra đời từ niềm tin rằng mỗi đứa trẻ đều mang trong mình tiềm năng vô hạn. Chúng tôi
								xây dựng một môi trường học tập nơi sự sáng tạo được nuôi dưỡng, tư duy được rèn luyện và
								ngôn ngữ trở thành cầu nối với thế giới.
							</p>

							<div className="space-y-4">
								{ABOUT_FEATURES.map((f, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.1 }}
										className="flex items-start gap-3"
									>
										<div className="bg-stem-blue mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
											<CheckCircle size={12} className="text-white" />
										</div>
										<span className="text-sm leading-relaxed text-slate-700">{f}</span>
									</motion.div>
								))}
							</div>

							<Link
								href="/khoa-hoc/dang-ky"
								className="bg-stem-blue mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-95"
							>
								Đăng ký học thử miễn phí
								<ArrowRight size={16} />
							</Link>
						</motion.div>

						{/* Right image collage */}
						<motion.div
							initial={{ opacity: 0, x: 40 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="grid grid-cols-2 gap-4"
						>
							<div className="relative h-64 overflow-hidden rounded-2xl lg:h-80">
								<Image
									src={HomeImages.image5}
									alt="Học sinh STEMKey"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative mt-8 h-64 overflow-hidden rounded-2xl lg:h-80">
								<Image
									src={HomeImages.image6}
									alt="Lớp học STEMKey"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative h-48 overflow-hidden rounded-2xl lg:h-60">
								<Image
									src={HomeImages.image1}
									alt="Robotics STEMKey"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative h-48 overflow-hidden rounded-2xl lg:h-60">
								<Image
									src={HomeImages.image3}
									alt="Tiếng Anh STEMKey"
									fill
									className="object-cover"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ── 3. STATS ── */}
			<section className="bg-slate-950 py-16">
				<div className="mx-auto max-w-7xl px-4">
					<motion.p
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-10 text-center text-2xl font-bold text-white lg:text-3xl"
					>
						Con số nói lên tất cả
					</motion.p>
					<div className="grid grid-cols-2 divide-x divide-y divide-white/5 border border-white/5 md:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
						{ABOUT_STATS.map((stat, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.07 }}
								className="flex flex-col items-center px-6 py-8 text-center"
							>
								<div className="text-stem-blue mb-1 text-4xl font-black lg:text-5xl">{stat.value}</div>
								<div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── 4. MISSION & VISION ── */}
			<section className="bg-white py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-3 text-3xl font-bold text-slate-900 lg:text-4xl">Sứ mệnh & Tầm nhìn</h2>
						<p className="mx-auto max-w-xl text-sm text-slate-500 lg:text-base">
							Kim chỉ nam định hướng mọi hoạt động và quyết định của STEMKey.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{MISSION_VISION.map((item, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.15 }}
								className={`relative overflow-hidden rounded-2xl p-8 lg:p-10 ${
									i === 0
										? "bg-stem-blue text-white"
										: "border border-slate-100 bg-slate-50 text-slate-900"
								}`}
							>
								{/* decorative circle */}
								<div
									className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10 ${
										i === 0 ? "bg-white" : "bg-stem-blue"
									}`}
								/>
								<div
									className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
										i === 0 ? "bg-white/20" : "bg-stem-blue/10"
									}`}
								>
									{i === 0 ? (
										<Target size={28} className="text-white" />
									) : (
										<Eye size={28} className="text-stem-blue" />
									)}
								</div>
								<h3
									className={`mb-4 text-2xl font-bold ${
										i === 0 ? "text-white" : "text-slate-900"
									}`}
								>
									{item.title}
								</h3>
								<p
									className={`text-base leading-relaxed ${
										i === 0 ? "text-white/85" : "text-slate-600"
									}`}
								>
									{item.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── 5. PROGRAMS ── */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-3 text-3xl font-bold text-slate-900 lg:text-4xl">
							3 chương trình học cốt lõi
						</h2>
						<p className="mx-auto max-w-xl text-sm text-slate-500 lg:text-base">
							Hệ thống giáo dục phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{PROGRAMS_DATA.map((p, i) => (
							<Link key={p.slug} href={`/chuong-trinh/${p.slug}`}>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									whileHover={{ y: -8 }}
									className="group relative flex min-h-56 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-6 text-white lg:p-8"
									style={GRADIENTS[i % GRADIENTS.length]}
								>
									<div className="relative z-10 w-3/5">
										<h3 className="mb-3 text-2xl font-bold lg:text-3xl">{p.title}</h3>
										<p className="mb-8 text-sm font-medium leading-relaxed opacity-90">{p.desc}</p>
										<div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-2 text-xs font-bold backdrop-blur-md transition-all hover:bg-white/30">
											Xem chi tiết <ArrowRight size={13} />
										</div>
									</div>
									<div className="pointer-events-none absolute right-0 bottom-0 flex h-full w-1/2 items-end justify-end overflow-hidden">
										<Image
											src={p.img}
											alt={p.title}
											width={220}
											height={200}
											className="h-full w-full transform object-contain object-bottom-right transition-transform duration-500 group-hover:scale-110"
										/>
									</div>
								</motion.div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ── 6. EXCLUSIVE MODEL ── */}
			<section className="bg-white py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-3 text-3xl font-bold text-slate-900 lg:text-4xl">
							Mô hình lớp học độc quyền
						</h2>
						<p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-500 lg:text-base">
							Lớp học đảo ngược thúc đẩy khả năng tự học, tính chủ động và tích cực trong học tập ở học
							trò — các con không phụ thuộc, chờ thầy cô đưa kiến thức.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{EXCLUSIVE_MODEL_ITEMS.map((item, i) => {
							const Icon = ICON_MAP[item.icon];
							return (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className="flex flex-col items-center rounded-2xl border border-slate-100 bg-[#EFEFEF] p-8 text-center"
								>
									<div className="mb-2 text-xs font-black tracking-widest text-slate-400 uppercase">
										{item.step}
									</div>
									<div
										className={`my-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
									>
										{Icon && <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />}
									</div>
									<h3 className="mb-3 text-lg font-bold text-slate-900">{item.title}</h3>
									<p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ── 7. CORE VALUES ── */}
			<section className="bg-slate-900 py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-3 text-3xl font-bold text-white lg:text-4xl">Giá trị cốt lõi</h2>
						<p className="mx-auto max-w-xl text-sm text-slate-400 lg:text-base">
							Những giá trị định hình văn hóa và phương pháp giảng dạy tại STEMKey.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						{CORE_VALUES.map((value, idx) => {
							const Icon = VALUE_ICONS[idx];
							return (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: idx * 0.1 }}
									className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
								>
									<div className="bg-stem-blue mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
										<Icon size={24} className="text-white" />
									</div>
									<h4 className="mb-3 text-lg font-bold text-white">{value.title}</h4>
									<p className="text-sm leading-relaxed text-slate-400">{value.desc}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ── 8. TEACHERS ── */}
			<Teachers />

			{/* ── 9. CTA ── */}
			<section className="relative overflow-hidden bg-[#00BA3D] py-20 text-white">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
					<div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-emerald-800/30 blur-3xl" />
				</div>
				<div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-5 text-3xl font-black tracking-tight lg:text-5xl"
					>
						Sẵn sàng đồng hành cùng con?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="mb-10 text-base font-medium opacity-90 lg:text-lg"
					>
						Hãy để STEMKey đồng hành cùng con trên hành trình chinh phục tri thức và công nghệ. Đăng ký học
						thử miễn phí ngay hôm nay.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="flex flex-wrap justify-center gap-4"
					>
						<Link
							href="/khoa-hoc/dang-ky"
							className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#00BA3D] transition-all hover:bg-slate-50 active:scale-95"
						>
							Đăng ký học thử miễn phí
						</Link>
						<a
							href="https://zalo.me/0325610016"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full border-2 border-white/40 bg-white/15 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/25 active:scale-95"
						>
							Tư vấn lộ trình học
						</a>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
