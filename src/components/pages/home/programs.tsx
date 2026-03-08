"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { PROGRAMS_DATA } from "@/constants";

const Programs = () => {
	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-10 text-center ">
					<h2 className="text-2xl font-bold text-slate-900 sm:text-4xl lg:text-4xl">
						Các chương trình học tại STEMKey
					</h2>
					<p className="mx-auto max-w-3xl text-base font-medium text-slate-500 lg:text-lg">
						Hệ thống giáo dục dành cho trẻ 4-10 tuổi, phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{PROGRAMS_DATA.map((p: any, i: number) => (
						<motion.div
							key={i}
							whileHover={{ y: -10 }}
							className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-xl p-6 text-white shadow-2xl"
							style={p.style}
						>
							<div className="relative z-10 w-full sm:w-1/2">
								<h3 className="mb-4 text-2xl font-bold lg:text-3xl">{p.title}</h3>
								<p className="mb-10 text-sm leading-relaxed font-medium opacity-90 lg:text-base">
									{p.desc}
								</p>
								<button
									aria-label={`Xem chi tiết chương trình ${p.title}`}
									className="rounded-full border border-white/40 bg-white/20 px-8 py-2.5 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/30 active:scale-95"
								>
									Xem chi tiết
								</button>
							</div>

							<div className="pointer-events-none absolute right-0 bottom-0 flex h-full w-[60%] items-end justify-end overflow-hidden">
								<Image
									src={p.img}
									alt={p.title}
									width={234}
									height={220}
									sizes="(max-width: 768px) 100vw, 33vw"
									className="h-full w-full transform object-contain object-bottom-right transition-transform duration-500 group-hover:scale-110"
									referrerPolicy="no-referrer"
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default React.memo(Programs);
