"use client";

import { motion } from "motion/react";
import React from "react";
import { NEWS_DATA } from "@/constants";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const News = () => {
	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-10">
					<h2 className="text-3xl font-bold lg:text-4xl">Loạt sự kiện HOT - đừng vội lướt qua!</h2>
				</div>

				<Swiper
					modules={[Autoplay, Pagination]}
					spaceBetween={20}
					slidesPerView={1}
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
							slidesPerView: 2,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 40,
						},
					}}
					className="news-swiper pb-12!"
				>
					{NEWS_DATA.map((post, i) => (
						<SwiperSlide key={i} className="h-auto">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="group flex h-full cursor-pointer flex-col"
							>
								<div className="mb-6 aspect-16/10 max-h-[220px] w-full overflow-hidden rounded-xl shadow-lg">
									<Image
										src={post.img}
										alt={post.title}
										width={800}
										height={500}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										referrerPolicy="no-referrer"
									/>
								</div>
								<h3 className="group-hover:text-stem-blue text-sm leading-tight text-slate-600 transition-colors lg:text-lg">
									{post.title}
								</h3>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default React.memo(News);
