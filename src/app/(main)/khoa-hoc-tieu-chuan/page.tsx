"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ChevronRight,
	CheckCircle2,
	ArrowRight,
	Target,
	Zap,
	Sparkles,
	BookOpen,
	Award,
	PlayCircle,
	Quote,
} from "lucide-react";
import { STANDARD_COURSES_HERO, STANDARD_BENEFITS, STANDARD_ROADMAP, RIPL_METHODOLOGY } from "@/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const IconMap: Record<string, any> = {
	Target,
	Award,
	Zap,
	BookOpen,
	Sparkles,
};

export default function StandardCoursesPage() {
	return (
		<div className="flex flex-col overflow-x-hidden text-center font-sans">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-32">
				<div className="absolute top-0 right-0 h-full w-1/2 bg-blue-600/20 blur-[120px]" />
				<div className="absolute bottom-0 left-0 h-1/2 w-full bg-emerald-500/10 blur-[100px]" />

				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<Breadcrumb items={[{ label: "Khóa học tiêu chuẩn", active: true }]} variant="light" />

					<div className="mt-12 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div className="md:text-left">
							<h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
								{STANDARD_COURSES_HERO.title.split("").slice(0, 2).join("")} <br />
								<span className="text-emerald-400 underline decoration-white/10 underline-offset-8">
									{STANDARD_COURSES_HERO.title.split("").slice(2).join("")}
								</span>
							</h1>
							<p className="mt-8 text-xl leading-relaxed text-zinc-400 md:text-2xl">
								{STANDARD_COURSES_HERO.subtitle}
							</p>
							<div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
								<Link
									href="#roadmap"
									className="bg-stem-blue hover:bg-stem-blue/90 flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-all active:scale-95"
								>
									Khám phá lộ trình <ArrowRight className="h-5 w-5" />
								</Link>
								<Link
									href="#benefits"
									className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10"
								>
									Lợi ích khóa học
								</Link>
							</div>
						</div>
						<div className="relative">
							<div className="relative aspect-video overflow-hidden rounded-4xl border border-white/10">
								<Image
									src={STANDARD_COURSES_HERO.img}
									alt="Standard Course"
									fill
									className="object-cover"
									priority
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
									<div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md transition-all hover:bg-white/30">
										<PlayCircle className="h-10 w-10 text-white" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 5 Benefits Section */}
			<section id="benefits" className="relative overflow-hidden bg-white py-24 lg:py-32">
				<div className="absolute top-0 left-0 h-full w-full skew-y-3 bg-blue-500/5" />
				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<div className="mb-20 text-center">
						<h2 className="mb-4 text-sm font-bold tracking-[0.4em] text-emerald-500 uppercase">
							Đặc quyền học viên
						</h2>
						<h3 className="font-heading text-4xl font-extrabold text-slate-900 md:text-5xl lg:text-6xl">
							5 Lợi ích <span className="text-stem-blue italic">Vượt trội</span>
						</h3>
						<div className="mx-auto mt-6 h-1 w-20 rounded-full bg-emerald-400" />
						<p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600">
							Ms Hoa Junior cam kết mang lại môi trường giáo dục tiêu chuẩn, giúp học sinh tiểu học bứt
							phá mạnh mẽ về cả tư duy lẫn kỹ năng.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
						{STANDARD_BENEFITS.map((benefit, idx) => {
							const Icon = IconMap[benefit.icon];
							return (
								<div
									key={idx}
									className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-50 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover: ${benefit.span}`}
								>
									<div className="relative z-10 text-left">
										<div
											className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110 ${benefit.theme === "primary" ? "text-stem-blue border-blue-100 bg-blue-50" : "border-emerald-100 bg-emerald-50 text-emerald-500"}`}
										>
											{Icon && <Icon className="h-8 w-8" />}
										</div>
										<h4 className="font-heading mb-4 text-2xl font-bold tracking-tight text-slate-900">
											{benefit.title}
										</h4>
										<p className="leading-relaxed text-zinc-500">{benefit.desc}</p>
									</div>
									<div
										className={`absolute -right-4 -bottom-4 h-16 w-16 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-10 ${benefit.theme === "primary" ? "bg-stem-blue" : "bg-emerald-400"}`}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Roadmap Section */}
			<section id="roadmap" className="relative  py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="mb-20 text-center md:text-left">
						<h2 className="mb-4 text-sm font-bold tracking-[0.3em] text-emerald-500 uppercase">
							Lộ trình đào tạo
						</h2>
						<h3 className="font-heading text-3xl font-extrabold text-slate-900 md:text-5xl">
							3 Chặng chinh phục đỉnh cao
						</h3>
					</div>

					<div className="space-y-12">
						{STANDARD_ROADMAP.map((step, idx) => (
							<div
								key={idx}
								className="group relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white transition-all duration-500"
							>
								<div className="grid grid-cols-1 md:grid-cols-12">
									<div className="relative h-64 md:col-span-4 md:h-auto">
										<Image
											src={step.img}
											alt={step.title}
											fill
											className="object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="bg-stem-blue font-heading absolute top-8 left-8 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold text-white">
											0{idx + 1}
										</div>
									</div>
									<div className="p-8 text-left md:col-span-8 md:p-16">
										<span className="mb-4 block font-bold tracking-widest text-emerald-500 uppercase">
											{step.stage}
										</span>
										<h4 className="font-heading mb-6 text-3xl font-extrabold text-slate-900 md:text-4xl">
											{step.title}
										</h4>
										<p className="mb-8 text-lg leading-relaxed text-zinc-500">{step.desc}</p>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											{step.details.map((detail, dIdx) => (
												<div
													key={dIdx}
													className="flex items-center gap-3 text-sm font-medium text-zinc-600"
												>
													<div className="text-stem-blue flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50">
														<CheckCircle2 className="h-4 w-4" />
													</div>
													{detail}
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* RIPL Methodology */}
			<section className="bg-white py-24 lg:py-40">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div className="text-left">
							<h2 className="mb-4 text-sm font-bold tracking-[0.3em] text-emerald-500 uppercase">
								Bí quyết đào tạo
							</h2>
							<h3 className="font-heading mb-8 text-4xl font-extrabold text-slate-900 md:text-5xl">
								Phương pháp <span className="text-stem-blue italic">R.I.P.L</span>
							</h3>
							<p className="mb-12 text-lg leading-relaxed text-zinc-500">
								Độc quyền tại Ms Hoa Junior, giúp học viên chinh phục tiếng Anh qua những giờ học tràn
								đầy cảm hứng và kiến thức chắt lọc theo logic khoa học.
							</p>

							<div className="space-y-8">
								{RIPL_METHODOLOGY.map((item, idx) => (
									<div key={idx} className="group flex gap-6">
										<div className="group-hover:bg-stem-blue flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-extrabold text-white transition-colors">
											{item.l}
										</div>
										<div>
											<h5 className="font-heading mb-1 text-xl font-bold text-slate-900">
												{item.t}
											</h5>
											<p className="text-sm text-zinc-500">{item.d}</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="relative">
							<div className="relative z-10 aspect-square overflow-hidden rounded-[4rem]">
								<Image
									src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
									alt="Students"
									fill
									className="object-cover"
								/>
							</div>
							<div className="absolute -right-10 -bottom-10 -z-10 h-1/2 w-1/2 rounded-[4rem] bg-emerald-400" />
							<div className="absolute -top-10 -left-10 -z-10 h-1/2 w-1/2 rounded-full bg-blue-500/10" />
							<div className="absolute top-1/2 -right-12 z-20 hidden md:block">
								<div className=" rounded-2xl border border-slate-100 bg-white p-6">
									<Quote className="mb-2 h-8 w-8 text-emerald-400" />
									<p className="max-w-[200px] text-sm font-medium text-zinc-600 italic">
										&ldquo;Phương pháp này giúp bé nhà mình tự tin nói tiếng Anh chỉ sau 3
										tháng.&rdquo;
									</p>
									<p className="mt-4 text-xs font-bold text-slate-900">Phụ huynh bé Tú Anh</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
				<div className="absolute top-0 left-0 h-full w-full bg-emerald-400/10 blur-[150px]" />
				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div className="text-left">
							<h3 className="font-heading mb-6 text-3xl font-extrabold md:text-5xl lg:text-7xl">
								Đăng ký <br />
								<span className="text-emerald-400 italic underline decoration-white/10 underline-offset-8">
									Nhận tư vấn
								</span>{""}
								ngay
							</h3>
							<p className="mb-10 text-xl leading-relaxed text-zinc-400">
								Tham gia cùng hơn 200,000 học viên đã thành công cán đích.{""}
								<br className="hidden md:block" />
								Hãy để chúng tôi đồng hành cùng con bạn.
							</p>
							<div className="flex items-center gap-6">
								<div className="flex -space-x-3">
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="h-12 w-12 overflow-hidden rounded-full border-2 border-slate-900 bg-zinc-800"
										>
											<Image
												src={`https://i.pravatar.cc/150?u=${i}`}
												alt="user"
												width={48}
												height={48}
											/>
										</div>
									))}
								</div>
								<p className="text-sm font-medium text-zinc-400">
									<span className="font-bold text-white">100K+</span> người đăng ký tuần này
								</p>
							</div>
						</div>
						<div className="rounded-[3rem] border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl md:p-12">
							<form className="space-y-6">
								<div className="space-y-2">
									<label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
										Họ tên phụ huynh
									</label>
									<input
										type="text"
										placeholder="Nguyễn Văn A"
										className="w-full rounded-2xl border border-white/5 bg-white/10 px-6 py-5 text-white ring-emerald-400 transition-all outline-none focus:ring-2"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
										Số điện thoại
									</label>
									<input
										type="tel"
										placeholder="0912 xxx xxx"
										className="w-full rounded-2xl border border-white/5 bg-white/10 px-6 py-5 text-white ring-emerald-400 transition-all outline-none focus:ring-2"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
										Nhu cầu tư vấn
									</label>
									<div className="relative">
										<select className="w-full cursor-pointer appearance-none rounded-2xl border border-white/5 bg-white/10 px-6 py-5 text-white ring-emerald-400 transition-all outline-none focus:ring-2">
											<option className="bg-slate-900">Hệ đào tạo tiêu chuẩn</option>
											<option className="bg-slate-900">Hệ chuyên & cận chuyên</option>
											<option className="bg-slate-900">Lớp học 1-1</option>
										</select>
										<ChevronRight className="pointer-events-none absolute top-1/2 right-6 h-5 w-5 -translate-y-1/2 rotate-90 text-zinc-400" />
									</div>
								</div>
								<button
									type="button"
									className="mt-4 w-full rounded-2xl bg-emerald-400 py-6 text-lg font-extrabold text-slate-900 transition-all hover:bg-emerald-300 active:scale-95"
								>
									Gửi yêu cầu đăng ký
								</button>
								<p className="text-center text-[10px] font-medium text-zinc-500 italic">
									* Vui lòng để ý điện thoại, chúng tôi sẽ liên hệ trong vòng 24h.
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
