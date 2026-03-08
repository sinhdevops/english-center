"use client";

import { motion } from "motion/react";
import { Sparkles, Minus } from "lucide-react";
import { FLEXIBLE_BENEFITS } from "@/constants";
import React, { useState } from "react";
import Image from "next/image";
import { HomeImages } from "../../../../public/statics/images";

const FlexibleLearning = () => {
	const [openIndex, setOpenIndex] = useState(0);

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex flex-col items-start gap-16 lg:flex-row">
					{/* Left: Images */}
					<div className="w-full lg:w-1/2">
						<div className="mb-10 text-center lg:text-left">
							<h2 className="mb-2 text-2xl font-medium lg:text-4xl">
								Học linh hoạt giữa Online và Offline
							</h2>
							<p className="text-lg font-medium text-slate-500">
								Tham gia Lớp học Offline và Online tại STEMKey bạn sẽ được:
							</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								className="relative h-[400px] overflow-hidden rounded-xl shadow-lg lg:h-[500px]"
							>
								<Image
									src={HomeImages.image5}
									alt="Học sinh tham gia lớp học Online"
									fill
									sizes="(max-width: 768px) 50vw, 25vw"
									className="object-cover"
									referrerPolicy="no-referrer"
								/>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
								className="relative mt-8 h-[400px] overflow-hidden rounded-3xl shadow-lg lg:h-[500px]"
							>
								<Image
									src={HomeImages.image6}
									alt="Học sinh tham gia lớp học Offline"
									fill
									sizes="(max-width: 768px) 50vw, 25vw"
									className="object-cover"
									referrerPolicy="no-referrer"
								/>
							</motion.div>
						</div>
					</div>

					{/* Right: Content & Accordion */}
					<div className="w-full lg:w-1/2">
						<div className="space-y-4">
							{FLEXIBLE_BENEFITS.map((benefit, i) => (
								<div
									key={i}
									className={`overflow-hidden rounded-2xl border transition-all duration-300 ${openIndex === i ? "border-blue-500 bg-blue-50/50" : "border-slate-100 bg-white"
										}`}
								>
									<button
										onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
										aria-expanded={openIndex === i}
										aria-controls={`benefit-content-${i}`}
										className="flex w-full items-center justify-between p-5 text-left"
									>
										<div className="flex items-center gap-4">
											<div
												className={`rounded-lg p-2 ${openIndex === i ? "bg-blue-500 text-white" : "bg-slate-50 text-slate-400"}`}
											>
												<Sparkles size={20} />
											</div>
											<span
												className={`text-base font-bold lg:text-lg ${openIndex === i ? "text-slate-900" : "text-slate-600"}`}
											>
												{benefit.title}
											</span>
										</div>
										<div
											className={`transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
										>
											{openIndex === i ? (
												<motion.span className="flex items-center justify-center text-2xl">
													{" "}
													<Minus />
												</motion.span>
											) : (
												<motion.span className="flex items-center justify-center text-2xl">
													+
												</motion.span>
											)}
										</div>
									</button>

									<motion.div
										id={`benefit-content-${i}`}
										role="region"
										aria-labelledby={`benefit-header-${i}`}
										initial={false}
										animate={{
											height: openIndex === i ? "auto" : 0,
											opacity: openIndex === i ? 1 : 0,
										}}
										className="overflow-hidden"
									>
										<div className="p-5 pt-0 pl-[68px] text-sm leading-relaxed font-medium text-slate-500 lg:text-base">
											{benefit.content}
										</div>
									</motion.div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(FlexibleLearning);
