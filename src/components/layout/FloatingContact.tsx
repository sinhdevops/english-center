"use client";

import React from "react";

const FloatingContact = () => {
	const handleZaloClick = () => {
		window.open("https://zalo.me/0965500306", "_blank");
	};

	return (
		<div className="fixed right-8 bottom-8 z-40 flex flex-col items-center gap-4">
			{/* "Free Book" Badge as seen in the image */}
			<button
				onClick={handleZaloClick}
				className="group hover:shadow-primary/40 animate-bounce-subtle relative flex h-32 w-28 flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#E11D48] p-2 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
			>
				{/* Stylized Book Decoration */}
				<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />

				<span className="mb-1 text-[10px] font-black tracking-tighter text-white uppercase">Nhận Sách</span>

				<div className="bg-opacity-90 relative mb-1 flex h-14 w-12 items-center justify-center rounded-lg bg-white shadow-inner">
					<div className="flex h-10 w-9 flex-col justify-center gap-0.5 px-1">
						<div className="h-0.5 w-full rounded-full bg-[#00A19D]" />
						<div className="h-0.5 w-full rounded-full bg-[#00A19D]" />
						<div className="mt-0.5 flex h-4 w-full items-center justify-center bg-[#00A19D]">
							<span className="text-[7px] leading-none font-bold text-white">MIỄN PHÍ</span>
						</div>
					</div>
					{/* Decorative Bookmark */}
					<div className="absolute right-2 -bottom-1 h-4 w-2 bg-[#2E3192]" />
				</div>

				<span className="text-[10px] font-black tracking-tighter text-white uppercase">Miễn Phí</span>

				{/* Dark background for the shadow effect in the original image */}
				<div className="absolute -right-1 -bottom-1 -z-10 h-full w-full rounded-2xl bg-[#2E3192] opacity-50 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
			</button>

			<style jsx global>{`
				@keyframes bounce-subtle {
					0%,
					100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-8px);
					}
				}
				.animate-bounce-subtle {
					animation: bounce-subtle 3s ease-in-out infinite;
				}
				@keyframes ping-slow {
					75%,
					100% {
						transform: scale(1.6);
						opacity: 0;
					}
				}
				.animate-ping-slow {
					animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
				}
			`}</style>
		</div>
	);
};

export default FloatingContact;
