"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Facebook, Youtube, Phone, MessageCircle, Play } from "lucide-react";
import Image from "next/image";
import { SIDEBAR_SOCIALS } from "@/constants";
import Link from "next/link";
import type { Program } from "@/lib/types";

const IconMap: Record<string, any> = {
	facebook: Facebook,
	youtube: Youtube,
	"message-circle": MessageCircle,
	play: Play,
};

const VISIBLE_COUNT = 4;
const GAP_PX = 16; // space-y-4 = 1rem = 16px

interface CourserSidebarContentProps {
	programs: Program[];
}

export const CourserSidebarContent: React.FC<CourserSidebarContentProps> = ({ programs }) => {
	const [maxHeight, setMaxHeight] = useState<number | null>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	const calculateMaxHeight = useCallback(() => {
		if (cardRef.current && programs.length > VISIBLE_COUNT) {
			const cardHeight = cardRef.current.offsetHeight;
			// 3 cards + 2 gaps between them
			setMaxHeight(cardHeight * VISIBLE_COUNT + GAP_PX * (VISIBLE_COUNT - 1));
		} else {
			setMaxHeight(null);
		}
	}, [programs.length]);

	useEffect(() => {
		calculateMaxHeight();
		window.addEventListener("resize", calculateMaxHeight);
		return () => window.removeEventListener("resize", calculateMaxHeight);
	}, [calculateMaxHeight]);

	const needsScroll = programs.length > VISIBLE_COUNT && maxHeight !== null;

	return (
		<aside className="space-y-12">
			{/* Courses */}
			<div>
				<h4 className="mb-6 inline-block border-b-2 border-[#c41e3a] pb-2 text-xl font-bold text-slate-900">
					Các khóa học
				</h4>
				<div
					className={`space-y-4 ${needsScroll ? "overflow-y-auto pr-1" : ""}`}
					style={needsScroll ? { maxHeight: `${maxHeight}px` } : undefined}
				>
					{programs.map((program, i) => (
						<div
							key={program.id}
							ref={i === 0 ? cardRef : undefined}
							className="group relative aspect-4/3 h-40 w-full cursor-pointer overflow-hidden rounded-xl text-center"
						>
							<Link href="/khoa-hoc/dang-ky">
								<Image
									src={
										program.image_url ||
										"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400"
									}
									alt={program.name}
									width={400}
									height={300}
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									referrerPolicy="no-referrer"
								/>
								<div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
								<div className="absolute inset-0 flex items-center justify-center p-6">
									<h5 className="text-center text-xl leading-tight font-black text-white">
										{program.name}
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
						return social.href ? (
							<Link
								key={i}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="flex w-full items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-bold text-slate-800 transition-colors hover:"
							>
								{Icon && <Icon className={social.color} size={20} fill="currentColor" />}
								{social.name}
							</Link>
						) : (
							<button
								key={i}
								className="flex w-full items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-bold text-slate-800 transition-colors hover:"
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
						<button className="flex w-full items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-bold text-slate-800 transition-colors hover:">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
								<Phone size={16} fill="currentColor" />
							</div>
							Gọi điện: <span className="ml-auto text-red-600">091 255 1090</span>
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default React.memo(CourserSidebarContent);
