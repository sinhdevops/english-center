"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HomeImages } from "../../../../public/statics/images";
import { HERO_TARGETS } from "@/constants";
import React from "react";

const Hero = () => {
	return (
		<section className="relative flex min-h-[600px] overflow-hidden lg:min-h-[750px]">
			{/* Tech/Circuit Background Pattern */}
			<div className="pointer-events-none absolute inset-0 z-10 opacity-10">
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

			{/* Background Gradient - Green */}
			<div
				className="absolute inset-0 z-0"
				style={{ background: "linear-gradient(272.97deg, #00BA3D 22.93%, #005C1E 89.95%)" }}
			/>

			<div className="relative z-20 flex w-full flex-col items-center gap-12 px-4 py-12 lg:flex-row lg:px-[120px]">
				<div className="w-full text-center lg:w-3/4 lg:text-left">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="font-cursive mb-2 text-3xl text-white lg:mb-4 lg:text-5xl"
						>
							Phát triển toàn diện
						</motion.p>

						<h2 className="font-azuki mb-8 text-3xl leading-tight tracking-wide text-white uppercase sm:text-4xl lg:mb-10 lg:text-6xl">
							Tư duy – Ngôn ngữ – Công nghệ
						</h2>

						<div className="mb-10 inline-block space-y-4 text-left lg:mb-12">
							{HERO_TARGETS.map((text, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 + i * 0.1 }}
									className="flex items-center gap-3 text-base font-medium text-white/90 lg:text-lg"
								>
									<CheckCircle2 size={20} className="shrink-0 text-white" />
									<span>{text}</span>
								</motion.div>
							))}
						</div>

						<div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
							<Button
								size="lg"
								variant="primary"
								className="w-full rounded-full px-10 py-6 text-base font-bold tracking-wider uppercase sm:w-auto"
							>
								Đăng ký học thử miễn phí
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="w-full rounded-full border-2 bg-white/20 px-10 py-6 text-base tracking-wider uppercase hover:bg-white/30 sm:w-auto"
							>
								Tư vấn lộ trình học
							</Button>
						</div>
					</motion.div>
				</div>

				<div className="absolute right-0 bottom-0 z-10 hidden w-[60vw] lg:block">
					<Image
						src={HomeImages.heroStudent}
						alt="Học sinh STEMKey"
						className="h-auto w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
						referrerPolicy="no-referrer"
						priority
					/>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Hero);
