"use client";

import { motion } from "motion/react";
import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

interface TestimonialsProps {
	items?: any[];
}

const Testimonials = ({ items = [] }: TestimonialsProps) => {
	// If items are provided from database, use them, otherwise fallback to constants
	const displayData =
		items.length > 0
			? items.map((item) => ({
					id: item.id,
					title: item.title,
					desc: item.excerpt || item.description,
					img: item.image_url,
					date: item.date,
				}))
			: [];

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-10 text-3xl font-bold text-slate-900 lg:mb-16 lg:text-4xl"
				>
					Cảm nhận của học viên và phụ huynh
				</motion.h2>

				{/* Featured Award */}
				<Link
					href={`/tin-tuc/${displayData[0]?.id}`}
					className="group relative mb-12 block aspect-21/9 max-h-[300px] min-h-[220px] w-full overflow-hidden rounded-xl shadow-2xl"
				>
					<Image
						src={displayData[0].img}
						alt="Vinh danh học viên đạt giải thưởng JU AWARDS 2025"
						width={1200}
						height={514}
						sizes="100vw"
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						referrerPolicy="no-referrer"
					/>
					<div className="absolute inset-0 flex items-end bg-linear-to-t from-black/90 via-black/20 to-transparent p-4 md:p-8">
						<div className="max-w-2xl">
							<p className="text-stem-blue mb-2 text-sm font-bold tracking-widest uppercase">
								Thông báo mới nhất
							</p>
							<p className="text-lg leading-relaxed font-black text-white md:text-xl">
								{displayData[0].title}
							</p>
						</div>
					</div>
				</Link>

				{/* Award Grid */}
				<Swiper
					modules={[Autoplay]}
					spaceBetween={16}
					slidesPerView={1.2}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
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
					className="testimonials-swiper pb-12!"
				>
					{displayData.slice(1).map((award: any, i) => (
						<SwiperSlide key={award.id || i} className="h-auto">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="group hover:border-stem-blue/20 flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50"
							>
								<Link
									href={award.id ? `/tin-tuc/${award.id}` : "/goc-ba-me"}
									className="flex h-full flex-col"
								>
									<div className="relative aspect-4/3 overflow-hidden rounded-t-2xl">
										<Image
											src={
												award.img || "https://images.unsplash.com/photo-1543269865-cbf427effbad"
											}
											alt={`Giải thưởng: ${award.title}`}
											width={800}
											height={600}
											sizes="(max-width: 768px) 100vw, 33vw"
											className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
											referrerPolicy="no-referrer"
										/>
										<div className="absolute inset-0 bg-slate-900/5 transition-colors group-hover:bg-transparent" />
									</div>
									<div className="flex flex-1 flex-col p-6">
										<div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
											<Calendar size={14} className="text-stem-blue/60" />
											<span>
												{award.date
													? new Date(award.date).toLocaleDateString("vi-VN")
													: "14/03/2026"}
											</span>
										</div>
										<h3 className="group-hover:text-stem-blue mb-3 line-clamp-1 text-lg font-black text-slate-900 transition-colors">
											{award.title}
										</h3>
										<p className="mb-3 line-clamp-2 h-[3.25em] text-sm leading-relaxed text-slate-500">
											{award.desc}
										</p>
										<div className="text-stem-blue mt-auto flex items-center gap-2 text-sm font-black">
											<span className="relative overflow-hidden">
												Xem chi tiết
												<span className="bg-stem-blue absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
											</span>
											<ArrowRight
												size={16}
												className="transition-transform duration-300 group-hover:translate-x-1"
											/>
										</div>
									</div>
								</Link>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default React.memo(Testimonials);
