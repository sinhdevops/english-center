"use client";

import { motion } from "motion/react";
import React from "react";
import { NEWS_DATA } from "@/constants";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NewsProps {
	initialNews?: any[];
}

const News = ({ initialNews }: NewsProps) => {
	const displayNews = initialNews && initialNews.length > 0 ? initialNews : NEWS_DATA;

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-360 px-4">
				<div className="mb-10">
					<h2 className="text-3xl font-bold lg:text-4xl">Loạt sự kiện HOT - đừng vội lướt qua!</h2>
				</div>

				<Swiper
					modules={[Autoplay]}
					spaceBetween={16}
					slidesPerView={1.2}
					autoplay={{
						delay: 4000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					breakpoints={{
						640: {
							slidesPerView: 2.2,
							spaceBetween: 24,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
					}}
					className="news-swiper"
				>
					{displayNews.map((post: any, i) => (
						<SwiperSlide key={i} className="h-auto">
							<Link href={`/tin-tuc/${post.id}`}>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className="group hover:border-stem-blue/20 flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50"
								>
									<div className="relative aspect-16/10 overflow-hidden">
										<Image
											src={
												post.image_url ||
												post.img ||
												"https://images.unsplash.com/photo-1506744038136-479a7ea31600?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
											}
											alt={post.title}
											width={800}
											height={500}
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
											referrerPolicy="no-referrer"
										/>
									</div>
									<div className="flex flex-1 flex-col p-6">
										<h3 className="group-hover:text-stem-blue mb-3 line-clamp-1 text-lg font-bold text-slate-900 transition-colors">
											{post.title}
										</h3>
										<p className="mb-6 line-clamp-2 h-[3.25em] text-sm leading-relaxed text-slate-500">
											{post.excerpt || post.description || post.desc}
										</p>
										<div className="text-stem-blue mt-auto flex items-center gap-2 font-bold">
											<span>Xem chi tiết</span>
											<ArrowRight size={18} />
										</div>
									</div>
								</motion.div>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="mt-8 flex items-center justify-center">
					<Link href="/tin-tuc">
						<Button size="sm">Xem tất cả</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default React.memo(News);
