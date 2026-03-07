"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NEWS_SLIDES } from "@/constants";

interface NewsCarouselProps {
	onArticleSelect?: (article: any) => void;
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ onArticleSelect }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const next = () => setCurrentIndex((prev) => (prev + 1) % NEWS_SLIDES.length);
	const prev = () => setCurrentIndex((prev) => (prev - 1 + NEWS_SLIDES.length) % NEWS_SLIDES.length);

	return (
		<div className="group relative mb-16">
			<div className="flex gap-6 overflow-hidden">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						className="grid w-full grid-cols-1 gap-8 md:grid-cols-2"
					>
						{[0, 1].map((offset) => {
							const slide = NEWS_SLIDES[(currentIndex + offset) % NEWS_SLIDES.length];
							return (
								<Link
									href={`/tin-tuc/${slide.title}`}
									key={offset}
									className="flex cursor-pointer flex-col"
									onClick={() => onArticleSelect?.(slide)}
								>
									<div className="mb-4 aspect-video overflow-hidden rounded-2xl shadow-lg">
										<Image
											src={slide.img}
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
										{slide.desc}
									</p>
									<div className="flex items-center gap-4 text-xs font-medium text-slate-400">
										<span>{slide.date}</span>
										<span>•</span>
										<span>{slide.views}</span>
									</div>
								</Link>
							);
						})}
					</motion.div>
				</AnimatePresence>
			</div>

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
		</div>
	);
};

export default React.memo(NewsCarousel);
