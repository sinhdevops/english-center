"use client";

import { motion } from "motion/react";
import React from "react";
import { EXCLUSIVE_MODEL_ITEMS } from "@/constants";
import Image from "next/image";
import { IMAGES } from "../../../../public/statics/images";

const ExclusiveModel = () => {
	return (
		<section className="bg-[#F8FAFC] py-[120px]">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-10 text-center">
					<h2 className="text-3xl font-bold lg:text-4xl">Mô hình lớp học độc quyền</h2>
					<p className="mx-auto max-w-4xl leading-relaxed text-slate-600">
						Lớp học đảo ngược thúc đẩy khả năng tự học, tính chủ động và tích cực trong học tập ở học trò,
						các con không phụ thuộc, chờ thầy cô đưa kiến thức.
					</p>
				</div>

				<div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
					<div className="flex w-full flex-col space-y-4 lg:w-1/2">
						{EXCLUSIVE_MODEL_ITEMS.map((item, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="group flex items-center gap-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
							>
								<div className="text-stem-blue flex size-[46px] shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-semibold">
									{item.id}
								</div>
								<span className="text-base font-normal">{item.text}</span>
							</motion.div>
						))}
					</div>

					<div className="relative w-full lg:w-1/2">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className="relative overflow-hidden rounded-xl shadow-2xl"
						>
							<Image
								src={IMAGES.classImg}
								alt="Mô hình lớp học STEMKey thực tế"
								width={1000}
								height={750}
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="aspect-4/3 h-auto w-full object-cover lg:aspect-auto"
								referrerPolicy="no-referrer"
							/>

							{/* Floating Info Badge */}
							<div className="absolute bottom-6 left-6">
								<div className="min-w-[200px] rounded-2xl border border-slate-100 bg-white px-4 pt-[10px] pb-2 shadow-2xl">
									<h4 className="mb-1 text-sm font-bold text-slate-500 lg:text-base">
										Mô hình lớp học
									</h4>
									<div className="text-2xl font-medium tracking-wider lg:text-4xl">4 - 3 - 1 - 6</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(ExclusiveModel);
