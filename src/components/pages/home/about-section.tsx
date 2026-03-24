"use client";

import { motion } from "motion/react";
import React from "react";
import { ABOUT_STATS, ABOUT_FEATURES } from "@/constants";
import Image from "next/image";
import { IMAGES } from "../../../../public/statics/images";

const ABOUT_IMAGES = [
	{ src: IMAGES.flex1, alt: "Học viên STEMKey trong lớp học" },
	{ src: IMAGES.flex2, alt: "Hoạt động ngoại khóa STEMKey" },
	{ src: IMAGES.flex3, alt: "Học sinh học robotics tại STEMKey" },
	{ src: IMAGES.flex4, alt: "Học sinh học tiếng Anh tại STEMKey" },
];

const AboutSection = () => {
	return (
		<section className="overflow-hidden bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex flex-col items-end gap-16 lg:flex-row">
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
							className="mb-3 leading-relaxed text-slate-600"
						>
							STEMKey Việt Nam. Với sứ mệnh giúp hàng triệu trẻ em Việt Nam yêu tiếng Anh, robotics, toán
							tư duy giúp các em chinh phục từ nhỏ.
						</motion.p>

						<motion.ul
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="mb-6 space-y-2 pl-5"
						>
							{ABOUT_FEATURES.map((item, i) => (
								<li key={i} className="list-disc text-slate-600">
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
									<div className="mb-2 text-2xl font-medium text-slate-900">{stat.value}</div>
									<div className="text-sm leading-tight font-medium text-slate-500">{stat.label}</div>
								</motion.div>
							))}
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="flex w-full gap-3 lg:w-1/2"
					>
						<div className="flex flex-1 flex-col gap-3 mt-10">
							{[ABOUT_IMAGES[1], ABOUT_IMAGES[3]].map((img, i) => (
								<div key={i} className="relative aspect-285/201 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-[#0A7DFF]/60">
									<Image src={img.src} alt={img.alt} fill sizes="25vw" className="object-cover transition-transform duration-500 hover:scale-105" />
								</div>
							))}
						</div>

						<div className="flex flex-1 flex-col gap-3">
							{[ABOUT_IMAGES[0], ABOUT_IMAGES[2]].map((img, i) => (
								<div key={i} className="relative aspect-285/201 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-[#0A7DFF]/60">
									<Image src={img.src} alt={img.alt} fill sizes="25vw" className="object-cover transition-transform duration-500 hover:scale-105" />
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(AboutSection);
