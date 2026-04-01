"use client";

import { motion } from "motion/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TestimonialsProps {
	items?: any[];
}

const PlayButton = () => (
	<div className="flex size-16 items-center justify-center rounded-full bg-red-600 shadow-xl lg:size-20">
		<div className="ml-1 h-0 w-0 border-t-10 border-b-10 border-l-18 border-t-transparent border-b-transparent border-l-white lg:border-t-13 lg:border-b-13 lg:border-l-24" />
	</div>
);

const Testimonials = ({ items = [] }: TestimonialsProps) => {
	if (!items.length) return null;

	const mapped = items.map((item) => ({
		id: item.id,
		title: item.title,
		img: item.image_url,
	}));

	const featured = mapped[0];
	const grid = mapped.slice(1, 5);

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
						<Link
							href={`/goc-ba-me/${featured?.id}`}
							className="group relative block h-full w-full overflow-hidden rounded-2xl"
						>
							<div className="relative aspect-16/10 w-full lg:aspect-auto lg:h-full lg:min-h-90">
								<Image
									src={featured?.img || "https://images.unsplash.com/photo-1543269865-cbf427effbad"}
									alt={featured?.title || "Cảm nhận học viên"}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-105"
									sizes="(max-width: 1024px) 100vw, 55vw"
									referrerPolicy="no-referrer"
									priority
								/>
								<div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
								{/* Play button */}
								<div className="absolute inset-0 flex items-center justify-center">
									<PlayButton />
								</div>
							</div>
						</Link>
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
