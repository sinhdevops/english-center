"use client";

import { Calendar, ChevronRight, User, Clock, Share2, Facebook, Twitter, Link } from "lucide-react";
import { motion } from "motion/react";
import { CourserSidebar } from "@/components/ui/courser-sidebar";

interface NewsDetailProps {
	article?: {
		title: string;
		date: string;
		img: string;
		desc: string;
	};
	onBack: () => void;
}

export default function NewsDetailPage({ article, onBack }: NewsDetailProps) {
	// Mock content if no article is passed
	const content = article || {
		title: "STEMKey chính thức khai trương cơ sở mới tại Nam An Khánh",
		date: "26 Tháng 2, 2024",
		img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
		desc: "Với mong muốn mang giáo dục STEM đến gần hơn với trẻ em Việt Nam, STEMKey tự hào ra mắt cơ sở mới với không gian học tập sáng tạo, trang thiết bị hiện đại bậc nhất.",
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
				<div className="flex flex-col gap-16 lg:flex-row">
					{/* Main Content */}
					<div className="w-full lg:w-2/3">
						<motion.article
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="mb-6 text-3xl leading-tight font-black text-slate-900 lg:text-5xl">
								{content.title}
							</h1>

							<div className="mb-10 flex flex-wrap items-center gap-6 border-b border-slate-100 pb-6 text-sm text-slate-500">
								<div className="flex items-center gap-2">
									<Calendar size={16} className="text-stem-blue" />
									<span>{content.date}</span>
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

							<div className="mb-10 overflow-hidden rounded-3xl shadow-2xl">
								<img
									src={content.img}
									alt={content.title}
									className="h-auto w-full object-cover"
									referrerPolicy="no-referrer"
								/>
							</div>

							<div className="prose prose-slate max-w-none space-y-6 leading-relaxed text-slate-700">
								<p className="border-stem-blue border-l-4 py-2 pl-6 text-xl font-medium text-slate-900 italic">
									{content.desc}
								</p>

								<p>
									Giáo dục STEM (Science, Technology, Engineering, and Mathematics) đang trở thành xu
									hướng tất yếu trong kỷ nguyên số. Tại STEMKey, chúng tôi không chỉ dạy trẻ kiến thức
									khô khan mà còn khơi gợi niềm đam mê khám phá thông qua các dự án thực tế.
								</p>

								<h2 className="mt-12 mb-6 text-2xl font-bold text-slate-900">
									Không gian học tập hiện đại
								</h2>
								<p>
									Cơ sở mới tại Nam An Khánh được thiết kế với không gian mở, tràn ngập ánh sáng tự
									nhiên. Các phòng học được trang bị đầy đủ các bộ kit Robotics, máy tính cấu hình cao
									và các khu vực thực hành thí nghiệm chuyên biệt.
								</p>

								<img
									src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000"
									alt="Classroom"
									className="my-10 h-auto w-full rounded-2xl shadow-lg"
									referrerPolicy="no-referrer"
								/>

								<h2 className="mt-12 mb-6 text-2xl font-bold text-slate-900">
									Đội ngũ giáo viên tâm huyết
								</h2>
								<p>
									Chúng tôi tự hào sở hữu đội ngũ giáo viên giàu kinh nghiệm, được đào tạo bài bản về
									phương pháp giáo dục STEM. Mỗi thầy cô không chỉ là người truyền đạt kiến thức mà
									còn là người bạn đồng hành, khích lệ sự sáng tạo của các con.
								</p>

								<p>
									Nhân dịp khai trương, STEMKey dành tặng hàng loạt ưu đãi hấp dẫn cho các học viên
									đăng ký mới trong tháng này. Hãy liên hệ ngay với chúng tôi để được tư vấn lộ trình
									học tập phù hợp nhất cho con yêu của bạn.
								</p>
							</div>

							{/* Share */}
							<div className="mt-16 flex flex-col justify-between gap-6 border-t border-slate-100 pt-8 sm:flex-row sm:items-center">
								<div className="flex items-center gap-4">
									<span className="text-sm font-bold tracking-wider text-slate-900 uppercase">
										Chia sẻ bài viết:
									</span>
									<div className="flex gap-2">
										<button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700">
											<Facebook size={18} fill="currentColor" />
										</button>
										<button className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white transition-colors hover:bg-sky-600">
											<Twitter size={18} fill="currentColor" />
										</button>
										<button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-colors hover:bg-slate-300">
											<Link size={18} />
										</button>
									</div>
								</div>
								<button
									onClick={onBack}
									className="text-stem-blue flex items-center gap-2 font-bold hover:underline"
								>
									<Share2 size={18} className="rotate-180" /> Quay lại danh sách
								</button>
							</div>
						</motion.article>
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
