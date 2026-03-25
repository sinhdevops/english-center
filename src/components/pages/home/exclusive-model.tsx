"use client";

import { motion } from "motion/react";
import React from "react";
import { EXCLUSIVE_MODEL_ITEMS } from "@/constants";
import { BookOpen, Users, Zap, CheckCircle, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
	BookOpen,
	Users,
	Zap,
	CheckCircle,
};

const ExclusiveModel = () => {
	return (
		<section className="bg-[#EFEFEF] py-20">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-3 text-3xl font-bold lg:text-4xl">Mô hình lớp học độc quyền</h2>
					<p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-500 lg:text-base">
						Lớp học đảo ngược thúc đẩy khả năng tự học, tính chủ động và tích cực trong học tập ở học trò,
						các con không phụ thuộc, chờ thầy cô đưa kiến thức.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{EXCLUSIVE_MODEL_ITEMS.map((item, i) => {
						const Icon = ICON_MAP[item.icon];
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-8 text-center"
							>
								<div className={`mb-5 flex size-14 items-center justify-center rounded-2xl ${item.iconBg}`}>
									{Icon && <Icon className="size-7 text-white" strokeWidth={1.8} />}
								</div>
								
								<h3 className="mb-3 text-lg font-bold text-slate-900">{item.title}</h3>
								<p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default React.memo(ExclusiveModel);
