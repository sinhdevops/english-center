"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TestimonialsProps {
	items?: any[];
}

const PlayButton = () => (
	<div className="flex size-16 items-center justify-center rounded-full bg-red-600 shadow-xl transition-transform duration-300 group-hover:scale-110 lg:size-20">
		<svg viewBox="0 0 24 24" className="ml-1.5 h-7 w-7 fill-white lg:h-9 lg:w-9">
			<path d="M8 5v14l11-7z" />
		</svg>
	</div>
);

const Testimonials = ({ items = [] }: TestimonialsProps) => {
	const [isPlaying, setIsPlaying] = useState(false);

	if (!items.length) return null;

	const mapped = items.map((item) => ({
		id: item.id,
		title: item.title,
		img: item.image_url,
		youtubeId: item.youtube_id ?? null,
	}));

	const featured = mapped[0];
	const grid = mapped.slice(1, 5);

	const featuredThumbnail = featured?.youtubeId
		? `https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg`
		: featured?.img || "https://images.unsplash.com/photo-1543269865-cbf427effbad";

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4 lg:px-0">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-6 text-2xl font-semibold lg:text-4xl"
				>
					CẢM NHẬN CỦA HỌC VIÊN VÀ PHỤ HUYNH
				</motion.h2>

				<div className="flex flex-col gap-6 lg:flex-row">
					{/* Left — featured video */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="w-full lg:w-[55%]"
					>
						<div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-90">
							{isPlaying && featured?.youtubeId ? (
								<iframe
									src={`https://www.youtube.com/embed/${featured.youtubeId}?autoplay=1&rel=0&mute=1`}
									title={featured.title || "Video"}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									className="h-full w-full lg:absolute lg:inset-0"
								/>
							) : (
								<button
									type="button"
									className="group relative h-full w-full cursor-pointer"
									onClick={() => featured?.youtubeId && setIsPlaying(true)}
								>
									<Image
										src={featuredThumbnail}
										alt={featured?.title || "Cảm nhận học viên"}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										sizes="(max-width: 1024px) 100vw, 55vw"
										referrerPolicy="no-referrer"
										unoptimized={!!featured?.youtubeId}
										priority
									/>
									<div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
									<div className="absolute inset-0 flex items-center justify-center">
										<PlayButton />
									</div>
								</button>
							)}
						</div>
					</motion.div>

					{/* Right — 2×2 grid */}
					<div className="grid w-full grid-cols-2 gap-6 lg:w-[45%]">
						{grid.map((item, i) => (
							<motion.div
								key={item.id || i}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08 }}
							>
								<Link
									href={`/goc-ba-me/${item.id}`}
									className="group relative block w-full overflow-hidden rounded-2xl aspect-4/3"
								>
									<Image
										src={item.img || "https://images.unsplash.com/photo-1543269865-cbf427effbad"}
										alt={item.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
										sizes="(max-width: 1024px) 45vw, 22vw"
										referrerPolicy="no-referrer"
									/>
									{/* Text overlay */}
									<div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-3 py-4">
										<p className="line-clamp-2 text-sm font-medium leading-snug text-white">
											{item.title}
										</p>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Testimonials);
