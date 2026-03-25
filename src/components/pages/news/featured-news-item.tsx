"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, ArrowUpRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedNewsItemProps {
	id: string;
	title: string;
	category?: string;
	date: string;
	desc: string;
	img: string;
}

const FeaturedNewsItem: React.FC<FeaturedNewsItemProps> = ({ id, title, category, date, desc, img }) => (
	<Link href={`/tin-tuc/${id}`} className="block">
		<motion.article
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60"
		>
			<div className="flex flex-col lg:h-[260px] lg:flex-row">
				{/* Image */}
				<div className="relative h-56 w-full shrink-0 overflow-hidden lg:h-full lg:w-2/5">
					<Image
						src={img || "https://images.unsplash.com/photo-1543269865-cbf427effbad"}
						alt={title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-105"
						priority
						referrerPolicy="no-referrer"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
					<div className="absolute top-3 left-3">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-stem-blue px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase shadow">
							Nổi bật
						</span>
					</div>
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
					<div className="mb-3 flex flex-wrap items-center gap-2">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
							<Tag size={10} className="text-stem-blue" />
							{category || "Tin tức"}
						</span>
						<span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
							<Calendar size={11} className="text-stem-blue/70" />
							{new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })}
						</span>
					</div>

					<h2 className="group-hover:text-stem-blue mb-3 line-clamp-2 text-lg leading-snug font-black text-slate-900 transition-colors lg:text-xl">
						{title}
					</h2>

					<p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-500">{desc}</p>

					<div className="mt-auto">
						<span className="bg-stem-blue group-hover:bg-stem-blue/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-black text-white transition-all duration-300">
							Đọc bài viết
							<ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</span>
					</div>
				</div>
			</div>
		</motion.article>
	</Link>
);

export default React.memo(FeaturedNewsItem);
