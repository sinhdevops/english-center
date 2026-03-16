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

				<div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 lg:flex-row lg:justify-between">
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
			<section className="mx-auto max-w-7xl px-4 py-[120px]">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{initialCourses.map((course, index) => (
						<motion.div
							key={course.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: (index % 3) * 0.1 }}
							className="flex flex-col rounded-3xl bg-white p-4 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.1)] transition-all hover:shadow-2xl"
						>
							<div className="mb-6 h-[240px] w-full shrink-0 overflow-hidden rounded-2xl">
								<Image
									src={course.image}
									alt={course.title}
									width={400}
									height={240}
									className="size-full object-cover transition-transform duration-500 hover:scale-105"
									referrerPolicy="no-referrer"
								/>
							</div>

							<div className="flex flex-1 flex-col px-2">
								<h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
									{course.title}
								</h2>
								<div className="mb-6 flex-1 text-slate-600">
									<p className="mb-4 text-base leading-relaxed">{course.description}</p>
								</div>

								<Link href={`khoa-hoc/dang-ky`}>
									<Button size={"sm"} className="w-full rounded-xl">
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
