"use client";

import { motion } from "motion/react";
import React from "react";
import { TESTIMONIALS_DATA } from "@/constants";
import Image from "next/image";

const Testimonials = () => {
	return (
		<section className="bg-white pt-24">
			<div className="mx-auto max-w-7xl px-4">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-12 text-3xl font-bold text-slate-900 lg:mb-16 lg:text-4xl"
				>
					Cảm nhận của học viên và phụ huynh
				</motion.h2>

				{/* Featured Award */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="group relative mb-12 aspect-21/9 overflow-hidden rounded-xl shadow-2xl"
				>
					<Image
						src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200"
						alt="Vinh danh học viên đạt giải thưởng JU AWARDS 2025"
						width={1200}
						height={514}
						sizes="100vw"
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						referrerPolicy="no-referrer"
					/>
					<div className="absolute inset-0 flex items-end bg-linear-to-t from-black/90 via-black/20 to-transparent p-8 lg:p-12">
						<p className="max-w-4xl text-base leading-relaxed font-medium text-white lg:text-xl">
							Bảng Vàng JU AWARDS 2025: Vinh Danh Dàn “Cao Thủ” Cambridge Nhà Ju Tân Bình – TP. Hồ Chí
							Minh -
						</p>
					</div>
				</motion.div>

				{/* Award Grid */}
				<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
					{TESTIMONIALS_DATA.map((award, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="group flex flex-col gap-6"
						>
							<div className="relative aspect-4/3 overflow-hidden rounded-xl text-center shadow-xl">
								<Image
									src={award.img}
									alt={`Giải thưởng: ${award.title}`}
									width={800}
									height={600}
									sizes="(max-width: 768px) 100vw, 33vw"
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									referrerPolicy="no-referrer"
								/>
								<div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
							</div>
							<p className="text-base leading-relaxed font-semibold text-slate-700 lg:text-lg">
								{award.title}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default React.memo(Testimonials);
