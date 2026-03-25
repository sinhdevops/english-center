"use client";

import React from"react";
import { Swiper, SwiperSlide } from"swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from"swiper/modules";
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight, User } from"lucide-react";
import Link from"next/link";
import Image from"next/image";

// Import Swiper styles
import"swiper/css";
import"swiper/css/navigation";
import"swiper/css/pagination";
import"swiper/css/effect-fade";

interface NewsCarouselProps {
	items: any[];
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ items = [] }) => {
	if (!items || items.length === 0) return null;

	return (
		<div className="group relative mb-20">
			<Swiper
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				spaceBetween={30}
				slidesPerView={1}
				navigation={{
					nextEl:".swiper-button-next-custom",
					prevEl:".swiper-button-prev-custom",
				}}
				pagination={{
					clickable: true,
					bulletClass:
						"swiper-pagination-bullet !bg-slate-300 !opacity-50 !w-2 !h-2 !transition-all !duration-300",
					bulletActiveClass:"!bg-stem-blue !opacity-100 !w-6 !rounded-full",
				}}
				autoplay={{
					delay: 6000,
					disableOnInteraction: false,
				}}
				className="news-swiper-main pb-16!"
			>
				{items.map((slide) => (
					<SwiperSlide key={slide.id}>
						<Link
							href={`/tin-tuc/${slide.id}`}
							className="group/card relative block overflow-hidden rounded-4xl bg-white ring-1 ring-slate-100 transition-all duration-500"
						>
							<div className="flex flex-col lg:flex-row">
								{/* Image Section */}
								<div className="relative aspect-16/10 w-full overflow-hidden lg:aspect-auto lg:h-[500px] lg:w-3/5">
									<Image
										src={
											slide.image_url ||
											"https://images.unsplash.com/photo-1518770660439-4636190af475"
										}
										alt={slide.title}
										width={1200}
										height={800}
										className="h-full w-full object-cover transition-transform duration-1000 group-hover/card:scale-105"
										priority
										referrerPolicy="no-referrer"
									/>
									<div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />

									<div className="absolute top-6 left-6 z-10">
										<span className="rounded-full bg-white/95 px-6 py-2 text-[11px] font-black tracking-[0.2em] text-slate-900 uppercase ring-1 ring-slate-200/50 backdrop-blur-md">
											{slide.category ||"Bài viết mới"}
										</span>
									</div>
								</div>

								{/* Content Section */}
								<div className="flex flex-1 flex-col justify-center p-10 lg:p-16">
									<div className="mb-6 flex items-center gap-6 text-[11px] font-black tracking-[0.15em] text-slate-400 uppercase">
										<div className="flex items-center gap-2">
											<Calendar size={16} className="text-stem-blue" />
											{new Date(slide.date).toLocaleDateString("vi-VN")}
										</div>
										<span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
										<div className="flex items-center gap-2">
											<User size={16} className="text-stem-blue" />
											<span>STEMKey Admin</span>
										</div>
									</div>

									<h2 className="group-hover/card:text-stem-blue mb-6 text-3xl leading-tight font-black text-slate-900 transition-colors lg:text-5xl">
										{slide.title}
									</h2>

									<p className="mb-10 line-clamp-3 text-lg leading-relaxed text-slate-500">
										{slide.excerpt || slide.description}
									</p>

									<div className="mt-auto flex">
										<span className="group/btn hover:bg-stem-blue hover: relative flex items-center gap-3 overflow-hidden rounded-2xl bg-slate-900 px-8 py-4 text-sm font-black text-white transition-all hover:">
											<span>Khám phá ngay</span>
											<ArrowUpRight
												size={20}
												className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
											/>
										</span>
									</div>
								</div>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Custom Elegant Navigation */}
			<div className="absolute top-[45%] -left-8 z-20 hidden -translate-y-1/2 lg:block">
				<button className="swiper-button-prev-custom group/nav hover:bg-stem-blue flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-900 ring-1 ring-slate-100 transition-all hover:-translate-x-1 hover:text-white disabled:opacity-0">
					<ChevronLeft size={28} className="transition-transform group-hover/nav:scale-110" />
				</button>
			</div>
			<div className="absolute top-[45%] -right-8 z-20 hidden -translate-y-1/2 lg:block">
				<button className="swiper-button-next-custom group/nav hover:bg-stem-blue flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-900 ring-1 ring-slate-100 transition-all hover:translate-x-1 hover:text-white disabled:opacity-0">
					<ChevronRight size={28} className="transition-transform group-hover/nav:scale-110" />
				</button>
			</div>

			<style jsx global>{`
				.news-swiper-main .swiper-pagination {
					position: absolute;
					bottom: 0 !important;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 12px;
				}
			`}</style>
		</div>
	);
};

export default React.memo(NewsCarousel);
