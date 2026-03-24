"use client";

import { motion } from "motion/react";
import React from "react";
import { TEACHERS_DATA } from "@/constants";
import Image from "next/image";
import { IMAGES } from "../../../../public/statics/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Teachers = () => {
	return (
		<section className="overflow-hidden bg-[#F1F5F9]">
			<div className="mx-auto my-20 max-w-7xl px-4">
				<div className="mb-10 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl font-bold text-slate-900 lg:text-4xl"
					>
						300+ giáo viên truyền cảm hứng
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-slate-600"
					>
						Tài năng, cá tính và tâm huyết trong từng bài giảng
					</motion.p>
				</div>

				<div className="relative">
					<Swiper
						modules={[Autoplay]}
						spaceBetween={16}
						slidesPerView={1.2}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
							dynamicBullets: true,
						}}
						breakpoints={{
							640: {
								slidesPerView: 2.2,
								spaceBetween: 20,
							},
							1024: {
								slidesPerView: 4,
								spaceBetween: 30,
							},
						}}
						className="teachers-swiper"
					>
						{TEACHERS_DATA.map((t, i) => (
							<SwiperSlide key={i} className="h-auto">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className="flex h-full flex-col"
								>
									<div
										className="group relative mb-6 aspect-4/5 overflow-hidden rounded-xl bg-white"
										aria-hidden="true"
									>
										<Image
											src={t.img}
											alt={t.name}
											width={400}
											height={500}
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
											className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
											referrerPolicy="no-referrer"
										/>
										<div className="absolute top-3 left-2 text-white">
											<Image src={IMAGES.logo} alt="logo" width={80} />
										</div>
									</div>
									<h3 className="mb-[6px] text-lg font-semibold text-slate-900">{t.name}</h3>
									<p className="leading-relaxed text-slate-600">{t.role}</p>
								</motion.div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Teachers);
