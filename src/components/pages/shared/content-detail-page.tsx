"use client";

import { Calendar, User, Clock, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { motion } from "motion/react";
import { CourserSidebarContent } from "@/components/ui/courser-sidebar-content";
import type { Program } from "@/lib/types";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

interface ContentDetailPageProps {
	article?: {
		title: string;
		date: string;
		img?: string;
		image_url?: string;
		desc?: string;
		excerpt?: string;
		description?: string;
		content?: string;
	};
	onBack?: () => void;
	typeLabel?: string;
	breadcrumbItems?: { label: string; href?: string; active?: boolean }[];
	programs?: Program[];
}

export default function ContentDetailPage({
	article,
	onBack,
	typeLabel = "bài viết",
	breadcrumbItems,
	programs = [],
}: ContentDetailPageProps) {
	const router = useRouter();

	// Map API fields to local variables
	const title = article?.title || "STEMKey chính thức khai trương cơ sở mới tại Nam An Khánh";
	const date = article?.date || "26 Tháng 2, 2024";
	const img =
		article?.image_url ||
		article?.img ||
		"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200";
	const description =
		article?.excerpt ||
		article?.description ||
		article?.desc ||
		"Với mong muốn mang giáo dục STEM đến gần hơn với trẻ em Việt Nam, STEMKey tự hào ra mắt cơ sở mới với không gian học tập sáng tạo, trang thiết bị hiện đại bậc nhất.";
	const htmlContent = article?.content;

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			router.back();
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{breadcrumbItems && (
				<div className="border-b border-slate-100 bg-slate-50 py-4">
					<div className="mx-auto max-w-7xl px-4">
						<Breadcrumb items={breadcrumbItems} variant="dark" />
					</div>
				</div>
			)}
			<div className="mx-auto max-w-7xl px-4 py-6 text-center md:text-left">
				<div className="flex flex-col gap-16 lg:flex-row">
					{/* Main Content */}
					<div className="min-w-0 w-full lg:w-2/3">
						<motion.article
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="mb-6 text-2xl leading-tight font-black text-slate-900 uppercase">
								{title}
							</h1>

							<div className="mb-10 flex flex-wrap items-center justify-center gap-6 border-b border-slate-100 pb-6 text-sm text-slate-500 md:justify-start">
								<div className="flex items-center gap-2">
									<Calendar size={16} className="text-stem-blue" />
									<span>{date}</span>
								</div>
								<div className="flex items-center gap-2">
									<User size={16} className="text-stem-blue" />
									<span>Ban biên tập STEMKey</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock size={16} className="text-stem-blue" />
									<span>5 phút đọc</span>
								</div>
							</div>

							<div className="relative mb-10 aspect-video overflow-hidden rounded-xl shadow-2xl">
								<Image
									src={img}
									alt={title}
									fill
									className="object-cover"
									referrerPolicy="no-referrer"
									priority
								/>
							</div>

							<div className="prose prose-slate max-w-none space-y-6 leading-relaxed text-slate-700">
								<p className="border-stem-blue border-l-4 py-2 pl-6 text-left text-xl font-medium text-slate-900 italic">
									{description}
								</p>

								{htmlContent ? (
									<div
										className="dynamic-content text-left overflow-hidden wrap-break-word [&_img]:max-w-full [&_img]:h-auto [&_table]:w-full [&_table]:overflow-x-auto [&_pre]:overflow-x-auto [&_iframe]:max-w-full"
										dangerouslySetInnerHTML={{ __html: htmlContent }}
									/>
								) : (
									<>
										<p className="text-left">
											Giáo dục STEM (Science, Technology, Engineering, and Mathematics) đang trở
											thành xu hướng tất yếu trong kỷ nguyên số. Tại STEMKey, chúng tôi không chỉ
											dạy trẻ kiến thức khô khan mà còn khơi gợi niềm đam mê khám phá thông qua
											các dự án thực tế.
										</p>

										<h2 className="mt-12 mb-6 text-left text-2xl font-bold text-slate-900">
											Không gian học tập hiện đại
										</h2>
										<p className="text-left">
											Cơ sở mới tại Nam An Khánh được thiết kế với không gian mở, tràn ngập ánh
											sáng tự nhiên. Các phòng học được trang bị đầy đủ các bộ kit Robotics, máy
											tính cấu hình cao và các khu vực thực hành thí nghiệm chuyên biệt.
										</p>

										<div className="relative my-10 aspect-video overflow-hidden rounded-2xl shadow-lg">
											<Image
												src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000"
												alt="Classroom"
												fill
												className="object-cover"
												referrerPolicy="no-referrer"
											/>
										</div>

										<h2 className="mt-12 mb-6 text-left text-2xl font-bold text-slate-900">
											Đội ngũ giáo viên tâm huyết
										</h2>
										<p className="text-left">
											Chúng tôi tự hào sở hữu đội ngũ giáo viên giàu kinh nghiệm, được đào tạo bài
											bản về phương pháp giáo dục STEM. Mỗi thầy cô không chỉ là người truyền đạt
											kiến thức mà còn là người bạn đồng hành, khích lệ sự sáng tạo của các con.
										</p>

										<p className="text-left">
											Nhân dịp khai trương, STEMKey dành tặng hàng loạt ưu đãi hấp dẫn cho các học
											viên đăng ký mới trong tháng này. Hãy liên hệ ngay với chúng tôi để được tư
											vấn lộ trình học tập phù hợp nhất cho con yêu của bạn.
										</p>
									</>
								)}
							</div>

							{/* Share */}
							<div className="mt-16 flex flex-col justify-between gap-6 border-t border-slate-100 pt-8 sm:flex-row sm:items-center">
								<div className="flex items-center justify-center gap-4">
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
								</div>
								<button
									onClick={handleBack}
									className="text-stem-blue flex items-center justify-center gap-2 font-bold hover:underline"
								>
									<Share2 size={18} className="rotate-180" /> Quay lại danh sách
								</button>
							</div>
						</motion.article>
					</div>

					{/* Sidebar */}
					<div className="w-full lg:w-1/3">
						<CourserSidebarContent programs={programs} />
					</div>
				</div>
			</div>
		</div>
	);
}
