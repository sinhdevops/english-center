"use client";

import React from "react";
import { motion } from "motion/react";
import { IMAGES } from "../../../../public/statics/images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import CardRegistration from "@/components/pages/shared/card-registration";

interface Course {
	id: number;
	title: string;
	image: string;
	description: string;
	bullets: string[];
	footer: string;
}

export default function CoursesPage() {
	const [courses, setCourses] = React.useState<Course[]>([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const fetchPrograms = async () => {
			setIsLoading(true);
			try {
				const { data, error } = await supabase
					.from("programs")
					.select("*")
					.order("created_at", { ascending: true });
				if (error) throw error;

				// Map Supabase Program to Course UI interface
				const mappedCourses: Course[] = (data || []).map((p) => ({
					id: p.id as any,
					title: p.name,
					image: p.image_url || "https://picsum.photos/seed/student1/600/450",
					description: p.description || "Lộ trình khóa học tại STEMKey",
					bullets: ["Khóa học chuẩn STEM", "Phương pháp R.I.P.L"],
					footer: "Phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ.",
				}));
				setCourses(mappedCourses);
			} catch (error) {
				console.error("Error fetching programs:", error);
				// Fallback to minimal mock if needed
			} finally {
				setIsLoading(false);
			}
		};
		fetchPrograms();
	}, []);

	return (
		<div className="min-h-screen bg-white">
			{/* Header Banner */}
			<section className="relative h-[250px] overflow-hidden">
				{/* Background Gradient - Matching the image's soft pastel feel */}
				<div className="absolute inset-0 bg-[linear-gradient(280.15deg,#CFD8FF_15.09%,#A0FF98_93.34%)] via-[#dbeafe] to-[#ede9fe]" />

				<div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 lg:flex-row lg:justify-between">
					<div className="text-center lg:max-w-2xl lg:text-left">
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

					{/* Banner Image - Happy kids with floating elements */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className="relative mt-[25px] hidden h-full w-[550px] lg:block"
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
			{/* <div className="mx-auto max-w-7xl">
				<CardRegistration />
			</div> */}
			{/* Courses Grid */}
			<section className="mx-auto max-w-7xl py-[120px]">
				<div className="grid grid-cols-1 gap-x-20 gap-y-24 lg:grid-cols-2">
					{isLoading ? (
						<div className="col-span-full flex justify-center py-20">
							<div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
						</div>
					) : (
						courses.map((course, index) => (
							<motion.div
								key={course.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: (index % 2) * 0.1 }}
								className="flex flex-col items-center gap-8 overflow-hidden rounded-xl md:h-[238px] md:flex-row md:items-start md:gap-[30px]"
							>
								{/* Course Image - Large rounded corners as in image */}
								<div className="h-[238px] w-[300px] shrink-0 md:w-[175px]">
									<Image
										src={course.image}
										alt={course.title}
										width={300}
										height={238}
										className="size-full rounded-2xl border border-slate-50 object-cover shadow-sm md:rounded-none"
										referrerPolicy="no-referrer"
									/>
								</div>

								{/* Course Content */}
								<div className="flex-1 px-4 text-center md:px-0 md:text-left">
									<h2 className="mb-3 text-[22px] font-semibold tracking-wide lg:text-[24px]">
										{course.title}
									</h2>
									<p className="mb-3 text-sm text-[#3D3D3D] lg:text-base">{course.description}</p>
									<ul className="mb-4 inline-block list-disc pl-6 text-left text-sm text-[#3D3D3D] md:block lg:text-base">
										{course.bullets.map((bullet, i) => (
											<li key={i}>{bullet}</li>
										))}
									</ul>
									<p className="mb-6 text-sm leading-relaxed text-[#3D3D3D] lg:text-base">
										{course.footer}
									</p>
									<Link href={`khoa-hoc/dang-ky`}>
										<Button
											size="sm"
											className="w-full rounded-full bg-[#1d9bf0] py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#1a8cd8] active:scale-95 md:w-auto md:px-12"
										>
											Đăng ký khóa học ngay
										</Button>
									</Link>
								</div>
							</motion.div>
						))
					)}
				</div>
			</section>
		</div>
	);
}
