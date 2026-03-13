"use client";

import React from "react";
import { Facebook, Youtube, Phone, MessageCircle, Play } from "lucide-react";
import Image from "next/image";
import { SIDEBAR_COURSES, SIDEBAR_SOCIALS } from "@/constants";
import Link from "next/link";

const IconMap: Record<string, any> = {
	facebook: Facebook,
	youtube: Youtube,
	"message-circle": MessageCircle,
	play: Play,
};

export const CourserSidebar: React.FC = () => (
	<aside className="space-y-12">
		{/* Courses */}
		<div>
			<h4 className="mb-6 inline-block border-b-2 border-[#c41e3a] pb-2 text-xl font-bold text-slate-900">
				Các khóa học
			</h4>
			<div className="space-y-4">
				{SIDEBAR_COURSES.map((course, i) => (
					<div
						key={i}
						className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-xl text-center shadow-md"
					>
						<Link href="/khoa-hoc/dang-ky">
							<Image
								src={course.img}
								alt={course.title}
								width={400}
								height={300}
								className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								referrerPolicy="no-referrer"
							/>
							<div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
							<div className="absolute inset-0 flex items-center justify-center p-6">
								<h5 className="text-center text-xl leading-tight font-black text-white drop-shadow-lg">
									{course.title}
								</h5>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
		{/* Social Media */}
		<div>
			<h4 className="mb-6 inline-block border-b-2 border-[#c41e3a] pb-2 text-xl font-bold text-slate-900">
				Mạng xã hội
			</h4>
			<div className="relative space-y-3 overflow-hidden rounded-xl bg-linear-to-br from-[#f27121] to-[#e94057] p-6">
				{/* Decorative dots */}
				<div className="absolute top-2 left-2 h-1 w-1 rounded-full bg-white/40" />
				<div className="absolute right-4 bottom-4 h-2 w-2 rounded-full bg-white/40" />

				{SIDEBAR_SOCIALS.map((social, i) => {
					const Icon = IconMap[social.icon];
					return (
						<button
							key={i}
							className="flex w-full items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
						>
							{Icon && <Icon className={social.color} size={20} fill="currentColor" />}
							{social.name}
						</button>
					);
				})}

				<div className="pt-4 text-left">
					<p className="mb-3 text-xs font-bold tracking-wider text-white uppercase opacity-90">
						Liên lạc trực tiếp
					</p>
					<button className="flex w-full items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
							<Phone size={16} fill="currentColor" />
						</div>
						Gọi điện: <span className="ml-auto text-red-600">0965500306</span>
					</button>
				</div>
			</div>
		</div>
	</aside>
);

export default React.memo(CourserSidebar);
