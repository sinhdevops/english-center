"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoCarousel from "./VideoCarousel";

const COURSE_COLORS = [
	{ bg: "bg-green-50", border: "border-green-100", btn: "border-green-300 text-green-700 hover:bg-green-100" },
	{ bg: "bg-blue-50", border: "border-blue-100", btn: "border-blue-300 text-blue-700 hover:bg-blue-100" },
	{ bg: "bg-pink-50", border: "border-pink-100", btn: "border-pink-300 text-pink-700 hover:bg-pink-100" },
];

interface NewsListWithSidebarProps {
	newsTitle: string;
	videoItems: any[];
	articleItems: any[];
	courses: any[];
	detailBase?: string;
	/** "news" = 2 featured cards + list bên dưới, không có swiper
	 *  "parents-corner" = swiper video ở trên + list bài viết bên dưới */
	variant?: "news" | "parents-corner";
}

const NewsListWithSidebar = ({
	newsTitle,
	videoItems,
	articleItems,
	courses,
	detailBase = "/tin-tuc",
	variant = "parents-corner",
}: NewsListWithSidebarProps) => {
	const [playingId, setPlayingId] = useState<string | null>(null);

	const featuredArticles = variant === "news" ? articleItems.slice(0, 2) : [];
	const listArticles = variant === "news" ? articleItems.slice(2) : articleItems;

	return (
		<div className="space-y-10">
			{/* Góc ba mẹ: swiper chỉ video */}
			{variant === "parents-corner" && videoItems.length > 0 && (
				<VideoCarousel items={videoItems} />
			)}

			{/* Tin tức / Góc học tập: 2 featured article cards */}
			{variant === "news" && featuredArticles.length > 0 && (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{featuredArticles.map((item: any) => {
						const thumbnailSrc =
							item.image_url || item.img || "https://images.unsplash.com/photo-1543269865-cbf427effbad";
						return (
							<Link key={item.id} href={`${detailBase}/${item.id}`} className="group block">
								<div className="overflow-hidden rounded-2xl">
									<div className="relative aspect-video w-full overflow-hidden">
										<Image
											src={thumbnailSrc}
											alt={item.title}
											fill
											sizes="(max-width: 640px) 100vw, 50vw"
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
										<div className="absolute bottom-4 left-4 right-4">
											<p className="line-clamp-2 text-lg font-semibold text-white drop-shadow">
												{item.title}
											</p>

										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			)}

			{/* 2-column layout: danh sách bài viết + sidebar khóa học */}
			<div className="flex flex-col gap-6 lg:flex-row">
				{/* LEFT: Article list */}
				<div className="min-w-0 flex-1">
					<h2 className="mb-6 text-2xl font-semibold lg:text-3xl">{newsTitle}</h2>

					<div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-0 lg:space-y-4">
						{listArticles.map((item: any, i: number) => {
							const isVideo = item.type === "video" && item.youtube_id;
							const uid = item.id || String(i);
							const isPlaying = playingId === uid;
							const thumbnailSrc = isVideo
								? `https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`
								: item.image_url || item.img || "https://images.unsplash.com/photo-1543269865-cbf427effbad";

							return (
								<div
									key={uid}
									className="flex flex-col overflow-hidden rounded-2xl border border-[#E6E6E6] bg-white lg:flex-row lg:gap-4"
								>
									{/* Thumbnail */}
									<div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-black lg:h-[180px] lg:w-[240px] xl:w-[282px] lg:rounded-xl">
										{isPlaying ? (
											<iframe
												src={`https://www.youtube.com/embed/${item.youtube_id}?autoplay=1&rel=0`}
												title={item.title}
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
												allowFullScreen
												className="h-full w-full"
											/>
										) : (
											<button
												type="button"
												className="group relative h-full w-full cursor-pointer"
												onClick={() => isVideo && setPlayingId(uid)}
											>
												<Image
													src={thumbnailSrc}
													alt={item.title}
													fill
													sizes="(max-width: 1024px) 50vw, 240px"
													className="object-cover transition-transform duration-500 group-hover:scale-105"
													referrerPolicy="no-referrer"
													unoptimized={isVideo}
												/>
												{isVideo && (
													<>
														<div className="absolute inset-0 bg-black/20" />
														<div className="absolute inset-0 flex items-center justify-center">
															<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
																<svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-white">
																	<path d="M8 5v14l11-7z" />
																</svg>
															</div>
														</div>
													</>
												)}
											</button>
										)}
									</div>

									{/* Content */}
									<div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-4 lg:py-5 lg:pr-5 lg:pl-0">
										<div>
											<div className="mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
												<span className="flex h-6 sm:h-7 items-center gap-1 rounded-lg bg-[#E4E4E4] px-1.5 sm:px-2.5 text-[10px] sm:text-[13px] font-medium leading-5 text-[#4E4E4E]">
													{item.category || "Tin tức"}
												</span>
												<span className="flex h-6 sm:h-7 items-center gap-1 rounded-lg bg-[#E4E4E4] px-1.5 sm:px-2.5 text-[10px] sm:text-[13px] font-medium leading-5 text-[#4E4E4E]">
													{new Date(item.date).toLocaleDateString("vi-VN")}
												</span>
											</div>
											<h3 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 sm:text-base lg:text-lg">
												{item.title}
											</h3>
											<p className="line-clamp-2 text-[12px] leading-relaxed text-slate-500 sm:line-clamp-3 sm:text-[13px] lg:text-[15px]">
												{item.excerpt || item.description}
											</p>
										</div>

										{isVideo ? (
											<button
												type="button"
												onClick={() => setPlayingId(uid)}
												className="bg-stem-blue mt-3 w-full rounded-lg px-3 py-2 text-[10px] font-black text-white transition-opacity hover:opacity-90 sm:mt-4 sm:px-6 sm:py-2.5 sm:text-xs lg:w-fit lg:px-4 lg:py-1.5"
											>
												XEM VIDEO
											</button>
										) : (
											<Link href={`${detailBase}/${item.id}`} className="w-full lg:w-fit">
												<button
													type="button"
													className="bg-stem-blue mt-3 w-full rounded-lg px-3 py-2 text-[10px] font-black text-white transition-opacity hover:opacity-90 sm:mt-4 sm:px-6 sm:py-2.5 sm:text-xs lg:px-4 lg:py-1.5"
												>
													XEM CHI TIẾT
												</button>
											</Link>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* RIGHT: KHÓA HỌC */}
				<div className="w-full shrink-0 lg:w-72 xl:w-80">
					<h2 className="mb-6 text-2xl font-semibold lg:text-3xl">KHÓA HỌC</h2>
					<div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:space-y-4 lg:max-h-238 lg:overflow-y-auto lg:pr-1 lg:scrollbar-thin lg:scrollbar-track-transparent lg:scrollbar-thumb-slate-200">
						{courses.map((course: any, i: number) => {
							const color = COURSE_COLORS[i % COURSE_COLORS.length];
							return (
								<div key={course.id || i} className={`${color.bg} ${color.border} rounded-2xl border p-4 sm:p-5 flex flex-col justify-between`}>
									<div>
										<h3 className="mb-1 text-sm font-semibold sm:text-base">{course.name}</h3>
										{course.duration && (
											<p className="mb-3 text-[11px] leading-snug text-slate-500 sm:text-sm">
												Thời gian: {course.duration}
											</p>
										)}
										{!course.duration && course.description && (
											<p className="mb-3 line-clamp-2 text-[11px] leading-snug text-slate-500 sm:text-sm">
												{course.description}
											</p>
										)}
									</div>
									<Link href="/khoa-hoc/dang-ky">
										<button
											type="button"
											className={`${color.btn} w-full rounded-lg border px-3 py-1.5 text-[10px] font-bold transition-colors sm:w-fit sm:px-4 sm:text-xs`}
										>
											Đăng ký
										</button>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsListWithSidebar;
