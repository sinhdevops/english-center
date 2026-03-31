"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowUpRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
	id: string;
	title: string;
	category?: string;
	date: string;
	desc: string;
	img: string;
	index?: number;
	type?: "article" | "video";
	youtube_id?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
	id,
	title,
	category,
	date,
	desc,
	img,
	index = 0,
	type = "article",
	youtube_id,
}) => {
	const [playing, setPlaying] = useState(false);

	const isVideo = type === "video" && !!youtube_id;
	const thumbnailSrc = isVideo
		? `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`
		: img || "https://images.unsplash.com/photo-1543269865-cbf427effbad";

	if (isVideo) {
		return (
			<motion.article
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: index * 0.06 }}
				className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
			>
				{/* Thumbnail → iframe toggle */}
				<div className="relative aspect-video w-full overflow-hidden bg-black">
					{playing ? (
						<iframe
							src={`https://www.youtube.com/embed/${youtube_id}?autoplay=1&rel=0`}
							title={title}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="h-full w-full"
						/>
					) : (
						<button
							type="button"
							className="relative h-full w-full cursor-pointer"
							onClick={() => setPlaying(true)}
						>
							<Image
								src={thumbnailSrc}
								alt={title}
								width={600}
								height={400}
								className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								referrerPolicy="no-referrer"
								unoptimized
							/>
							{/* Dark overlay */}
							<div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
							{/* Category badge */}
							<div className="absolute top-3 left-3">
								<span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black tracking-widest text-slate-700 uppercase backdrop-blur-sm">
									<Tag size={10} className="text-stem-blue" />
									{category || "Tin tức"}
								</span>
							</div>
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
				<div className="flex flex-1 flex-col p-5">
					<div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-slate-400">
						<Calendar size={12} className="text-stem-blue/70" />
						{new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })}
					</div>
					<h3 className="mb-3 line-clamp-2 flex-1 text-[16px] leading-snug font-black text-slate-900">
						{title}
					</h3>
					{desc && <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">{desc}</p>}
				</div>
			</motion.article>
		);
	}

	return (
		<Link href={`/tin-tuc/${id}`} className="block h-full">
			<motion.article
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: index * 0.06 }}
				className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
			>
				<div className="relative aspect-video w-full overflow-hidden">
					<Image
						src={img || "https://images.unsplash.com/photo-1543269865-cbf427effbad"}
						alt={title}
						width={600}
						height={400}
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						referrerPolicy="no-referrer"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="absolute top-3 left-3">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black tracking-widest text-slate-700 uppercase backdrop-blur-sm">
							<Tag size={10} className="text-stem-blue" />
							{category || "Tin tức"}
						</span>
					</div>
				</div>

				<div className="flex flex-1 flex-col p-5">
					<div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-slate-400">
						<Calendar size={12} className="text-stem-blue/70" />
						{new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })}
					</div>
					<h3 className="group-hover:text-stem-blue mb-3 line-clamp-2 flex-1 text-[16px] leading-snug font-black text-slate-900 transition-colors">
						{title}
					</h3>
					<p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">{desc}</p>
					<div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
						<span className="text-stem-blue text-xs font-black tracking-wider uppercase">Đọc chi tiết</span>
						<span className="bg-stem-blue flex h-7 w-7 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
							<ArrowUpRight size={14} />
						</span>
					</div>
				</div>
			</motion.article>
		</Link>
	);
};

export default React.memo(NewsCard);
