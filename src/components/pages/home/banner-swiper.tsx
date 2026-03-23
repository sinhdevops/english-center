"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banner } from "@/lib/types";

import "swiper/css";
import "swiper/css/pagination";

interface BannerSwiperProps {
	banners: Banner[];
}

const BannerSwiper = ({ banners }: BannerSwiperProps) => {
	const swiperRef = useRef<SwiperType | null>(null);

	if (!banners.length) return null;

	return (
		<section className="group relative w-full">
			<Swiper
				onSwiper={(swiper) => { swiperRef.current = swiper; }}
				modules={[Autoplay, Pagination, Navigation]}
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				pagination={{ clickable: true }}
				loop={banners.length > 1}
				className="banner-swiper h-55 w-full lg:h-150"
			>
				{banners.map((banner) => {
					const inner = (
						<div className="relative h-full w-full">
							<Image
								src={banner.image_url}
								alt={banner.title || "Banner"}
								fill
								className="object-cover"
								priority
								sizes="100vw"
							/>
						</div>
					);

					return (
						<SwiperSlide key={banner.id}>
							{banner.link_url ? (
								<Link href={banner.link_url} className="block h-full w-full">
									{inner}
								</Link>
							) : (
								inner
							)}
						</SwiperSlide>
					);
				})}
			</Swiper>

			{/* Custom navigation buttons */}
			<button
				onClick={() => swiperRef.current?.slidePrev()}
				className="absolute top-1/2 left-4 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all duration-300 sm:flex sm:opacity-0 group-hover:sm:opacity-100 hover:cursor-pointer hover:bg-white hover:text-black sm:left-10"
			>
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={() => swiperRef.current?.slideNext()}
				className="absolute top-1/2 right-4 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all duration-300 sm:flex sm:opacity-0 group-hover:sm:opacity-100 hover:cursor-pointer hover:bg-white hover:text-black sm:right-10"
			>
				<ChevronRight size={24} />
			</button>
		</section>
	);
};

export default React.memo(BannerSwiper);
