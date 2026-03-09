"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_TARGETS } from "@/constants";
import React from "react";
const Hero = () => {
	return (
		<section className="relative flex min-h-[600px] overflow-hidden lg:min-h-[640px]">
			{/* Tech/Circuit Background Pattern */}
			<div className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] lg:opacity-10">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 1000 1000"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					<path
						d="M0 100 L100 100 L150 150 L300 150 M400 50 L450 100 L600 100 M700 200 L800 200 L850 250 M100 400 L200 400 L250 350 M500 600 L600 600 L650 650 M800 800 L900 800 L950 750"
						fill="none"
						stroke="white"
						strokeWidth="1"
						strokeDasharray="5,5"
					/>
				</svg>
			</div>

			{/* Background Layers */}
			<div className="absolute inset-0 z-0 bg-[url('/statics/images/home/herobgmb.webp')] bg-cover bg-center bg-no-repeat lg:bg-[url('/statics/images/home/herobg.webp')]" />

			{/* Decorative Blobs for Mobile Depth */}
			<div className="lg:hidden">
				<motion.div
					animate={{
						y: [0, -20, 0],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
					className="absolute -top-10 -left-10 z-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
				/>
				<motion.div
					animate={{
						y: [0, 20, 0],
						opacity: [0.1, 0.3, 0.1],
					}}
					transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
					className="absolute -right-20 bottom-20 z-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"
				/>
			</div>

			<div className="relative z-20 flex w-full flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:px-[120px] lg:py-12">
				<div className="text-center lg:w-[50vw] lg:text-left">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className="mb-[52px]">
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="font-italianno text-4xl text-white drop-shadow-sm lg:text-5xl"
							>
								Phát triển toàn diện
							</motion.p>

							<h2 className="font-utm-azuki mb-8 text-3xl leading-[1.1] tracking-wide text-white uppercase sm:text-4xl lg:mb-10 lg:text-6xl">
								Tư duy – Ngôn ngữ <br className="sm:hidden" />– Công nghệ
							</h2>
						</div>

						<div className="mb-10 inline-flex flex-col text-left lg:mb-[52px]">
							{HERO_TARGETS.map((text, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 + i * 0.1 }}
									className="flex items-center gap-3 text-base leading-[26px] text-white/90 lg:text-lg"
								>
									✦ <span>{text}</span>
								</motion.div>
							))}
						</div>

						<div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
							<Button
								size="lg"
								variant="primary"
								className="w-full rounded-full text-base font-bold tracking-wider uppercase shadow-xl transition-all active:scale-95 sm:w-auto"
							>
								Đăng ký học thử miễn phí
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="w-full rounded-full border-2 border-white/30 bg-white/10 text-base tracking-wider text-white uppercase backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 sm:w-auto"
							>
								Tư vấn lộ trình học
							</Button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Hero);
