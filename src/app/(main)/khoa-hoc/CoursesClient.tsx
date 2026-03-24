"use client";

import React from "react";
import { motion } from "motion/react";
import { IMAGES } from "../../../../public/statics/images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Course {
	id: number;
	title: string;
	image: string;
	description: string;
}

interface CoursesClientProps {
	initialCourses: Course[];
}

export default function CoursesClient({ initialCourses }: CoursesClientProps) {
	return (
		<div className="min-h-screen bg-white">
			{/* Header Banner */}
			<section className="relative h-[250px] overflow-hidden">
				<div className="absolute inset-0 bg-[linear-gradient(280.15deg,#1999D3_15.09%,#19B24B_93.34%)]" />

				<div className="relative z-10 mx-auto flex h-full max-w-360 flex-col items-center justify-center px-6 lg:flex-row lg:justify-between">
					<div className="text-center text-white lg:max-w-2xl lg:text-left">
						<motion.h1
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="mb-4 text-2xl leading-tight font-semibold tracking-tight md:text-3xl lg:text-4xl"
						>
							CÁC KHÓA HỌC TẠI STEMKey
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.1 }}
							className="text-sm font-normal md:text-base"
						>
							Cơ hội nhận học bổng lên tới 40% và các phần quà hấp dẫn khác đang chờ bạn
						</motion.p>
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className="relative mt-[51px] hidden h-full w-[550px] lg:block"
					>
						<div className="flex h-[90%] w-full items-end">
							<Image
								src={IMAGES.courser}
								alt="Happy Students"
								className="h-full w-full object-contain object-bottom"
								referrerPolicy="no-referrer"
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Courses Grid */}
			<section className="mx-auto max-w-360 px-4 py-20">
				<div className="grid grid-cols-2 gap-2 lg:gap-7.5 lg:grid-cols-4">
					{initialCourses.map((course, index) => (
						<motion.div
							key={course.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: (index % 3) * 0.1 }}
							className="flex flex-col rounded-xl bg-white overflow-hidden transition-all"
							style={{ boxShadow: "0px 1px 8px 0px #0000001A" }}
						>
							<div className="mb-3 h-30 lg:h-65 w-full shrink-0 overflow-hidden">
								<Image
									src={course.image}
									alt={course.title}
									width={400}
									height={220}
									className="size-full object-cover transition-transform duration-500 hover:scale-105"
									referrerPolicy="no-referrer"
								/>
							</div>

							<div className="flex flex-1 flex-col px-3 space-y-2">
								<h2 className="text-[18px] font-semibold tracking-tight">
									{course.title}
								</h2>
								<div className="h-12 flex-1">
									<p className="leading-relaxed line-clamp-2">{course.description}</p>
								</div>

								<Link href={`khoa-hoc/dang-ky`}>
									<Button size={"sm"} className="w-full text-xs lg:base text rounded-xl mb-3">
										Đăng ký khóa học
									</Button>
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</section>
		</div>
	);
}
