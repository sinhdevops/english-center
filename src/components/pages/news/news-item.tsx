"use client";

import React, { useState } from "react";
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
	type?: "article" | "video";
	youtube_id?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ id, title, category, date, desc, img, type = "article", youtube_id }) => {
	const [playing, setPlaying] = useState(false);

	const isVideo = type === "video" && !!youtube_id;
	const thumbnailSrc = isVideo
		? `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`
		: img || "https://images.unsplash.com/photo-1543269865-cbf427effbad";

	if (isVideo) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="hover:border-stem-blue/10 relative flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-5 transition-all duration-500 hover:bg-slate-50/30 hover:shadow-md md:flex-row"
			>
				{/* Thumbnail → iframe toggle */}
				<div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl bg-black md:h-48 md:w-72 lg:w-80">
					{playing ? (
						<iframe
							src={`https://www.youtube.com/embed/${youtube_id}?autoplay=1&rel=0`}
							title={title}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="h-full w-full rounded-2xl"
						/>
					) : (
						<button
							type="button"
							className="group relative h-full w-full cursor-pointer"
							onClick={() => setPlaying(true)}
						>
							<Image
								src={thumbnailSrc}
								alt={title}
								width={400}
								height={300}
								className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
								referrerPolicy="no-referrer"
								unoptimized
							/>
							<div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
							{/* Play button */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-900/40 transition-transform duration-300 group-hover:scale-110">
									<svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white">
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</div>
						</button>
					)}
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col justify-center py-2">
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
					<h3 className="mb-3 line-clamp-2 text-[18px] leading-snug font-black text-slate-900">
						{title}
					</h3>
					{desc && (
						<p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500 md:line-clamp-3">{desc}</p>
					)}
				</div>
			</motion.div>
		);
	}

	return (
		<Link href={`/tin-tuc/${id}`} className="block">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="group hover:border-stem-blue/10 relative flex cursor-pointer flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-5 transition-all duration-500 hover:bg-slate-50/30 hover:shadow-md md:flex-row"
			>
				<div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl md:h-48 md:w-72 lg:w-80">
					<Image
						src={img || "https://images.unsplash.com/photo-1543269865-cbf427effbad"}
						alt={title}
						width={400}
						height={300}
						className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
						referrerPolicy="no-referrer"
					/>
					<div className="absolute inset-0 bg-slate-900/5 transition-colors group-hover:bg-slate-900/0" />
				</div>

				<div className="flex flex-1 flex-col justify-center py-2">
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
					<h3 className="group-hover:text-stem-blue mb-3 line-clamp-2 text-[18px] leading-snug font-black text-slate-900 transition-colors">
						{title}
					</h3>
					<p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500 md:line-clamp-3">{desc}</p>
					<div className="mt-auto flex items-center gap-1.5 text-sm font-black text-slate-900">
						<span className="group-hover:text-stem-blue relative overflow-hidden">
							Đọc chi tiết
							<span className="bg-stem-blue absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
						</span>
						<ChevronRight size={16} className="text-stem-blue transition-transform duration-300 group-hover:translate-x-1" />
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

export default React.memo(NewsItem);
