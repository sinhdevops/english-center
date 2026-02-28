"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { CourserSidebar } from "@/components/ui/courser-sidebar";

const Carousel: React.FC<{ onArticleSelect?: (article: any) => void }> = ({ onArticleSelect }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slides = [
		{
			title: "Tổng hợp bộ từ vựng tiếng Anh chuyên ngành Robotics cho học sinh",
			desc: "Giúp các con làm quen với những thuật ngữ kỹ thuật cơ bản bằng tiếng Anh, hỗ trợ đắc lực cho việc đọc tài liệu và thuyết trình dự án.",
			date: "22/02/2024",
			views: "1.2k lượt xem",
			img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Video hướng dẫn lắp ráp mô hình cánh tay robot đơn giản",
			desc: "Từng bước chi tiết để các con có thể tự thực hành tại nhà với bộ kit STEMKey, rèn luyện tính kiên trì và khéo léo.",
			date: "18/02/2024",
			views: "950 lượt xem",
			img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
		},
	];

	const next = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
	const prev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

	return (
		<div className="group relative mb-16">
			<div className="flex gap-6 overflow-hidden">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						className="grid w-full grid-cols-1 gap-8 md:grid-cols-2"
					>
						{[0, 1].map((offset) => {
							const slide = slides[(currentIndex + offset) % slides.length];
							return (
								<div
									key={offset}
									className="flex cursor-pointer flex-col"
									onClick={() => onArticleSelect?.(slide)}
								>
									<div className="mb-4 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
										<img
											src={slide.img}
											alt={slide.title}
											className="h-full w-full object-cover"
											referrerPolicy="no-referrer"
										/>
									</div>
									<h3 className="hover:text-stem-blue mb-2 line-clamp-2 cursor-pointer text-lg font-bold text-slate-900 transition-colors">
										{slide.title}
									</h3>
									<p className="mb-3 line-clamp-3 text-sm leading-relaxed text-slate-500">
										{slide.desc}
									</p>
									<div className="flex items-center gap-4 text-xs font-medium text-slate-400">
										<span>{slide.date}</span>
										<span>•</span>
										<span>{slide.views}</span>
									</div>
								</div>
							);
						})}
					</motion.div>
				</AnimatePresence>
			</div>

			<button
				onClick={prev}
				className="absolute top-1/3 -left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#c41e3a] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
			>
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={next}
				className="absolute top-1/3 -right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#c41e3a] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
			>
				<ChevronRight size={24} />
			</button>
		</div>
	);
};

const MaterialItem = ({ title, date, desc, img, onClick }: any) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		onClick={onClick}
		className="group mb-8 flex cursor-pointer flex-col gap-6 border-b border-slate-100 pb-8 last:border-0 md:flex-row"
	>
		<div className="w-full shrink-0 overflow-hidden rounded-xl md:w-1/3">
			<img
				src={img}
				alt={title}
				className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
				referrerPolicy="no-referrer"
			/>
		</div>
		<div className="flex-grow">
			<div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
				<Calendar size={14} />
				<span>{date}</span>
			</div>
			<h3 className="group-hover:text-stem-blue mb-3 text-xl leading-tight font-bold text-slate-900 transition-colors">
				{title}
			</h3>
			<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">{desc}</p>
			<button className="text-stem-blue flex items-center gap-1 text-sm font-bold hover:underline">
				Tải tài liệu <ChevronRight size={14} />
			</button>
		</div>
	</motion.div>
);

export default function LearningCornerPage({ onArticleSelect }: any) {
	const materials = [
		{
			title: "Hướng dẫn lập trình Scratch cơ bản cho người mới bắt đầu",
			date: "20 Tháng 2, 2024",
			desc: "Scratch là ngôn ngữ lập trình kéo thả tuyệt vời để trẻ làm quen với tư duy thuật toán. Bài viết này sẽ hướng dẫn con tạo ra trò chơi đầu tiên của mình.",
			img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Bộ thẻ Flashcard: 50 Động từ tiếng Anh về chủ đề Khoa học",
			date: "15 Tháng 2, 2024",
			desc: "Tải ngay bộ Flashcard sinh động giúp con ghi nhớ từ vựng tiếng Anh một cách nhanh chóng và hiệu quả qua hình ảnh minh họa.",
			img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Thử thách tuần này: Chế tạo xe đua phản lực từ bong bóng",
			date: "10 Tháng 2, 2024",
			desc: "Một dự án STEM thực tế giúp con hiểu về định luật III Newton và lực đẩy. Cùng chuẩn bị nguyên liệu và bắt đầu thôi!",
			img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
		},
	];

	return (
		<div className="min-h-screen bg-white">
			<div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
				<Carousel onArticleSelect={onArticleSelect} />
				<div className="flex flex-col gap-16 lg:flex-row">
					<div className="w-full lg:w-2/3">
						<h1 className="mb-10 flex items-center gap-3 text-3xl font-black text-slate-900">
							<TrendingUp className="text-stem-blue" /> Góc học tập
						</h1>
						<div className="space-y-4">
							{materials.map((item, idx) => (
								<MaterialItem key={idx} {...item} onClick={() => onArticleSelect?.(item)} />
							))}
						</div>

						{/* Pagination */}
						<div className="mt-12 flex items-center justify-center gap-2">
							{[1, 2, 3, "..."].map((p, i) => (
								<button
									key={i}
									className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
										p === 1
											? "bg-stem-blue text-white"
											: "bg-slate-50 text-slate-600 hover:bg-slate-100"
									}`}
								>
									{p}
								</button>
							))}
							<button className="h-10 rounded-lg bg-slate-50 px-4 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100">
								Tiếp theo
							</button>
						</div>
					</div>
					<div className="w-full lg:w-1/3">
						<CourserSidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
