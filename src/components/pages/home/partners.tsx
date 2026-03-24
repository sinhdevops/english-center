"use client";

import { motion } from "motion/react";
import React from "react";
import Image from "next/image";
import { PARTNERS_DATA } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Partners = () => {
	return (
		<section className="overflow-hidden bg-white">
			<div className="mx-auto max-w-360 px-4">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-10 text-center text-3xl font-bold text-slate-900 lg:text-4xl"
				>
					Đối tác của STEMKey
				</motion.h2>

				<div className="transition-all duration-700">
					<Swiper
						modules={[Autoplay]}
						spaceBetween={20}
						slidesPerView={2}
						loop={true}
						speed={3000}
						autoplay={{
							delay: 0,
							disableOnInteraction: false,
						}}
						breakpoints={{
							640: {
								slidesPerView: 3,
							},
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 6,
							},
						}}
						className="partners-swiper"
					>
						{PARTNERS_DATA.map((p, i) => (
							<SwiperSlide key={i}>
								<div className="flex h-20 items-center justify-center">
									<Image
										src={p.logo}
										alt={`Đối tác ${p.name}`}
										width={150}
										height={60}
										sizes="(max-width: 640px) 150px, 200px"
										className="h-10 w-auto object-contain lg:h-14"
										referrerPolicy="no-referrer"
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Partners);
