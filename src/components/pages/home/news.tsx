"use client";

import { motion } from "motion/react";
import React from "react";
import { NEWS_DATA } from "@/constants";
import Image from "next/image";

const News = () => {
	return (
		<section className="bg-white py-24">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-12 lg:mb-16">
					<h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
						Loạt sự kiện HOT - đừng vội lướt qua!
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
					{NEWS_DATA.map((post, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="group flex cursor-pointer flex-col"
						>
							<div className="mb-6 aspect-16/10 overflow-hidden rounded-xl shadow-lg">
								<Image
									src={post.img}
									alt={post.title}
									width={800}
									height={500}
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									referrerPolicy="no-referrer"
								/>
							</div>
							<h3 className="group-hover:text-stem-blue text-sm leading-tight text-slate-900 transition-colors lg:text-[18px]">
								{post.title}
							</h3>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default React.memo(News);
