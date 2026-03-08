"use client";

import { motion } from "motion/react";
import React from "react";
import { ABOUT_STATS, ABOUT_FEATURES } from "@/constants";
import Image from "next/image";
import { HomeImages } from "../../../../public/statics/images";

const AboutSection = () => {
	return (
		<section className="overflow-hidden bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex flex-col items-center gap-16 lg:flex-row">
					{/* Left Content */}
					<div className="w-full lg:w-1/2">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="mb-10 text-3xl font-bold lg:text-4xl"
						>
							Giới thiệu về STEMKey
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="mb-3 text-lg leading-relaxed text-slate-600"
						>
							STEMKey Việt Nam. Với sứ mệnh giúp hàng triệu trẻ em Việt Nam yêu tiếng Anh, robotics, toán
							tư duy giúp các em chinh phục từ nhỏ.
						</motion.p>

						<motion.ul
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="mb-6 space-y-2"
						>
							{ABOUT_FEATURES.map((item, i) => (
								<li key={i} className="flex items-center gap-3 font-medium text-slate-700">
									<div className="h-1.5 w-1.5 rounded-xl bg-slate-900" />
									{item}
								</li>
							))}
						</motion.ul>

						{/* Stats Grid */}
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
							{ABOUT_STATS.map((stat, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 + i * 0.05 }}
									className="rounded-xl border border-slate-100 bg-slate-50 p-6 transition-colors hover:border-slate-200"
								>
									<div className="mb-2 text-2xl font-medium text-slate-900">
										{stat.value}
									</div>
									<div className="text-sm leading-tight font-medium text-slate-500">{stat.label}</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Right Image */}
					<div className="relative w-full lg:w-1/2">
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							className="relative overflow-hidden rounded-xl shadow-2xl"
						>
							<Image
								src={HomeImages.image1}
								alt="Lớp học STEMKey với không gian sáng tạo và hiện đại"
								width={1000}
								height={750}
								sizes="(max-width: 768px) 100vw, 50vw"
								className="aspect-4/3 h-auto w-full object-cover lg:aspect-auto"
								referrerPolicy="no-referrer"
							/>
							{/* Overlay for branding feel */}
							<div className="absolute inset-0 bg-linear-to-tr from-slate-900/10 to-transparent" />
						</motion.div>

						{/* Decorative element */}
						<div className="bg-stem-blue/10 absolute -right-6 -bottom-6 -z-10 h-32 w-32 rounded-full blur-3xl" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(AboutSection);
