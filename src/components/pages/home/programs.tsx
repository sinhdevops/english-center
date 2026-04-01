"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { PROGRAMS_DATA } from "@/constants";

const GRADIENTS = [
	{ background: "linear-gradient(286.12deg, #FFCA74 9.13%, #C80057 86.64%)" },
	{ background: "linear-gradient(284.83deg, #FFF357 16%, #00771E 96.5%)" },
	{ background: "linear-gradient(106.99deg, #211BCF 12.88%, #FF60B2 92.58%)" },
	{ background: "linear-gradient(284.83deg, #7CC9FF 16%, #003777 96.5%)" },
];

const Programs = () => {
	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4 lg:px-0">
				<div className="mb-6 text-center">
					<h2 className="text-2xl font-semibold lg:text-4xl">
						CÁC CHƯƠNG TRÌNH HỌC TẠI STEMKey
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{PROGRAMS_DATA.map((p, i) => (
						<Link key={p.title} href={`/chuong-trinh/${p.slug}`}>
							<motion.div
								whileHover={{ y: -10 }}
								className="group relative flex min-h-55 cursor-pointer flex-col justify-between overflow-hidden rounded-xl p-4 text-white lg:p-6"
								style={GRADIENTS[i % GRADIENTS.length]}
							>
								<div className="relative z-10 w-1/2">
									<h3 className="mb-4 text-2xl font-bold lg:text-3xl">{p.title}</h3>
									<p className="mb-10 line-clamp-3 text-sm leading-relaxed font-medium opacity-90 lg:text-[15px]">
										{p.desc}
									</p>
									<div
										aria-label={`Xem chi tiết chương trình ${p.title}`}
										className="inline-block rounded-full border border-white/40 bg-white/20 px-8 py-2.5 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/30 active:scale-95"
									>
										Xem chi tiết
									</div>
								</div>

								<div className="pointer-events-none absolute right-0 bottom-0 flex h-full w-[60%] items-end justify-end overflow-hidden">
									<Image
										src={p.img || "https://picsum.photos/seed/program/400/300"}
										alt={p.title}
										width={234}
										height={220}
										sizes="(max-width: 768px) 100vw, 33vw"
										className="h-full w-full transform object-contain object-bottom-right transition-transform duration-500 group-hover:scale-110"
										referrerPolicy="no-referrer"
									/>
								</div>
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default React.memo(Programs);
