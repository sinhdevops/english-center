"use client";

import { motion } from "motion/react";
import React, { useRef } from "react";
import { TEACHERS_DATA } from "@/constants";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

const Teachers = () => {
	const swiperRef = useRef<SwiperType | null>(null);

	return (
		<section className="overflow-hidden bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-10 text-center text-2xl font-semibold lg:text-4xl"
				>
					300+ GIÁO VIÊN TRUYỀN CẢM HỨNG
				</motion.h2>

				<div className="relative flex items-center gap-4">
					{/* Prev */}
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						className="hidden shrink-0 items-center justify-center rounded-full border border-slate-300 p-3 transition hover:bg-slate-100 lg:flex"
					>
						<ChevronLeft size={20} className="text-slate-600" />
					</button>

					<Swiper
						onSwiper={(swiper) => { swiperRef.current = swiper; }}
						modules={[Navigation, Autoplay]}
						spaceBetween={16}
						slidesPerView={1.3}
						autoplay={{ delay: 4000, disableOnInteraction: false }}
						breakpoints={{
							640: { slidesPerView: 2.2, spaceBetween: 20 },
							1024: { slidesPerView: 4, spaceBetween: 24 },
						}}
						className="w-full"
					>
						{TEACHERS_DATA.map((t, i) => (
							<SwiperSlide key={i}>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.08 }}
									className="group relative w-full overflow-hidden rounded-2xl aspect-282/401 bg-slate-100"
								>
									<Image
										src={t.img}
										alt={t.name}
										fill
										sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										referrerPolicy="no-referrer"
									/>
									{/* Gradient overlay */}
									<div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent px-4 py-5">
										<p className="text-base font-semibold text-white">{t.name}</p>
										<p className="mt-1 text-sm leading-snug text-white/80">{t.role}</p>
									</div>
								</motion.div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Next */}
					<button
						onClick={() => swiperRef.current?.slideNext()}
						className="hidden shrink-0 items-center justify-center rounded-full border border-slate-300 p-3 transition hover:bg-slate-100 lg:flex"
					>
						<ChevronRight size={20} className="text-slate-600" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Teachers);
