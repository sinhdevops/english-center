"use client";

import { motion } from "motion/react";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { TEACHERS_DATA } from "@/constants";
import Image from "next/image";

const Teachers = () => {
	return (
		<section className="overflow-hidden bg-[#F1F5F9]">
			<div className="mx-auto max-w-7xl px-4 my-[120px]">
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
						className="text-lg font-medium text-slate-500"
					>
						Tài năng, cá tính và tâm huyết trong từng bài giảng
					</motion.p>
				</div>

				<div className="relative px-4 md:px-12">
					<Carousel
						opts={{
							align: "start",
							loop: true,
						}}
						className="w-full"
					>
						<CarouselContent className="-ml-4 md:-ml-6">
							{TEACHERS_DATA.map((t, i) => (
								<CarouselItem key={i} className="pl-4 sm:basis-1/2 md:pl-6 lg:basis-1/4">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.1 }}
										className="flex h-full flex-col"
									>
										<div
											className="group relative mb-6 aspect-4/5 overflow-hidden rounded-xl bg-white shadow-sm"
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
										</div>
										<h3 className="mb-2 text-xl font-bold text-slate-900">{t.name}</h3>
										<p className="text-sm leading-relaxed font-medium text-slate-500">{t.role}</p>
									</motion.div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="-left-6 hidden md:flex lg:-left-12" />
						<CarouselNext className="-right-6 hidden md:flex lg:-right-12" />
					</Carousel>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Teachers);
