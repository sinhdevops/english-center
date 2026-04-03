"use client";

import { motion } from "motion/react";
import React from "react";
import { NEWS_DATA } from "@/constants";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

interface NewsProps {
	initialNews?: any[];
}

const News = ({ initialNews }: NewsProps) => {
	const displayNews = initialNews && initialNews.length > 0 ? initialNews : NEWS_DATA;

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4 lg:px-0">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-6 text-center text-2xl font-semibold tracking-wide lg:text-4xl"
				>
					LOẠT SỰ KIỆN HOT
				</motion.h2>

				<Swiper
					modules={[Autoplay]}
					spaceBetween={24}
					slidesPerView={1.2}
					autoplay={{ delay: 4000, disableOnInteraction: false }}
					breakpoints={{
						640: { slidesPerView: 2.2, spaceBetween: 24 },
						1024: { slidesPerView: 3, spaceBetween: 30 },
					}}
				>
					{displayNews.map((post: any, i) => (
						<SwiperSlide key={i}>
							<Link href={`/tin-tuc/${post.id}`}>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className="group cursor-pointer"
								>
									{/* Image */}
									<div className="relative mb-4 w-full overflow-hidden rounded-2xl aspect-384/220">
										<Image
											src={
												post.image_url ||
												post.img ||
												"https://images.unsplash.com/photo-1506744038136-479a7ea31600?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
											}
											alt={post.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
											sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
											referrerPolicy="no-referrer"
										/>
									</div>

									{/* Text */}
									<h3 className="mb-2 line-clamp-1 text-lg font-semibold text-slate-900">
										{post.title}
									</h3>
									<p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
										{post.excerpt || post.description || post.desc}
									</p>
								</motion.div>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default React.memo(News);
