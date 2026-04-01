"use client";

import { Facebook, Twitter, Link as LinkIcon, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { CourserSidebarContent } from "@/components/ui/courser-sidebar-content";
import type { Program } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeaderPage from "@/components/common/HeaderPage";
import Link from "next/link";

interface ContentDetailPageProps {
	article?: {
		title: string;
		date: string;
		category?: string;
		img?: string;
		image_url?: string;
		desc?: string;
		excerpt?: string;
		description?: string;
		content?: string;
	};
	onBack?: () => void;
	typeLabel?: string;
	relatedArticles?: any[];
	programs?: Program[];
}

export default function ContentDetailPage({
	article,
	onBack,
	typeLabel = "bài viết",
	relatedArticles = [],
	programs = [],
}: ContentDetailPageProps) {
	const router = useRouter();

	// Map API fields to local variables
	const title = article?.title || "STEMKey chính thức khai trương cơ sở mới";
	const category = article?.category || "Tin tức";
	const date = article?.date || "26 Tháng 2, 2024";
	const img =
		article?.image_url ||
		article?.img ||
		"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200";
	const description =
		article?.excerpt ||
		article?.description ||
		article?.desc ||
		"Cùng STEMKey khám phá những tin tức và chia sẻ mới nhất về giáo dục.";
	const htmlContent = article?.content?.replace(/<br\s*\/?>/gi, "")?.replace(/\n/g, "");

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			router.back();
		}
	};

	const cleanQuillHtml = (html: any) => {
		if (!html) return "";
		return html
			.replace(/&nbsp;/g, " ") // thay &nbsp; → space thường
			.replace(/\s+/g, " ") // gộp multiple spaces (nếu có) thành 1
			.trim(); // loại bỏ space thừa đầu/cuối
	};

	const detailBase =
		category === "Góc học tập" ? "/goc-hoc-tap" : category === "Góc ba mẹ" ? "/goc-ba-me" : "/tin-tuc";

	return (
		<div className="min-h-screen bg-white">
			{/* Page Banner */}
			<HeaderPage title={"Tin tức chi tiết"} />

			<div className="mx-auto max-w-7xl px-4 py-20 lg:px-0 lg:py-25">
				<div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
					{/* Main Article Content */}
					<div className="w-full min-w-0 lg:w-2/3">
						<div className="mb-6 flex flex-wrap items-center gap-3">
							<span className="flex h-7 items-center justify-center rounded-lg bg-[#E4E4E4] px-3 text-sm font-medium text-[#4A4A4A]">
								{category}
							</span>
							<span className="flex h-7 items-center justify-center rounded-lg bg-[#E4E4E4] px-3 text-sm font-medium text-[#4A4A4A]">
								{date}
							</span>
						</div>
						<motion.article
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							{/* Category & Date Badges */}

							<h1 className="mb-8 leading-tight font-semibold uppercase lg:text-[22px]">{title}</h1>

							<div className="relative mb-10 aspect-video overflow-hidden rounded-3xl shadow-2xl">
								<Image
									src={img}
									alt={title}
									fill
									className="object-cover"
									referrerPolicy="no-referrer"
									priority
								/>
							</div>

							<div className="prose prose-slate max-w-none space-y-6 text-lg leading-relaxed text-slate-700">
								{description && (
									<div className="border-stem-blue border-l-4 py-2 pl-6 text-xl font-medium text-slate-900 italic">
										{description}
									</div>
								)}

								{htmlContent ? (
									<div
										className="dynamic-content quill-content font-medium wrap-break-word text-slate-700"
										dangerouslySetInnerHTML={{ __html: cleanQuillHtml(htmlContent) }}
									/>
								) : (
									<div className="py-20 text-center text-slate-400">
										Nội dung đang được cập nhật...
									</div>
								)}
							</div>

							{/* Social Share & Back Button */}
							<div className="mt-16 flex flex-col justify-between gap-6 border-t border-slate-100 pt-8 sm:flex-row sm:items-center">
								{/* <div className="flex items-center gap-4">
									<span className="text-sm font-bold tracking-wider text-slate-900 uppercase">
										Chia sẻ {typeLabel}:
									</span>
									<div className="flex gap-2">
										<button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700">
											<Facebook size={18} fill="currentColor" />
										</button>
										<button className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white transition-colors hover:bg-sky-600">
											<Twitter size={18} fill="currentColor" />
										</button>
										<button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-colors hover:bg-slate-300">
											<LinkIcon size={18} />
										</button>
									</div>
								</div> */}
								<button
									onClick={handleBack}
									className="text-stem-blue flex items-center gap-2 font-bold transition-transform hover:-translate-x-1"
								>
									<ChevronRight size={20} className="rotate-180" /> Quay lại danh sách
								</button>
							</div>
						</motion.article>
					</div>

					{/* Related Sidebar */}
					<div className="w-full space-y-12 lg:w-1/3">
						{/* Related Articles Section */}
						{relatedArticles && relatedArticles.length > 0 && (
							<div className="animate-in fade-in slide-in-from-right duration-700">
								<h2 className="mb-8 font-semibold tracking-tighter uppercase lg:text-[32px]">
									Tin tức
								</h2>
								<div className="space-y-8">
									{relatedArticles.map((item) => (
										<Link
											key={item.id}
											href={`${detailBase}/${item.id}`}
											className="group relative block aspect-[384/220] overflow-hidden rounded-xl"
										>
											<Image
												src={item.image_url || "/statics/images/placeholder.webp"}
												alt={item.title}
												fill
												className="object-cover transition-transform duration-700"
												referrerPolicy="no-referrer"
											/>
											<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
											<div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
												<h3 className="group-hover:text-stem-blue line-clamp-2 text-sm leading-snug font-bold text-white transition-colors md:text-[15px]">
													{item.title}
												</h3>
											</div>
										</Link>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
