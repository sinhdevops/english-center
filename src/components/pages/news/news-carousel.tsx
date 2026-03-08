"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NewsCarouselProps {
	items: any[];
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ items = [] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!items || items.length === 0) return null;

	const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
	const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

	// Determine how many items to show (max 2)
	const visibleItemsCount = Math.min(items.length, 2);

	return (
		<div className="group relative mb-16">
			<div className="flex gap-6 overflow-hidden">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						className={`grid w-full grid-cols-1 gap-8 ${visibleItemsCount > 1 ? "md:grid-cols-2" : ""}`}
					>
						{[...Array(visibleItemsCount)].map((_, offset) => {
							const slide = items[(currentIndex + offset) % items.length];
							return (
								<Link
									href={`/tin-tuc/${slide.id}`}
									key={slide.id}
									className="flex cursor-pointer flex-col"
								>
									<div className="mb-4 aspect-video overflow-hidden rounded-2xl shadow-lg">
										<Image
											src={
												slide.image_url ||
												"https://images.unsplash.com/photo-1531297484001-80022131f5a1"
											}
											alt={slide.title}
											width={800}
											height={450}
											className="h-full w-full object-cover"
											referrerPolicy="no-referrer"
										/>
									</div>
									<h3 className="hover:text-stem-blue mb-2 line-clamp-2 cursor-pointer text-lg font-bold text-slate-900 transition-colors">
										{slide.title}
									</h3>
									<p className="mb-3 line-clamp-3 text-sm leading-relaxed text-slate-500">
										{slide.excerpt || slide.description}
									</p>
									<div className="flex items-center gap-4 text-xs font-medium text-slate-400">
										<span>{new Date(slide.date).toLocaleDateString("vi-VN")}</span>
										<span>•</span>
										<span>Tin tức</span>
									</div>
								</Link>
							);
						})}
					</motion.div>
				</AnimatePresence>
			</div>

			{items.length > 2 && (
				<>
					<button
						onClick={prev}
						className="absolute top-1/3 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#c41e3a] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
					>
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={next}
						className="absolute top-1/3 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#c41e3a] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
		</div>
	);
};

export default React.memo(NewsCarousel);
