"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronLeft, ChevronRight, Search, TrendingUp } from "lucide-react";
import { CourserSidebar } from "@/components/ui/courser-sidebar";
import Link from "next/link";

const Breadcrumbs = () => (
	<div className="border-b border-slate-100 bg-slate-50 py-4">
		<div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-sm text-slate-500">
			<span className="hover:text-stem-blue cursor-pointer">Trang chủ</span>
			<ChevronRight size={14} />
			<span className="font-medium text-slate-900">Tin tức</span>
		</div>
	</div>
);

const NewsCarousel: React.FC<{ onArticleSelect?: (article: any) => void }> = ({ onArticleSelect }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slides = [
		{
			title: "STEMKey Robotics Championship 2024: Sân chơi sáng tạo cho các kỹ sư nhí",
			desc: "Cuộc thi Robotics thường niên tại STEMKey đã chính thức khởi động, thu hút hàng trăm thí sinh tham gia tranh tài với những dự án robot sáng tạo và đầy tính ứng dụng.",
			date: "15/11/2025",
			views: "520 lượt xem",
			img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Khám phá mô hình giáo dục STEM chuẩn quốc tế tại STEMKey Nam An Khánh",
			desc: "Với cơ sở vật chất hiện đại và đội ngũ giáo viên giàu kinh nghiệm, STEMKey tự hào mang đến môi trường học tập lý tưởng cho trẻ phát triển toàn diện các kỹ năng 4C.",
			date: "12/11/2025",
			views: "340 lượt xem",
			img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Học tiếng Anh qua dự án: Khi ngôn ngữ là công cụ khám phá khoa học",
			desc: "Chương trình STEM English tại STEMKey giúp trẻ không chỉ giỏi ngoại ngữ mà còn tự tin thuyết trình về các dự án khoa học, kỹ thuật bằng tiếng Anh.",
			date: "08/11/2025",
			views: "215 lượt xem",
			img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
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
								<Link
									href={`/tin-tuc/${slide.title}`}
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
								</Link>
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

interface NewsItemProps {
	title: string;
	date: string;
	desc: string;
	img: string;
	onClick: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, date, desc, img, onClick }) => (
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

export default function NewsPage({ onArticleSelect }: { onArticleSelect?: (article: any) => void }) {
	const newsList = [
		{
			title: "STEMKey chính thức khai trương cơ sở mới tại Nam An Khánh",
			date: "26 Tháng 2, 2024",
			desc: "Với mong muốn mang giáo dục STEM đến gần hơn với trẻ em Việt Nam, STEMKey tự hào ra mắt cơ sở mới với không gian học tập sáng tạo, trang thiết bị hiện đại bậc nhất.",
			img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Workshop: Chế tạo Robot từ vật liệu tái chế cùng STEMKey",
			date: "22 Tháng 2, 2024",
			desc: "Sự kiện cuối tuần thu hút đông đảo phụ huynh và học sinh tham gia, nơi các con được tự tay thiết kế những mô hình robot độc đáo từ những vật dụng quen thuộc hàng ngày.",
			img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Bí quyết giúp trẻ yêu thích môn Toán qua phương pháp STEM",
			date: "18 Tháng 2, 2024",
			desc: "Thay vì những con số khô khan, STEMKey giúp trẻ tiếp cận môn Toán thông qua các trò chơi logic và ứng dụng thực tế, giúp con phát triển tư duy toán học một cách tự nhiên.",
			img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "STEMKey đồng hành cùng phụ huynh định hướng nghề nghiệp tương lai",
			date: "15 Tháng 2, 2024",
			desc: "Buổi tọa đàm chuyên sâu về tầm quan trọng của kỹ năng công nghệ và tư duy sáng tạo trong kỷ nguyên số, giúp ba mẹ có cái nhìn rõ nét hơn về lộ trình phát triển của con.",
			img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
		},
	];

	return (
		<div className="min-h-screen bg-white">
			<div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
				<NewsCarousel onArticleSelect={onArticleSelect} />

				<div className="flex flex-col gap-16 lg:flex-row">
					{/* Main Content */}

					<div className="w-full lg:w-2/3">
						<h1 className="mb-10 flex items-center gap-3 text-3xl font-black text-slate-900">
							<TrendingUp className="text-stem-blue" />
							Tin tức mới nhất
						</h1>

						<div className="space-y-4">
							{newsList.map((news, idx) => (
								<NewsItem
									key={idx}
									title={news.title}
									date={news.date}
									desc={news.desc}
									img={news.img}
									onClick={() => onArticleSelect?.(news)}
								/>
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

					{/* Sidebar */}
					<div className="w-full lg:w-1/3">
						<CourserSidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
