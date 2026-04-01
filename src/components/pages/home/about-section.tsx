"use client";

import { motion } from "motion/react";
import React from "react";
import Image from "next/image";
import { HomeImages, IMAGES } from "../../../../public/statics/images";

const FEATURES = [
	"Làm quen môi trường học tập mới",
	"Có nền tảng vững trước khi vào lớp 1",
	"Không bỏ ngõ – không áp lực",
];

const AboutSection = () => {
	return (
		<section className="overflow-hidden bg-white">
			<div className="mx-auto max-w-7xl px-4 lg:px-0">
				<div className="flex flex-col items-center gap-6 lg:flex-row py-3">
					{/* Left — Text */}
					<div className="w-full lg:w-1/2">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="mb-6 text-2xl font-semibold lg:text-4xl"
						>
							VỀ STEMKey
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="mb-4 leading-relaxed text-slate-600"
						>
							STEMKey là hệ thống trung tâm phát triển tư duy sáng tạo &amp; phản biện cho các bé từ 3-16 tuổi, tập trung xây dựng{" "}
							<strong className="text-slate-900">tư duy – ngôn ngữ – kỹ năng</strong> học tập ngay từ gốc. Chúng tôi không chỉ dạy kiến thức, mà giúp trẻ hiểu – tự tin – chủ động học tập lâu dài.
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.15 }}
							className="mb-4 leading-relaxed text-slate-600"
						>
							Đặc biệt, chương trình Tiền tiểu học giúp trẻ:
						</motion.p>

						<motion.ul
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="space-y-2"
						>
							{FEATURES.map((item, i) => (
								<li key={i} className="flex items-center gap-2 text-slate-700">
									<span className="text-lg">👉</span>
									<span>{item}</span>
								</li>
							))}
						</motion.ul>
					</div>

					{/* Right — Robot mascot */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7 }}
						className="flex w-full items-center justify-center lg:w-1/2"
					>
						<div className="relative w-full aspect-588/276">
							<Image
								src={HomeImages.about}
								alt="Robot mascot STEMKey"
								fill
								className="object-contain"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
					</motion.div>

				</div>
			</div>
		</section>
	);
};

export default React.memo(AboutSection);
