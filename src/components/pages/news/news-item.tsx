"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, ChevronRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsItemProps {
	id: string;
	title: string;
	category?: string;
	date: string;
	desc: string;
	img: string;
	onClick?: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ id, title, category, date, desc, img, onClick }) => (
	<Link href={`/tin-tuc/${id}`} className="block">
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			onClick={onClick}
			className="group hover:border-stem-blue/10 relative flex cursor-pointer flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-5 transition-all duration-500 hover:bg-slate-50/30 hover:shadow-xl hover:shadow-slate-200/40 md:flex-row"
		>
			{/* Image Container */}
			<div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl md:h-48 md:w-72 lg:w-80">
				<Image
					src={img || "https://images.unsplash.com/photo-1543269865-cbf427effbad"}
					alt={title}
					width={400}
					height={300}
					className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
					referrerPolicy="no-referrer"
				/>
				{/* Darker overlay on image hover */}
				<div className="absolute inset-0 bg-slate-900/5 transition-colors group-hover:bg-slate-900/0" />
			</div>

			{/* Content Container */}
			<div className="flex flex-1 flex-col justify-center py-2">
				{/* Metadata Row */}
				<div className="mb-4 flex items-center gap-4">
					<div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
						<Calendar size={14} className="text-stem-blue/70" />
						{new Date(date).toLocaleDateString("vi-VN")}
					</div>
					<div className="h-4 w-px bg-slate-100" />
					<div className="text-stem-blue flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase">
						<Tag size={12} />
						{category || "Tin tức"}
					</div>
				</div>

				{/* Title */}
				<h3 className="group-hover:text-stem-blue mb-3 line-clamp-2 text-xl leading-snug font-black text-slate-900 transition-colors md:text-2xl">
					{title}
				</h3>

				{/* Description */}
				<p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500 md:line-clamp-3">{desc}</p>

				{/* Call to Action */}
				<div className="mt-auto flex items-center gap-1.5 text-sm font-black text-slate-900">
					<span className="group-hover:text-stem-blue relative overflow-hidden">
						Đọc chi tiết
						<span className="bg-stem-blue absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
					</span>
					<ChevronRight
						size={16}
						className="text-stem-blue transition-transform duration-300 group-hover:translate-x-1"
					/>
				</div>
			</div>
		</motion.div>
	</Link>
);

export default React.memo(NewsItem);
