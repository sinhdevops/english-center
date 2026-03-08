"use client";

import { motion } from "motion/react";
import React from "react";
import { EXCLUSIVE_MODEL_ITEMS } from "@/constants";
import Image from "next/image";

const ExclusiveModel = () => {
	return (
		<section className="bg-[#F8FAFC] py-24">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-16 text-center lg:mb-24">
					<h2 className="mb-6 text-3xl font-bold text-slate-900 lg:text-4xl">Mô hình lớp học độc quyền</h2>
					<p className="mx-auto max-w-4xl text-base leading-relaxed font-medium text-slate-500 lg:text-lg">
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
								className="group flex items-center gap-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md lg:p-5"
							>
								<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-[#1890FF]">
									{item.id}
								</div>
								<span className="text-base font-semibold text-slate-700 lg:text-lg">{item.text}</span>
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
								src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000"
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
