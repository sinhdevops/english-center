"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";

interface NewsItemProps {
	title: string;
	date: string;
	desc: string;
	img: string;
	onClick?: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, date, desc, img, onClick }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		onClick={onClick}
		className="group mb-8 flex cursor-pointer flex-col gap-6 border-b border-slate-100 pb-8 last:border-0 md:flex-row"
	>
		<div className="w-full shrink-0 grow-0 overflow-hidden rounded-xl md:w-1/3">
			<Image
				src={img}
				alt={title}
				width={400}
				height={300}
				className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
				referrerPolicy="no-referrer"
			/>
		</div>
		<div className="grow">
			<div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
				<Calendar size={14} />
				<span>{date}</span>
			</div>
			<h3 className="group-hover:text-stem-blue mb-3 text-xl leading-tight font-bold text-slate-900 transition-colors">
				{title}
			</h3>
			<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">{desc}</p>
			<button className="text-stem-blue flex items-center gap-1 text-sm font-bold hover:underline">
				Xem thêm <ChevronRight size={14} />
			</button>
		</div>
	</motion.div>
);

export default React.memo(NewsItem);
