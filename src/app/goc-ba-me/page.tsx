"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { CourserSidebar } from "@/components/ui/courser-sidebar";

const Breadcrumbs = () => (
	<div className="border-b border-slate-100 bg-slate-50 py-4">
		<div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-sm text-slate-500">
			<span className="hover:text-stem-blue cursor-pointer">Trang chủ</span>
			<ChevronRight size={14} />
			<span className="font-medium text-slate-900">Góc ba mẹ</span>
		</div>
	</div>
);

const Carousel: React.FC<{ onArticleSelect?: (article: any) => void }> = ({ onArticleSelect }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slides = [
		{
			title: "Làm thế nào để khơi gợi niềm đam mê khoa học cho trẻ ngay tại nhà?",
			desc: "Chia sẻ những bí quyết đơn giản giúp ba mẹ biến những hoạt động hàng ngày thành những bài học khoa học thú vị, giúp trẻ luôn tò mò và ham học hỏi.",
			date: "25/02/2024",
			views: "850 lượt xem",
			img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Kỷ nguyên số: Ba mẹ nên cho con tiếp cận công nghệ từ khi nào?",
			desc: "Chuyên gia STEMKey phân tích về độ tuổi và cách thức cho trẻ tiếp cận với các thiết bị điện tử một cách lành mạnh và hiệu quả nhất.",
			date: "20/02/2024",
			views: "620 lượt xem",
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

const ArticleItem = ({ title, date, desc, img, onClick }: any) => (
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
				Xem thêm <ChevronRight size={14} />
			</button>
		</div>
	</motion.div>
);

export default function ParentsCornerPage({ onArticleSelect }: { onArticleSelect?: (article: any) => void }) {
	const articles = [
		{
			title: "5 Trò chơi STEM đơn giản giúp trẻ phát triển tư duy logic",
			date: "24 Tháng 2, 2024",
			desc: "Không cần những bộ kit đắt tiền, ba mẹ có thể cùng con thực hiện những thí nghiệm vui nhộn ngay tại phòng khách với những vật dụng có sẵn.",
			img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Cách khích lệ trẻ khi gặp thất bại trong các dự án sáng tạo",
			date: "20 Tháng 2, 2024",
			desc: "Thất bại là một phần tất yếu của quá trình học tập STEM. Ba mẹ nên phản ứng thế nào để con không nản lòng và tiếp tục kiên trì với ý tưởng của mình?",
			img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Tầm quan trọng của việc đọc sách khoa học cho trẻ mầm non",
			date: "15 Tháng 2, 2024",
			desc: "Xây dựng thói quen đọc sách không chỉ giúp con phát triển ngôn ngữ mà còn mở ra cánh cửa tri thức về thế giới tự nhiên đầy kỳ thú.",
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
							<TrendingUp className="text-stem-blue" /> Góc ba mẹ
						</h1>
						<div className="space-y-4">
							{articles.map((item, idx) => (
								<ArticleItem key={idx} {...item} onClick={() => onArticleSelect?.(item)} />
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
