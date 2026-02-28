"use client";

import React from "react";
import { motion } from "motion/react";
import { Target, Eye, Shield, Zap, Users, Award, Rocket, Heart, Globe, BookOpen } from "lucide-react";

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string; dark?: boolean }> = ({
	children,
	subtitle,
	dark,
}) => (
	<div className="mb-16 text-center">
		<motion.h2
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className={`mb-4 text-3xl font-extrabold tracking-tight uppercase lg:text-5xl ${dark ? "text-white" : "text-slate-900"}`}
		>
			{children}
		</motion.h2>
		{subtitle && (
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.1 }}
				className={`mx-auto max-w-2xl text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}
			>
				{subtitle}
			</motion.p>
		)}
		<div className={`mx-auto mt-6 h-1.5 w-20 rounded-full ${dark ? "bg-white" : "bg-stem-blue"}`} />
	</div>
);

export default function AboutPage() {
	return (
		<div className="overflow-hidden bg-white">
			{/* Hero Section */}
			<section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<img
						src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920"
						alt="STEM Education"
						className="h-full w-full object-cover brightness-50"
						referrerPolicy="no-referrer"
					/>
				</div>
				<div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-stem-blue mb-6 inline-block rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase"
					>
						Chào mừng đến với STEMKey
					</motion.span>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="mb-8 text-5xl leading-tight font-bold tracking-tighter lg:text-8xl"
					>
						KHƠI NGUỒN <br />{" "}
						<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
							SÁNG TẠO
						</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="mx-auto max-w-3xl text-xl leading-relaxed font-medium opacity-90 lg:text-2xl"
					>
						Hệ thống giáo dục STEM hàng đầu, trang bị kỹ năng thế kỷ 21 cho thế hệ tương lai của Việt Nam.
					</motion.p>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="mx-auto max-w-7xl px-4 py-24 lg:py-32">
				<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="space-y-12"
					>
						<div className="flex gap-6">
							<div className="text-stem-blue flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
								<Target size={32} />
							</div>
							<div>
								<h3 className="mb-4 text-2xl font-semibold text-slate-900">Sứ mệnh</h3>
								<p className="text-lg leading-relaxed text-slate-600">
									STEMKey cam kết mang đến môi trường giáo dục sáng tạo, nơi trẻ em được tự do khám
									phá, trải nghiệm và phát triển tư duy logic, kỹ năng giải quyết vấn đề thông qua
									Robotics, Toán tư duy và Tiếng Anh.
								</p>
							</div>
						</div>
						<div className="flex gap-6">
							<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
								<Eye size={32} />
							</div>
							<div>
								<h3 className="mb-4 text-2xl font-semibold text-slate-900 uppercase">Tầm nhìn</h3>
								<p className="text-lg leading-relaxed text-slate-600">
									Trở thành hệ thống giáo dục STEM tiêu chuẩn quốc tế hàng đầu tại Việt Nam, góp phần
									đào tạo nên những thế hệ công dân toàn cầu bản lĩnh, sáng tạo và làm chủ công nghệ.
								</p>
							</div>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="relative"
					>
						<div className="aspect-square overflow-hidden rounded-3xl shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
								alt="Vision"
								className="h-full w-full object-cover"
								referrerPolicy="no-referrer"
							/>
						</div>
						<div className="absolute -bottom-8 -left-8 hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl lg:block">
							<div className="text-stem-blue mb-1 text-4xl font-semibold">10+</div>
							<div className="text-sm font-bold tracking-wider text-slate-500 uppercase">
								Cơ sở đào tạo
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Core Values */}
			<section className="bg-slate-900 py-24 text-white lg:py-32">
				<div className="mx-auto max-w-7xl px-4">
					<SectionTitle
						dark
						subtitle="Những giá trị cốt lõi định hình nên văn hóa và phương pháp giảng dạy tại STEMKey."
					>
						Giá trị cốt lõi
					</SectionTitle>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						{[
							{
								icon: Zap,
								title: "Sáng tạo",
								desc: "Khuyến khích mọi ý tưởng mới và sự khác biệt trong tư duy của trẻ.",
							},
							{
								icon: Shield,
								title: "Chất lượng",
								desc: "Cam kết chuẩn đầu ra quốc tế và trang thiết bị hiện đại nhất.",
							},
							{
								icon: Users,
								title: "Tận tâm",
								desc: "Mỗi học viên là một cá thể duy nhất cần được thấu hiểu và đồng hành.",
							},
							{
								icon: Rocket,
								title: "Tiên phong",
								desc: "Luôn cập nhật những xu hướng giáo dục STEM mới nhất trên thế giới.",
							},
						].map((value, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10"
							>
								<div className="bg-stem-blue mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
									<value.icon size={28} />
								</div>
								<h4 className="mb-4 text-xl font-bold">{value.title}</h4>
								<p className="leading-relaxed text-slate-400">{value.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="mx-auto max-w-7xl px-4 py-24 lg:py-32">
				<SectionTitle subtitle="Đội ngũ chuyên gia và giáo viên tâm huyết, giàu kinh nghiệm trong lĩnh vực giáo dục STEM.">
					Đội ngũ lãnh đạo
				</SectionTitle>
				<div className="grid grid-cols-1 gap-12 md:grid-cols-3">
					{[
						{
							name: "Nguyễn Văn A",
							role: "Founder & CEO",
							img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
						},
						{
							name: "Trần Thị B",
							role: "Giám đốc Đào tạo",
							img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
						},
						{
							name: "Lê Văn C",
							role: "Cố vấn Công nghệ",
							img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
						},
					].map((member, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className="group text-center"
						>
							<div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
								<img
									src={member.img}
									alt={member.name}
									className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
									referrerPolicy="no-referrer"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
							</div>
							<h4 className="mb-1 text-2xl font-semibold text-slate-900">{member.name}</h4>
							<p className="text-stem-blue text-xs font-bold tracking-widest uppercase">{member.role}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* Stats Section */}
			<section className="bg-slate-50 py-24">
				<div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-4 lg:grid-cols-4">
					{[
						{ label: "Học viên", value: "5,000+", icon: Users },
						{ label: "Cơ sở", value: "12", icon: Globe },
						{ label: "Giải thưởng", value: "25+", icon: Award },
						{ label: "Khóa học", value: "30+", icon: BookOpen },
					].map((stat, idx) => (
						<div key={idx} className="text-center">
							<div className="text-stem-blue mb-4 flex justify-center opacity-20">
								<stat.icon size={48} />
							</div>
							<div className="mb-2 text-4xl font-semibold text-slate-900 lg:text-5xl">{stat.value}</div>
							<div className="text-sm font-bold tracking-widest text-slate-500 uppercase">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-stem-blue relative overflow-hidden py-24 text-center text-white lg:py-32">
				<div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-10">
					<div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl" />
					<div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-emerald-400 blur-3xl" />
				</div>
				<div className="relative z-10 mx-auto max-w-4xl px-4">
					<h2 className="mb-8 text-4xl leading-tight lg:text-6xl">
						SẴN SÀNG CHO HÀNH TRÌNH <br /> KHÁM PHÁ CÙNG STEMKEY?
					</h2>
					<p className="mb-12 text-xl opacity-90">
						Hãy để chúng tôi đồng hành cùng con bạn trên con đường chinh phục tri thức và công nghệ.
					</p>
					<div className="flex flex-wrap justify-center gap-6">
						<button className="text-stem-blue rounded-full bg-white px-10 py-4 font-semibold tracking-wider uppercase shadow-xl transition-all hover:bg-slate-50">
							Đăng ký ngay
						</button>
						<button className="rounded-full border-2 border-white px-10 py-4 font-semibold tracking-wider text-white uppercase transition-all hover:bg-white/10">
							Liên hệ tư vấn
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
