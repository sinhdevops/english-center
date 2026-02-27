import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ChevronRight,
	CheckCircle2,
	ArrowRight,
	Target,
	Zap,
	Sparkles,
	BookOpen,
	Award,
	PlayCircle,
	Quote,
} from "lucide-react";

export default function StandardCoursesPage() {
	return (
		<div className="flex flex-col overflow-x-hidden font-sans">
			{/* Hero Section */}
			<section className="bg-dark relative py-20 text-white lg:py-32">
				<div className="bg-primary/20 absolute top-0 right-0 h-full w-1/2 blur-[120px]" />
				<div className="bg-accent/10 absolute bottom-0 left-0 h-1/2 w-full blur-[100px]" />

				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<nav className="flex items-center gap-2 text-sm text-zinc-400">
						<Link href="/" className="hover:text-accent transition-colors">
							Trang chủ
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="font-medium text-white">Khóa học tiêu chuẩn</span>
					</nav>

					<div className="mt-12 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div>
							<h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
								Hệ Tiêu Chuẩn <br />
								<span className="text-accent underline decoration-white/10 underline-offset-8">
									4 Kỹ Năng
								</span>
							</h1>
							<p className="mt-8 text-xl leading-relaxed text-zinc-400 md:text-2xl">
								Nâng cao điểm số trên lớp và phát triển toàn diện Nghe - Nói - Đọc - Viết theo chuẩn
								Cambridge quốc tế.
							</p>
							<div className="mt-10 flex flex-wrap gap-4">
								<Link
									href="#roadmap"
									className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-all active:scale-95"
								>
									Khám phá lộ trình <ArrowRight className="h-5 w-5" />
								</Link>
								<Link
									href="#benefits"
									className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10"
								>
									Lợi ích khóa học
								</Link>
							</div>
						</div>
						<div className="relative">
							<div className="shadow-accent/20 relative aspect-video overflow-hidden rounded-4xl border border-white/10 shadow-2xl">
								<Image
									src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
									alt="Standard Course"
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
									<div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md transition-all hover:bg-white/30">
										<PlayCircle className="h-10 w-10 text-white" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 5 Benefits Section - Redesigned for Premium Look */}
			<section id="benefits" className="relative overflow-hidden py-24 lg:py-32">
				<div className="bg-primary/5 absolute top-0 left-0 h-full w-full skew-y-3" />
				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<div className="mb-20 text-center">
						<h2 className="text-accent mb-4 text-sm font-bold tracking-[0.4em] uppercase">
							Đặc quyền học viên
						</h2>
						<h3 className="text-dark font-heading text-4xl font-extrabold md:text-5xl lg:text-6xl">
							5 Lợi ích <span className="text-primary italic">Vượt trội</span>
						</h3>
						<div className="bg-accent mx-auto mt-6 h-1 w-20 rounded-full" />
						<p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600">
							Ms Hoa Junior cam kết mang lại môi trường giáo dục tiêu chuẩn, giúp học sinh tiểu học bứt
							phá mạnh mẽ về cả tư duy lẫn kỹ năng.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
						{[
							{
								icon: Target,
								title: "Mục tiêu kép",
								desc: "Giỏi tiếng Anh toàn diện 4 kỹ năng và bứt phá điểm số trên lớp (tăng ít nhất 1-2 điểm).",
								theme: "primary",
								span: "lg:col-span-2",
							},
							{
								icon: Award,
								title: "Chuẩn Cambridge",
								desc: "Lộ trình đào tạo bám sát các cấp độ Starters, Movers, Flyers theo chuẩn khảo thí quốc tế.",
								theme: "accent",
								span: "lg:col-span-2",
							},
							{
								icon: Zap,
								title: "Phương pháp R.I.P.L",
								desc: "Học tập qua chu trình 5 bước PACES, giúp trẻ ghi nhớ lâu và ứng dụng ngôn ngữ tự nhiên.",
								theme: "primary",
								span: "lg:col-span-2",
							},
							{
								icon: BookOpen,
								title: "Học liệu phong phú",
								desc: "Bộ giáo trình được biên soạn độc quyền, tích hợp kiến thức cuộc sống và kỹ năng mềm thiết yếu.",
								theme: "accent",
								span: "lg:col-start-2 lg:col-span-2",
							},
							{
								icon: Sparkles,
								title: "Môi trường cảm hứng",
								desc: "Đội ngũ Messenger truyền lửa, biến mỗi giờ học thành một hành trình khám phá thú vị.",
								theme: "primary",
								span: "lg:col-span-2",
							},
						].map((benefit, idx) => (
							<div
								key={idx}
								className={`group shadow-premium relative overflow-hidden rounded-[2.5rem] bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${benefit.span}`}
							>
								<div className="relative z-10">
									<div
										className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110 ${benefit.theme === "primary" ? "bg-primary/5 border-primary/10 text-primary" : "bg-accent/5 border-accent/10 text-accent"}`}
									>
										<benefit.icon className="h-8 w-8" />
									</div>
									<h4 className="text-dark font-heading mb-4 text-2xl font-bold tracking-tight">
										{benefit.title}
									</h4>
									<p className="leading-relaxed text-zinc-500">{benefit.desc}</p>
								</div>
								{/* Decorative corner accent */}
								<div
									className={`absolute -right-4 -bottom-4 h-16 w-16 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-10 ${benefit.theme === "primary" ? "bg-primary" : "bg-accent"}`}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Roadmap Section */}
			<section id="roadmap" className="bg-light relative py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="mb-20">
						<h2 className="text-accent mb-4 text-sm font-bold tracking-[0.3em] uppercase">
							Lộ trình đào tạo
						</h2>
						<h3 className="text-dark font-heading text-3xl font-extrabold md:text-5xl">
							3 Chặng chinh phục đỉnh cao
						</h3>
					</div>

					<div className="space-y-12">
						{[
							{
								stage: "Chặng 1",
								title: "Hình thành ngôn ngữ",
								desc: "Làm quen với ngôn ngữ, học chữ cái, phát âm cơ bản. Nhận biết từ vựng quen thuộc, bước đầu rèn luyện phản xạ.",
								details: [
									"17 cặp âm & 3 kỹ thuật phát âm nâng cao",
									"Gần 300 từ vựng theo 16 chủ điểm",
									"10 chủ điểm ngữ pháp nền tảng",
									"Hoàn thành bậc Starters Cambridge",
								],
								img: "https://images.unsplash.com/photo-1503676260728-1c00da07bb5e?q=80&w=2026&auto=format&fit=crop",
							},
							{
								stage: "Chặng 2",
								title: "Phát triển kỹ năng",
								desc: "Học từ vựng và mẫu câu giao tiếp chủ đề quen thuộc. Kể chuyện và hội thảo đơn giản bằng tiếng Anh.",
								details: [
									"Hội thoại giao tiếp chuyên sâu",
									"Đọc hiểu thông báo & hướng dẫn cơ bản",
									"Luyện viết đoạn văn ngắn",
									"Hoàn thành bậc Movers & Flyers",
								],
								img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
							},
							{
								stage: "Chặng 3",
								title: "Tiền đề IELTS",
								desc: "Xây dựng nền tảng ngữ âm, từ vựng và ngữ pháp có tính ứng dụng cao trong học thuật IELTS.",
								details: [
									"Phát âm chuẩn IPA & ngữ điệu bản xứ",
									"20 chủ điểm ngữ pháp nâng cao",
									"Làm quen dạng bài thi IELTS 4 kỹ năng",
									"Định hướng tư duy học thuật",
								],
								img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop",
							},
						].map((step, idx) => (
							<div
								key={idx}
								className="group relative overflow-hidden rounded-[3rem] bg-white shadow-2xl transition-all duration-500"
							>
								<div className="grid grid-cols-1 md:grid-cols-12">
									<div className="relative h-64 md:col-span-4 md:h-auto">
										<Image
											src={step.img}
											alt={step.title}
											fill
											className="object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="bg-primary font-heading absolute top-8 left-8 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold text-white">
											0{idx + 1}
										</div>
									</div>
									<div className="p-8 md:col-span-8 md:p-16">
										<span className="text-accent mb-4 block font-bold tracking-widest uppercase">
											{step.stage}
										</span>
										<h4 className="text-dark font-heading mb-6 text-3xl font-extrabold md:text-4xl">
											{step.title}
										</h4>
										<p className="mb-8 text-lg leading-relaxed text-zinc-500">{step.desc}</p>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											{step.details.map((detail, dIdx) => (
												<div key={dIdx} className="flex items-center gap-3 text-zinc-600">
													<div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
														<CheckCircle2 className="h-4 w-4" />
													</div>
													{detail}
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* RIPL Methodology */}
			<section className="py-24 lg:py-40">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div>
							<h2 className="text-accent mb-4 text-sm font-bold tracking-[0.3em] uppercase">
								Bí quyết đào tạo
							</h2>
							<h3 className="text-dark font-heading mb-8 text-4xl font-extrabold md:text-5xl">
								Phương pháp <span className="text-primary italic">R.I.P.L</span>
							</h3>
							<p className="mb-12 text-lg leading-relaxed text-zinc-500">
								Độc quyền tại Ms Hoa Junior, giúp học viên chinh phục tiếng Anh qua những giờ học tràn
								đầy cảm hứng và kiến thức chắt lọc theo logic khoa học.
							</p>

							<div className="space-y-8">
								{[
									{
										l: "R",
										t: "Refined Knowledge",
										d: "Chắt lọc kiến thức, chỉ dạy những gì học viên cần, không dạy dàn trải.",
									},
									{
										l: "I",
										t: "Inspiration",
										d: "Truyền cảm hứng, khai phá tiềm năng và nhận ra giá trị bản thân.",
									},
									{
										l: "P",
										t: "Practice",
										d: "Thực hành ngôn ngữ liên tục theo quy tắc 3 bước S-K-S.",
									},
									{
										l: "L",
										t: "Logic",
										d: "Tiếp thu qua chu trình 5 bước PACES khoa học và chặt chẽ.",
									},
								].map((item, idx) => (
									<div key={idx} className="group flex gap-6">
										<div className="bg-dark group-hover:bg-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold text-white transition-colors">
											{item.l}
										</div>
										<div>
											<h5 className="text-dark font-heading mb-1 text-xl font-bold">{item.t}</h5>
											<p className="text-zinc-500">{item.d}</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="relative">
							<div className="shadow-premium relative z-10 aspect-square overflow-hidden rounded-[4rem]">
								<Image
									src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
									alt="Students"
									fill
									className="object-cover"
								/>
							</div>
							<div className="bg-accent absolute -right-10 -bottom-10 -z-10 h-1/2 w-1/2 rounded-[4rem]" />
							<div className="bg-primary/10 absolute -top-10 -left-10 -z-10 h-1/2 w-1/2 rounded-full" />
							<div className="absolute top-1/2 -right-12 z-20 hidden md:block">
								<div className="shadow-premium rounded-2xl bg-white p-6 backdrop-blur-md">
									<Quote className="text-accent mb-2 h-8 w-8" />
									<p className="max-w-[200px] text-sm font-medium text-zinc-600 italic">
										&ldquo;Phương pháp này giúp bé nhà mình tự tin nói tiếng Anh chỉ sau 3
										tháng.&rdquo;
									</p>
									<p className="text-dark mt-4 text-xs font-bold">Phụ huynh bé Tú Anh</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="bg-dark py-24 text-white lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div>
							<h3 className="font-heading mb-6 text-3xl font-extrabold md:text-5xl lg:text-6xl">
								Đăng ký <br />
								<span className="text-accent italic underline decoration-white/10 underline-offset-8">
									Nhận tư vấn
								</span>{" "}
								ngay
							</h3>
							<p className="mb-10 text-xl text-zinc-400">
								Tham gia cùng hơn 200,000 học viên đã thành công cán đích. Hãy để chúng tôi đồng hành
								cùng con bạn.
							</p>
							<div className="flex items-center gap-6">
								<div className="flex -space-x-3">
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="border-dark h-12 w-12 overflow-hidden rounded-full border-2 bg-zinc-800"
										>
											<Image
												src={`https://i.pravatar.cc/150?u=${i}`}
												alt="user"
												width={48}
												height={48}
											/>
										</div>
									))}
								</div>
								<p className="text-sm font-medium text-zinc-400">
									<span className="font-bold text-white">100K+</span> người đăng ký tuần này
								</p>
							</div>
						</div>
						<div className="rounded-[3rem] bg-white/5 p-8 backdrop-blur-xl md:p-12">
							<form className="space-y-6">
								<div className="space-y-2">
									<label className="text-sm font-bold tracking-wider text-zinc-400 uppercase">
										Họ tên phụ huynh
									</label>
									<input
										type="text"
										placeholder="Nguyễn Văn A"
										className="ring-primary w-full rounded-2xl bg-white/10 px-6 py-4 text-white transition-all outline-none focus:ring-2"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-bold tracking-wider text-zinc-400 uppercase">
										Số điện thoại
									</label>
									<input
										type="tel"
										placeholder="0912 xxx xxx"
										className="ring-primary w-full rounded-2xl bg-white/10 px-6 py-4 text-white transition-all outline-none focus:ring-2"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-bold tracking-wider text-zinc-400 uppercase">
										Nhu cầu tư vấn
									</label>
									<select className="ring-primary w-full appearance-none rounded-2xl bg-white/10 px-6 py-4 text-white transition-all outline-none focus:ring-2">
										<option className="bg-dark">Hệ đào tạo tiêu chuẩn</option>
										<option className="bg-dark">Hệ chuyên & cận chuyên</option>
										<option className="bg-dark">Lớp học 1-1</option>
									</select>
								</div>
								<button
									type="button"
									className="bg-accent hover:bg-accent/90 w-full rounded-2xl py-5 text-lg font-extrabold text-white shadow-2xl transition-all active:scale-95"
								>
									Gửi yêu cầu đăng ký
								</button>
								<p className="text-center text-xs text-zinc-500">
									Vui lòng để ý điện thoại, chúng tôi sẽ liên hệ trong vòng 24h.
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
