"use client";

import React from "react";
import { IMAGES } from "../../../../public/statics/images";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Course {
	id: number;
	stt: number;
	title: string;
	description: string;
	duration: string;
	schedule: string;
}

interface CoursesClientProps {
	initialCourses: Course[];
}

export default function CoursesClient({ initialCourses }: CoursesClientProps) {
	return (
		<div className="min-h-screen" style={{ background: "linear-gradient(180deg, #15B248 0%, rgba(71, 255, 131, 0.5) 50%, rgba(21, 178, 72, 0) 100%)" }}>
			{/* Section 1 — Chương trình học banner */}
			<section className="w-full">
				<Image
					src={IMAGES.courser1}
					alt="Chương trình học STEMKey"
					className="w-full object-contain"
					priority
				/>
			</section>

			{/* Section 2 — Bảng khóa học từ API */}
			<section className="mx-auto max-w-5xl px-4 py-12">
				<h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-wide text-gray-900">
					TOÁN TƯ DUY, TIẾNG ANH STEM, ROBOTICS, TIỀN TIỂU HỌC
				</h2>

				{/* Mobile — cards */}
				<div className="grid grid-cols-2 gap-3 md:hidden">
					{initialCourses.length === 0 && (
						<p className="py-10 text-center text-gray-400">Chưa có khóa học nào.</p>
					)}
					{initialCourses.map((course) => (
						<div key={course.id} className="rounded-2xl border border-gray-200 bg-white p-4">
							<div className="mb-3 flex items-center gap-3">
								<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
									{course.stt}
								</span>
								<h3 className="font-bold text-gray-900">{course.title}</h3>
							</div>
							<p className="mb-1 line-clamp-2 text-sm text-gray-500">{course.description}</p>
							<div className="mb-4 flex flex-col gap-1 text-sm text-gray-500">
								<span>⏱ {course.duration}</span>
								<span>📅 {course.schedule}</span>
							</div>
							<Link href="khoa-hoc/dang-ky">
								<Button size="sm" className="w-full rounded-xl">Đăng ký ngay</Button>
							</Link>
						</div>
					))}
				</div>

				{/* Desktop — table */}
				<div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-100">
								<th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">STT</th>
								<th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Tên Khóa Học</th>
								<th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Chi Tiết</th>
								<th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Thời Gian</th>
								<th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Suất Học</th>
								<th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Đăng Ký</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{initialCourses.map((course) => (
								<tr key={course.id} className="bg-white transition-colors hover:bg-gray-50">
									<td className="px-5 py-5 text-gray-500">{course.stt}</td>
									<td className="px-5 py-5 font-semibold text-gray-900">{course.title}</td>
									<td className="max-w-60 px-5 py-5 text-gray-500">
										<p className="line-clamp-2">{course.description}</p>
									</td>
									<td className="px-5 py-5 text-gray-500">{course.duration}</td>
									<td className="px-5 py-5 text-gray-500">{course.schedule}</td>
									<td className="px-5 py-5">
										<Link href="khoa-hoc/dang-ky">
											<Button variant="outline" size="sm">Đăng ký</Button>
										</Link>
									</td>
								</tr>
							))}
							{initialCourses.length === 0 && (
								<tr>
									<td colSpan={6} className="px-4 py-10 text-center text-gray-400">
										Chưa có khóa học nào.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</section>

			{/* Section 3 — Cam kết chuẩn đầu ra */}
			<section className="w-full">
				<Image
					src={IMAGES.courser2}
					alt="Cam kết chuẩn đầu ra theo từng trình độ"
					className="w-full object-contain"
				/>
			</section>
		</div>
	);
}
