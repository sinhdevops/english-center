import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ChevronRight,
	Download,
	FileText,
	BookOpen,
	Search,
	Filter,
	ArrowRight,
	Gift,
	Star,
	Clock,
	CheckCircle2,
} from "lucide-react";

const categories = [
	"Tất cả",
	"Tài liệu IELTS",
	"Tiếng Anh Tiểu học",
	"Tiếng Anh THCS",
	"Đề thi chuyên",
	"Sách & Giáo trình",
];

const resources = [
	{
		title: "Tổng hợp Đề thi chuyên vào 10 môn Tiếng Anh cả nước",
		category: "Đề thi chuyên",
		desc: "Bộ đề thi chính thức kèm đáp án chi tiết từ các trường chuyên hàng đầu Việt Nam.",
		tag: "Hot",
		date: "24/02/2026",
		img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop",
	},
	{
		title: "Trọn bộ đề thi Học sinh giỏi Tiếng Anh THCS (Lớp 6 - 9)",
		category: "Tiếng Anh THCS",
		desc: "Hệ thống bài tập nâng cao giúp con rèn luyện tư duy ngôn ngữ và kỹ năng làm bài thi.",
		tag: "Free",
		date: "20/02/2026",
		img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
	},
	{
		title: "Bộ Sách Tổng Ôn Tiếng Anh Ms Hoa Junior [PDF]",
		category: "Sách & Giáo trình",
		desc: "Giải pháp ôn tập hiệu quả dành riêng cho học sinh tiểu học theo chuẩn Cambridge.",
		tag: "PDF",
		date: "15/02/2026",
		img: "https://images.unsplash.com/photo-1512820790803-73cad7a2599f?q=80&w=2027&auto=format&fit=crop",
	},
	{
		title: "Trọn bộ đề thi học kỳ Tiếng Anh lớp 6, 7, 8, 9",
		category: "Tiếng Anh THCS",
		desc: "Đầy đủ đề minh họa, đáp án và file nghe chuẩn cho kỳ thi học kỳ sắp tới.",
		tag: "Audio",
		date: "10/02/2026",
		img: "https://images.unsplash.com/photo-1434030216411-0bb7c3f3dfad?q=80&w=2070&auto=format&fit=crop",
	},
	{
		title: "English for Everyone JUNIOR – Bộ học liệu toàn diện",
		category: "Tiếng Anh Tiểu học",
		desc: "Kết hợp giữa hình ảnh sinh động và kiến thức chuẩn hóa cho trẻ 5-11 tuổi.",
		tag: "PDF+Audio",
		date: "05/02/2026",
		img: "https://images.unsplash.com/photo-1503676260728-1c00da07bb5e?q=80&w=2026&auto=format&fit=crop",
	},
	{
		title: "900 Mẫu câu giao tiếp tiếng Anh hằng ngày cho trẻ em",
		category: "Tiếng Anh Tiểu học",
		desc: "Cẩm nang giao tiếp thực tế giúp trẻ tự tin nói tiếng Anh trong các tình huống thường gặp.",
		tag: "Hot",
		date: "01/02/2026",
		img: "https://images.unsplash.com/photo-1544717297-fa20d00f796b?q=80&w=2024&auto=format&fit=crop",
	},
];

