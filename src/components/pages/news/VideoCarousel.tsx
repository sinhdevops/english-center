"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

interface VideoCarouselProps {
	items: any[];
}

const VideoCarousel = ({ items }: VideoCarouselProps) => {
	const swiperRef = useRef<SwiperType | null>(null);
	const [playingId, setPlayingId] = useState<string | null>(null);

	if (!items.length) return null;

	return (
		<div className="relative">
			<Swiper
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				modules={[Autoplay]}
				spaceBetween={20}
				slidesPerView={1}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				breakpoints={{
					768: { slidesPerView: 2, spaceBetween: 20 },
				}}
			>
				{items.map((item: any, i: number) => {
					const uid = item.id || String(i);
					const isPlaying = playingId === uid;
					const thumbnailSrc =
						item.type === "video" && item.youtube_id
							? `https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`
							: item.image_url || item.img || "https://images.unsplash.com/photo-1543269865-cbf427effbad";

					return (
						<SwiperSlide key={uid}>
							<div className="relative aspect-video w-full overflow-hidden rounded-2xl">
								{isPlaying ? (
									<iframe
										src={`https://www.youtube.com/embed/${item.youtube_id}?autoplay=1&rel=0&mute=1`}
										title={item.title}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										className="h-full w-full"
									/>
								) : (
									<button
										type="button"
										className="group relative h-full w-full cursor-pointer"
										onClick={() => item.youtube_id && setPlayingId(uid)}
									>
										<Image
											src={thumbnailSrc}
											alt={item.title || ""}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-cover transition-transform duration-500 group-hover:scale-105"
											referrerPolicy="no-referrer"
											unoptimized={item.type === "video"}
										/>
										<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

										{/* Play button */}
										{item.youtube_id && (
											<div className="absolute inset-0 flex items-center justify-center">
												<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
													<svg viewBox="0 0 24 24" className="ml-1.5 h-7 w-7 fill-white">
														<path d="M8 5v14l11-7z" />
													</svg>
												</div>
											</div>
										)}

										{/* Caption */}
										{item.title && (
											<div className="absolute bottom-4 left-4 right-4">
												<p className="line-clamp-2 text-sm font-semibold text-white drop-shadow">
													{item.title}
												</p>
											</div>
										)}
									</button>
								)}
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>

			{/* Navigation arrows */}
			<button
				type="button"
				onClick={() => swiperRef.current?.slidePrev()}
				className="absolute top-1/2 -left-5 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg"
				aria-label="Slide trước"
			>
				<ChevronLeft size={18} className="text-slate-600" />
			</button>
			<button
				type="button"
				onClick={() => swiperRef.current?.slideNext()}
				className="absolute top-1/2 -right-5 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg"
				aria-label="Slide tiếp theo"
			>
				<ChevronRight size={18} className="text-slate-600" />
			</button>
		</div>
	);
};

export default React.memo(VideoCarousel);
