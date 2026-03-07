"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronLeft, ChevronRight, TrendingUp, ChevronRight as ChevronRightIcon } from "lucide-react";
import { CourserSidebar } from "@/components/ui/courser-sidebar";
import Link from "next/link";
import Image from "next/image";
import { LEARNING_CORNER_SLIDES, LEARNING_MATERIALS } from "@/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const Carousel: React.FC<{ onArticleSelect?: (article: any) => void }> = ({ onArticleSelect }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const next = () => setCurrentIndex((prev) => (prev + 1) % LEARNING_CORNER_SLIDES.length);
	const prev = () =>
		setCurrentIndex((prev) => (prev - 1 + LEARNING_CORNER_SLIDES.length) % LEARNING_CORNER_SLIDES.length);

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
							const slide =
								LEARNING_CORNER_SLIDES[(currentIndex + offset) % LEARNING_CORNER_SLIDES.length];
							return (
								<Link
									href={`/goc-hoc-tap/${slide.title}`}
									key={offset}
									className="group/item flex cursor-pointer flex-col"
									onClick={() => onArticleSelect?.(slide)}
								>
									<div className="relative mb-4 aspect-video overflow-hidden rounded-2xl shadow-lg">
										<Image
											src={slide.img}
											alt={slide.title}
											width={800}
											height={450}
											className="h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-105"
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

const MaterialItem = ({ title, date, desc, img, onClick }: any) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		onClick={onClick}
		className="group mb-8 flex cursor-pointer flex-col gap-6 border-b border-slate-100 pb-8 last:border-0 md:flex-row"
	>
		<Link href={`/goc-hoc-tap/${title}`} className="flex w-full flex-col gap-6 md:flex-row">
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
			<div className="grow text-left">
				<div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
					<Calendar size={14} />
					<span>{date}</span>
				</div>
				<h3 className="group-hover:text-stem-blue mb-3 text-xl leading-tight font-bold text-slate-900 transition-colors">
					{title}
				</h3>
				<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">{desc}</p>
				<button className="text-stem-blue flex items-center gap-1 text-sm font-bold hover:underline">
					Tải tài liệu <ChevronRightIcon size={14} />
				</button>
			</div>
		</Link>
	</motion.div>
);

export default function LearningCornerPage({ onArticleSelect }: { onArticleSelect?: (article: any) => void }) {
	return (
		<div className="min-h-screen bg-white">
			<div className="border-b border-slate-100 bg-slate-50 py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb items={[{ label: "Góc học tập", active: true }]} variant="dark" />
				</div>
			</div>
			<div className="mx-auto max-w-7xl px-4 py-12 text-center lg:py-20">
				<Carousel onArticleSelect={onArticleSelect} />
				<div className="flex flex-col gap-16 lg:flex-row">
					<div className="w-full lg:w-2/3">
						<h1 className="mb-10 flex items-center gap-3 text-3xl font-black text-slate-900">
							<TrendingUp className="text-stem-blue" /> Góc học tập
						</h1>
						<div className="space-y-4">
							{LEARNING_MATERIALS.map((item, idx) => (
								<MaterialItem key={idx} {...item} onClick={() => onArticleSelect?.(item)} />
							))}
						</div>

						{/* Pagination */}
						<div className="mt-12 flex items-center justify-center gap-2">
							{[1, 2, 3, "..."].map((p, i) => (
								<button
									key={i}
									className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
										p === 1
											? "bg-stem-blue text-white"
											: "bg-slate-50 text-slate-600 hover:bg-slate-100"
									}`}
								>
									{p}
								</button>
							))}
							<button className="h-10 rounded-lg bg-slate-50 px-4 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100">
								Tiếp theo
							</button>
						</div>
					</div>
					<div className="w-full lg:w-1/3">
						<CourserSidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