export default function ResourcesPage() {
	return (
		<div className="flex flex-col font-sans">
			{/* Breadcrumb & Hero */}
			<section className="bg-dark relative overflow-hidden py-20 text-white">
				<div className="bg-primary/20 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[100px]" />
				<div className="bg-accent/10 absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-[100px]" />

				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<nav className="flex items-center gap-2 text-sm text-zinc-400">
						<Link href="/" className="hover:text-accent transition-colors">
							Trang chủ
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="font-medium text-white">Tài liệu</span>
					</nav>

					<div className="mt-12 flex flex-col items-center text-center">
						<h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
							Kho Học Liệu{" "}
							<span className="text-accent italic underline decoration-white/10 underline-offset-8 text-shadow-sm">
								Tri Thức
							</span>
						</h1>
						<p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-400">
							Tổng hợp đầy đủ các bộ tài liệu, giáo trình và đề thi tiếng Anh cho trẻ em chất lượng nhất,
							được biên soạn bởi đội ngũ chuyên gia Ms Hoa Junior.
						</p>

						{/* Search Bar */}
						<div className="mt-12 w-full max-w-2xl">
							<div className="relative flex items-center">
								<Search className="absolute left-6 h-5 w-5 text-zinc-500" />
								<input
									type="text"
									placeholder="Tìm kiếm tài liệu học tập cho con..."
									className="ring-primary/50 w-full rounded-full bg-white/10 py-5 pr-32 pl-14 text-white backdrop-blur-md transition-all outline-none focus:ring-4"
								/>
								<button className="bg-accent hover:bg-accent/90 absolute right-2 rounded-full px-8 py-3 font-bold text-white transition-all active:scale-95">
									Tìm kiếm
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Gift Box Section */}
			<section className="relative -mt-12 px-4">
				<div className="shadow-premium mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-[3rem] border border-white/20 bg-white/80 p-8 backdrop-blur-2xl md:flex-row md:p-12">
					<div className="bg-accent/10 flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl md:h-32 md:w-32">
						<Gift className="text-accent h-12 w-12 md:h-16 md:w-16" />
					</div>
					<div className="grow text-center md:text-left">
						<h3 className="text-dark font-heading text-2xl font-extrabold md:text-3xl">
							Combo quà tri thức cho con
						</h3>
						<p className="mt-2 text-lg text-zinc-600">
							Đăng ký nhận thông tin để sở hữu ngay bộ 5 tài liệu độc quyền giúp con bứt phá 4 kỹ năng.
						</p>
					</div>
					<Link
						href="#register"
						className="bg-primary hover:bg-primary/90 flex shrink-0 items-center gap-2 rounded-full px-10 py-5 font-extrabold text-white shadow-xl transition-all active:scale-95"
					>
						Nhận tài liệu ngay <ArrowRight className="h-5 w-5" />
					</Link>
				</div>
			</section>

			{/* Main Content: Categories & List */}
			<section className="py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="flex flex-col gap-12 lg:flex-row">
						{/* Sidebar Categories */}
						<aside className="w-full lg:w-64">
							<div className="sticky top-24">
								<div className="text-dark mb-6 flex items-center gap-2 font-bold">
									<Filter className="h-5 w-5" />
									<span>Danh mục tài liệu</span>
								</div>
								<div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
									{categories.map((cat, idx) => (
										<button
											key={idx}
											className={`flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${idx === 0 ? "bg-primary font-bold text-white shadow-lg" : "text-zinc-600 hover:bg-zinc-100"}`}
										>
											<span>{cat}</span>
											<ChevronRight
												className={`h-4 w-4 ${idx === 0 ? "opacity-100" : "opacity-0"}`}
											/>
										</button>
									))}
								</div>

								{/* Promotional Banner in Sidebar */}
								<div className="bg-primary/5 border-primary/10 mt-12 overflow-hidden rounded-3xl border p-6">
									<h4 className="text-primary mb-3 font-bold">Tài liệu mới mỗi ngày?</h4>
									<p className="mb-6 text-sm leading-relaxed text-zinc-500">
										Đăng ký email để không bỏ lỡ những bộ học liệu mới nhất cho con.
									</p>
									<input
										type="email"
										placeholder="Email của bạn..."
										className="focus:border-primary mb-4 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none"
									/>
									<button className="bg-primary hover:bg-primary/90 w-full rounded-xl py-3 text-sm font-bold text-white transition-all">
										Đăng ký nhanh
									</button>
								</div>
							</div>
						</aside>

						{/* Resource Grid */}
						<div className="grow">
							<div className="mb-8 flex items-center justify-between border-b pb-6">
								<h2 className="text-dark font-heading text-2xl font-bold">Tất cả tài liệu</h2>
								<div className="flex items-center gap-2 text-sm text-zinc-500">
									<span>Sắp xếp:</span>
									<select className="text-dark bg-transparent font-bold outline-none">
										<option>Mới nhất</option>
										<option>Xem nhiều</option>
										<option>Yêu thích</option>
									</select>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								{resources.map((item, idx) => (
									<div
										key={idx}
										className="group shadow-premium relative overflow-hidden rounded-[2.5rem] border border-zinc-50 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
									>
										<div className="relative h-60 overflow-hidden">
											<Image
												src={item.img}
												alt={item.title}
												fill
												className="object-cover transition-transform duration-700 group-hover:scale-110"
											/>
											<div className="absolute top-4 left-4 flex gap-2">
												<span className="bg-accent rounded-full px-4 py-1 text-xs font-bold text-white shadow-lg">
													{item.tag}
												</span>
												<span className="text-dark rounded-full bg-white/90 px-4 py-1 text-xs font-bold shadow-sm backdrop-blur-sm">
													{item.category}
												</span>
											</div>
										</div>
										<div className="p-8">
											<div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-400 uppercase">
												<Clock className="h-3.5 w-3.5" />
												<span>{item.date}</span>
											</div>
											<h3 className="text-dark font-heading group-hover:text-primary mb-4 text-xl leading-tight font-bold transition-colors">
												{item.title}
											</h3>
											<p className="mb-6 line-clamp-2 text-sm leading-relaxed text-zinc-500">
												{item.desc}
											</p>
											<div className="flex items-center justify-between border-t border-zinc-50 pt-6">
												<div className="text-primary flex items-center gap-1.5">
													<Star className="h-4 w-4 fill-current" />
													<span className="text-xs font-bold">Nổi bật</span>
												</div>
												<button className="bg-primary/5 hover:bg-primary text-primary flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 hover:text-white">
													<Download className="h-5 w-5" />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Pagination */}
							<div className="mt-16 flex items-center justify-center gap-2">
								{[1, 2, 3, "...", 9].map((page, idx) => (
									<button
										key={idx}
										className={`h-12 w-12 rounded-2xl font-bold transition-all ${idx === 0 ? "bg-primary shadow-primary/20 text-white shadow-lg" : "text-dark hover:bg-zinc-100"}`}
									>
										{page}
									</button>
								))}
								<button className="text-dark flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 transition-all hover:bg-zinc-200">
									<ChevronRight className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Registration For More Resources */}
			<section id="register" className="bg-primary py-24 text-white lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
						<div className="relative">
							{/* Decorative background circle */}
							<div className="bg-accent absolute -top-12 -left-12 h-24 w-24 rounded-full opacity-20 blur-2xl" />

							<h2 className="text-accent mb-6 font-bold tracking-[0.3em] uppercase">
								Đăng ký nhận tài liệu
							</h2>
							<h3 className="font-heading mb-8 text-4xl font-extrabold md:text-5xl lg:text-6xl">
								Nhận ngay <br /> Bộ quà tặng{" "}
								<span className="text-accent italic drop-shadow-sm">Tri Thức</span>
							</h3>

							<div className="space-y-6">
								{[
									"Ebook 900 mẫu câu giao tiếp tiếng Anh hằng ngày.",
									"Trọn bộ Flashcard từ vựng online 20 Unit.",
									"Giải mã bài thi Starter, Movers, Flyers (Cambridge).",
									"Tài liệu ôn thi học kỳ điểm cao cho con.",
								].map((item, idx) => (
									<div key={idx} className="flex items-center gap-4">
										<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
											<CheckCircle2 className="text-accent h-4 w-4" />
										</div>
										<p className="text-lg text-zinc-300">{item}</p>
									</div>
								))}
							</div>

							<div className="mt-12 flex items-center gap-6">
								<div className="flex -space-x-4">
									{[1, 2, 3, 4, 5].map((i) => (
										<div
											key={i}
											className="border-primary h-14 w-14 overflow-hidden rounded-full border-4 bg-zinc-800"
										>
											<Image
												src={`https://i.pravatar.cc/150?u=res${i}`}
												alt="user"
												width={56}
												height={56}
											/>
										</div>
									))}
								</div>
								<div>
									<p className="text-sm font-bold text-white">200K+ Phụ huynh</p>
									<p className="text-xs font-medium tracking-wide text-zinc-400">
										Đã tin tưởng và tải tài liệu
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-[3.5rem] bg-white p-8 shadow-2xl md:p-14">
							<h4 className="text-dark font-heading mb-10 text-center text-3xl font-extrabold">
								Thông tin đăng ký
							</h4>
							<form className="space-y-6">
								<div className="space-y-2">
									<label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
										Họ tên phụ huynh
									</label>
									<input
										type="text"
										placeholder="Nguyễn Văn A"
										className="text-dark focus:border-primary focus:ring-primary/5 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 shadow-sm transition-all outline-none focus:bg-white focus:ring-4"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
										Số điện thoại
									</label>
									<input
										type="tel"
										placeholder="0912 xxx xxx"
										className="text-dark focus:border-primary focus:ring-primary/5 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 shadow-sm transition-all outline-none focus:bg-white focus:ring-4"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
										Email của bạn
									</label>
									<input
										type="email"
										placeholder="example@mail.com"
										className="text-dark focus:border-primary focus:ring-primary/5 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 shadow-sm transition-all outline-none focus:bg-white focus:ring-4"
									/>
								</div>
								<button className="bg-accent hover:bg-accent/90 shadow-accent/20 w-full rounded-2xl py-6 text-xl font-extrabold text-white shadow-xl transition-all active:scale-95">
									Đăng ký nhận bộ quà tặng
								</button>
								<p className="text-center text-xs leading-relaxed font-medium text-zinc-400">
									Chúng tôi sẽ gửi tài liệu và quà tặng qua Email/Zalo của bạn{" "}
									<br className="hidden md:block" /> trong vòng 10 phút.
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
