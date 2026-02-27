"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { heroSlides, stats, featuredCourses } from "@/constants/mock-data";

// Since Swiper might still be installing, I'll use a simple CSS-based slider placeholder for now
// or assume Swiper is ready if the command finished. I'll use a basic flex slider for safety.

export default function Home() {
	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="relative h-[400px] w-full overflow-hidden md:h-[600px]">
				<div className="flex h-full w-full">
					{heroSlides.slice(0, 1).map((slide) => (
						<div key={slide.id} className="relative h-full w-full shrink-0">
							<Image src={slide.image} alt={slide.title} fill className="object-cover" priority />
							<div className="absolute inset-0 bg-black/30 bg-linear-to-r from-black/60 to-transparent">
								<div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
									<h1 className="max-w-2xl text-3xl font-bold text-white md:text-5xl lg:text-6xl">
										{slide.title}
									</h1>
									<p className="mt-4 max-w-lg text-lg text-zinc-200 md:text-xl">{slide.subtitle}</p>
									<div className="mt-8 flex flex-wrap gap-4">
										<Link
											href="/lien-he-dang-ky-nhan-tu-van.html"
											className="bg-accent hover:bg-accent/90 rounded-full px-8 py-3 text-lg font-bold text-white shadow-lg transition-all active:scale-95"
										>
											Đăng ký ngay
										</Link>
										<Link
											href="/khoa-hoc-tieu-chuan.html"
											className="text-primary rounded-full bg-white px-8 py-3 text-lg font-bold shadow-lg transition-all hover:bg-zinc-100 active:scale-95"
										>
											Xem khóa học
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Stats Section */}
			<section className="bg-primary py-12 text-white">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
						{stats.map((stat) => (
							<div key={stat.label} className="group text-center">
								<div className="text-accent text-3xl font-extrabold transition-transform group-hover:scale-110 md:text-4xl">
									{stat.value}
								</div>
								<div className="mt-2 text-sm font-medium tracking-wider text-zinc-300 uppercase">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="py-20 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div className="shadow-premium relative aspect-video overflow-hidden rounded-2xl">
							<Image
								src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop"
								alt="About Ms Hoa Junior"
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="bg-accent/90 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110">
									<div className="ml-1 border-y-10 border-l-15 border-transparent border-l-white"></div>
								</div>
							</div>
						</div>
						<div>
							<h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase">Giới thiệu</h2>
							<h3 className="text-dark mt-4 text-3xl font-extrabold md:text-4xl">
								Về Hệ Thống Anh Ngữ <span className="text-primary">Ms Hoa Junior</span>
							</h3>
							<p className="mt-6 text-lg leading-relaxed text-zinc-600">
								Ms Hoa Junior là hệ thống đào tạo tiếng Anh trẻ em hàng đầu Việt Nam, trực thuộc IMAP
								Việt Nam. Với sứ mệnh giúp hàng triệu trẻ em Việt Nam yêu tiếng Anh và chinh phục tiếng
								Anh từ nhỏ.
							</p>
							<div className="mt-8 space-y-4">
								{[
									"Phương pháp truyền cảm hứng R.I.P.L độc quyền",
									"Đội ngũ giáo viên tinh hoa, giàu kinh nghiệm",
									"Chương trình chuẩn Cambridge, sát thực tế",
									"Môi trường học tập năng động, sáng tạo",
								].map((item) => (
									<div key={item} className="flex items-center gap-3">
										<CheckCircle2 className="text-primary h-6 w-6 shrink-0" />
										<span className="text-dark font-medium">{item}</span>
									</div>
								))}
							</div>
							<Link
								href="/vct-cau-chuyen-cua-ms-hoa-junior.html"
								className="text-primary hover:text-accent mt-10 inline-flex items-center gap-2 font-bold transition-colors"
							>
								Tìm hiểu thêm <ChevronRight className="h-5 w-5" />
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Courses Section */}
			<section className="bg-light py-20 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="flex flex-col items-center text-center">
						<h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase">Khóa học</h2>
						<h3 className="text-dark mt-4 text-3xl font-extrabold md:text-4xl">
							Các Khóa Học <span className="text-primary">Nổi Bật</span>
						</h3>
					</div>

					<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{featuredCourses.map((course) => (
							<div
								key={course.id}
								className="group hover:shadow-premium-hover overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2"
							>
								<div className="relative aspect-4/3 overflow-hidden">
									<Image
										src={course.image}
										alt={course.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
								</div>
								<div className="p-8 text-center">
									<h4 className="text-dark group-hover:text-primary text-xl font-bold transition-colors">
										{course.title}
									</h4>
									<p className="mt-4 text-sm leading-relaxed text-zinc-500">{course.description}</p>
									<Link
										href="/khoa-hoc-tieu-chuan.html"
										className="text-primary border-primary hover:bg-primary mt-6 inline-flex rounded-full border-2 px-6 py-2 text-sm font-bold transition-all hover:text-white"
									>
										Tìm hiểu thêm
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="overflow-hidden py-20 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div>
							<h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase">Lợi ích</h2>
							<h3 className="text-dark mt-4 text-3xl font-extrabold md:text-4xl">
								Tại sao nên chọn học tại <span className="text-primary">Ms Hoa Junior?</span>
							</h3>
							<div className="mt-12 space-y-10">
								{[
									{
										title: "Phát triển 4 kỹ năng",
										desc: "Học Nghe - Nói - Đọc - Viết qua các hoạt động tương tác sinh động.",
									},
									{
										title: "Điểm số giỏi trên lớp",
										desc: "Lộ trình bám sát chương trình phổ thông, giúp trẻ tự tin về điểm số.",
									},
									{
										title: "Chứng chỉ quốc tế",
										desc: "Sẵn sàng chinh phục các kỳ thi Cambridge, IELTS với kết quả tốt nhất.",
									},
								].map((item, idx) => (
									<div key={idx} className="flex gap-6">
										<div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-bold">
											0{idx + 1}
										</div>
										<div>
											<h4 className="text-dark text-xl font-bold">{item.title}</h4>
											<p className="mt-2 text-zinc-500">{item.desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="relative">
							<div className="shadow-premium relative z-10 aspect-square overflow-hidden rounded-full border-8 border-white">
								<Image
									src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2040&auto=format&fit=crop"
									alt="Benefits"
									fill
									className="object-cover"
								/>
							</div>
							{/* Decorative Elements */}
							<div className="bg-accent/20 absolute -top-8 -right-8 h-32 w-32 rounded-full blur-2xl"></div>
							<div className="bg-primary/10 absolute -bottom-12 -left-12 h-48 w-48 rounded-full blur-3xl"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="bg-primary py-20 text-white lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="flex flex-col items-center text-center">
						<h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase">Cảm nhận</h2>
						<h3 className="mt-4 text-3xl font-extrabold md:text-4xl">
							Phụ Huynh Nói Gì Về <span className="text-accent">Ms Hoa Junior</span>
						</h3>
					</div>

					<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								id: 1,
								name: "Chị Minh Anh",
								role: "Phụ huynh bé Gia Bảo",
								content:
									"Con mình trước đây rất sợ tiếng Anh, nhưng từ khi học tại Ms Hoa Junior, con đã tự tin hơn hẳn và luôn mong chờ đến giờ học.",
							},
							{
								id: 2,
								name: "Anh Hoàng Nam",
								role: "Phụ huynh bé Thùy Chi",
								content:
									"Phương pháp dạy học ở đây rất sáng tạo, con không chỉ học kiến thức mà còn được phát triển nhiều kỹ năng mềm khác.",
							},
							{
								id: 3,
								name: "Chị Thu Thảo",
								role: "Phụ huynh bé Minh Quân",
								content:
									"Đội ngũ giáo viên rất nhiệt tình và tận tâm. Mình rất yên tâm khi gửi gắm con theo học tại trung tâm.",
							},
						].map((item) => (
							<div key={item.id} className="rounded-2xl bg-white/10 p-8 shadow-lg backdrop-blur-sm">
								<div className="text-accent mb-4 flex items-center gap-1">
									{[...Array(5)].map((_, i) => (
										<CheckCircle2 key={i} className="h-4 w-4 fill-current" />
									))}
								</div>
								<p className="text-lg leading-relaxed text-zinc-200 italic">
									&ldquo;{item.content}&rdquo;
								</p>
								<div className="mt-8 flex items-center gap-4">
									<div className="bg-accent/20 h-12 w-12 rounded-full" />
									<div>
										<div className="font-bold">{item.name}</div>
										<div className="text-sm text-zinc-400">{item.role}</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* News/Events Section */}
			<section className="py-20 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
						<div>
							<h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase">Tin tức</h2>
							<h3 className="text-dark mt-4 text-3xl font-extrabold md:text-4xl">
								Tin Tức & <span className="text-primary">Sự Kiện</span>
							</h3>
						</div>
						<Link
							href="/tin-tuc.html"
							className="text-primary hover:text-accent font-bold transition-colors"
						>
							Tất cả tin tức <ChevronRight className="inline-block h-5 w-5" />
						</Link>
					</div>

					<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								id: 1,
								title: "Khai giảng lớp Tiếng Anh học thuật cho bé",
								date: "15/03/2024",
								img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=2076&auto=format&fit=crop",
							},
							{
								id: 2,
								title: "Bí quyết giúp con yêu tiếng Anh từ cái nhìn đầu tiên",
								date: "12/03/2024",
								img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2074&auto=format&fit=crop",
							},
							{
								id: 3,
								title: "Sự kiện ngoại khóa: Bé làm đầu bếp tài ba",
								date: "10/03/2024",
								img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop",
							},
						].map((news) => (
							<div key={news.id} className="group">
								<div className="relative aspect-video overflow-hidden rounded-2xl">
									<Image
										src={news.img}
										alt={news.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="bg-accent absolute top-4 left-4 rounded-md px-3 py-1 text-xs font-bold text-white shadow-md">
										{news.date}
									</div>
								</div>
								<div className="mt-6">
									<h4 className="text-dark group-hover:text-primary line-clamp-2 text-xl font-bold transition-colors">
										{news.title}
									</h4>
									<Link
										href="/tin-tuc.html"
										className="text-primary group-hover:text-accent mt-4 inline-flex items-center gap-1 text-sm font-bold transition-colors"
									>
										Xem chi tiết <ChevronRight className="h-4 w-4" />
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* Call-to-action (CTA) Form Section */}
			<section className="bg-light relative py-20 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="bg-primary relative overflow-hidden rounded-3xl p-8 md:p-16">
						<div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
							<div className="text-white">
								<h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase">Đăng ký</h2>
								<h3 className="mt-4 text-3xl font-extrabold md:text-5xl">
									Nhận Tư Vấn <br /> Miễn Phí Ngay!
								</h3>
								<p className="mt-6 text-lg text-zinc-300">
									Hãy để Ms Hoa Junior đồng hành cùng con trẻ trên con đường chinh phục tiếng Anh.
									Đăng ký để nhận lộ trình học chuyên sâu và ưu đãi hấp dẫn.
								</p>
							</div>
							<div className="rounded-2xl bg-white p-8 shadow-2xl">
								<form className="space-y-4">
									<input
										type="text"
										placeholder="Họ và tên phụ huynh *"
										className="text-dark focus:border-primary w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 transition-colors outline-none"
										required
									/>
									<input
										type="tel"
										placeholder="Số điện thoại *"
										className="text-dark focus:border-primary w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 transition-colors outline-none"
										required
									/>
									<input
										type="email"
										placeholder="Email"
										className="text-dark focus:border-primary w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 transition-colors outline-none"
									/>
									<select className="text-dark focus:border-primary w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 transition-colors outline-none">
										<option value="">Chọn khu vực của bạn</option>
										<option value="hanoi">Hà Nội</option>
										<option value="hcm">TP. Hồ Chí Minh</option>
										<option value="danang">Đà Nẵng</option>
										<option value="other">Tỉnh thành khác</option>
									</select>
									<button
										type="submit"
										className="bg-accent hover:bg-accent/90 w-full rounded-lg py-4 text-center text-lg font-bold text-white shadow-lg transition-all active:scale-95"
									>
										GỬI ĐĂNG KÝ
									</button>
								</form>
								<p className="mt-4 text-center text-xs text-zinc-400">
									Cam kết bảo mật thông tin khách hàng tuyệt đối.
								</p>
							</div>
						</div>
						{/* Background Shapes */}
						<div className="bg-accent/10 absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl" />
						<div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
					</div>
				</div>
			</section>
		</div>
	);
}
