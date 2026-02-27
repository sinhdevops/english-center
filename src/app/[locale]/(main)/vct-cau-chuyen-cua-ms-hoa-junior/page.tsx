import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Target, Users, Lightbulb, Trophy, Building2, Handshake, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
	return (
		<div className="flex flex-col font-sans">
			{/* Breadcrumb & Hero */}
			<section className="bg-primary relative overflow-hidden py-20 text-white lg:py-32">
				<div className="bg-accent/10 absolute top-0 right-0 h-96 w-96 rounded-full blur-[120px]" />
				<div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />

				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<nav className="flex items-center gap-2 text-sm text-zinc-300">
						<Link href="/" className="hover:text-accent transition-colors">
							Trang chủ
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="font-medium text-white">Về chúng tôi</span>
					</nav>
					<div className="mt-12 max-w-4xl">
						<h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
							Hành trình{" "}
							<span className="text-accent underline decoration-white/20 underline-offset-8">
								Trao giá trị
							</span>{" "}
							<br />
							Truyền cảm hứng
						</h1>
						<p className="mt-8 text-xl leading-relaxed text-zinc-300 md:text-2xl">
							Từ khát khao lan tỏa tình yêu tiếng Anh tới hành trình 30 cơ sở - chắp cánh cho hàng triệu
							học viên Việt Nam vươn ra thế giới.
						</p>
					</div>
				</div>
			</section>

			{/* Introduction Section with Glassmorphism */}
			<section className="relative z-20 -mt-10 px-4">
				<div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-xl md:p-16">
					<h2 className="text-accent mb-4 text-sm font-bold tracking-[0.3em] uppercase">
						Sứ mệnh Ms Hoa Junior
					</h2>
					<h3 className="text-dark font-heading mb-8 text-3xl font-extrabold md:text-4xl">
						Kiến tạo thế hệ trẻ <span className="text-primary">Tự tin & Bản lĩnh</span>
					</h3>
					<p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-600 md:text-xl">
						Cái tên Ms Hoa Junior cùng phương pháp giảng dạy độc quyền đã tạo nên bước đột phá trong lĩnh
						vực đào tạo tiếng Anh trẻ em. Chúng tôi không chỉ dạy ngôn ngữ, mà còn truyền cảm hứng để các em
						khám phá thế giới.
					</p>
					<div className="mt-10 flex flex-wrap justify-center gap-6">
						{["Phương pháp R.I.P.L", "Đội ngũ Messenger", "Môi trường Truyền cảm hứng"].map((tag) => (
							<div
								key={tag}
								className="bg-primary/5 text-primary flex items-center gap-2 rounded-full px-6 py-2 text-sm font-bold"
							>
								<CheckCircle2 className="h-4 w-4" />
								{tag}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Core Pillars - Visual Highlights */}
			<section className="py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
						{[
							{
								icon: Building2,
								title: "Về Ms Hoa Junior",
								desc: "Hệ thống đào tạo tiếng Anh toàn diện cho học sinh tiểu học, mài giũa tư duy và năng lực ngôn ngữ vượt trội.",
								color: "primary",
								img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop",
							},
							{
								icon: Users,
								title: "Đội ngũ Messenger",
								desc: "Giáo viên không chỉ là người dạy, mà là những 'Sứ giả' truyền cảm hứng, thấu hiểu và đồng hành cùng trẻ.",
								color: "accent",
								img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
							},
							{
								icon: Lightbulb,
								title: "Phương pháp R.I.P.L",
								desc: "Giúp trẻ chinh phục tiếng Anh qua những giờ học tràn đầy cảm hứng, thực hành liên tục và kiến thức chắt lọc.",
								color: "primary",
								img: "https://images.unsplash.com/photo-1503676260728-1c00da07bb5e?q=80&w=2026&auto=format&fit=crop",
							},
						].map((pillar, idx) => (
							<div
								key={idx}
								className="group shadow-premium hover:shadow-premium-hover relative overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:-translate-y-2"
							>
								<div className="relative h-48 overflow-hidden">
									<Image
										src={pillar.img}
										alt={pillar.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div
										className={`absolute inset-0 bg-${pillar.color}/40 opacity-0 transition-opacity group-hover:opacity-100`}
									/>
								</div>
								<div className="p-8">
									<div
										className={`bg-${pillar.color}/10 text-${pillar.color} mb-6 flex h-14 w-14 items-center justify-center rounded-2xl`}
									>
										<pillar.icon className="h-7 w-7" />
									</div>
									<h4 className="text-dark font-heading mb-4 text-2xl font-bold">{pillar.title}</h4>
									<p className="mb-6 leading-relaxed text-zinc-500">{pillar.desc}</p>
									<Link
										href="#"
										className="text-primary group-hover:text-accent inline-flex items-center gap-2 font-bold transition-colors"
									>
										Tìm hiểu thêm <ChevronRight className="h-4 w-4" />
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Founder Story with Visual Decoration */}
			<section className="bg-light relative overflow-hidden py-24 lg:py-40">
				<div className="absolute top-0 left-0 h-full w-full opacity-30">
					<div className="bg-primary/5 absolute top-0 left-0 h-96 w-96 rounded-full blur-[100px]" />
					<div className="bg-accent/5 absolute right-0 bottom-0 h-96 w-96 rounded-full blur-[100px]" />
				</div>

				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div className="order-2 lg:order-1">
							<h2 className="text-accent mb-4 text-sm font-bold tracking-[0.3em] uppercase">
								Nhà sáng lập
							</h2>
							<h3 className="text-dark font-heading mb-8 text-4xl font-extrabold md:text-5xl">
								Ms Hoa & <span className="text-primary italic">Hành trình 10 năm</span>
							</h3>
							<div className="space-y-6 text-lg leading-relaxed text-zinc-600">
								<p>
									Ms Hoa - nhà sáng lập Ms Hoa Junior đã miệt mài lan tỏa tình yêu ngôn ngữ tới nhiều
									thế hệ học trò. Đối với Ms Hoa, tiếng Anh không chỉ là một công cụ, mà là cánh cửa
									mở ra thế giới tâm hồn.
								</p>
								<div className="border-primary/20 border-l-4 pl-6 italic">
									&ldquo;Sứ mệnh của tôi không chỉ là dạy tiếng Anh, mà là giúp các em nhỏ tìm thấy
									niềm vui trong việc khám phá tri thức mới.&rdquo;
								</div>
								<p>
									Hành trình truyền cảm hứng của chị gắn liền với sự ra đời của các thương hiệu uy tín
									như Anh ngữ Ms Hoa, IELTS Fighter và Ms Hoa Junior.
								</p>
							</div>
							<div className="mt-12 flex flex-wrap gap-10">
								{[
									{ label: "Năm kinh nghiệm", value: "10+", color: "primary" },
									{ label: "Cơ sở toàn quốc", value: "30+", color: "accent" },
									{ label: "Học viên tin chọn", value: "100K+", color: "primary" },
								].map((stat, idx) => (
									<div key={idx}>
										<div className={`text-${stat.color} font-heading mb-1 text-4xl font-extrabold`}>
											{stat.value}
										</div>
										<div className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="relative order-1 lg:order-2">
							<div className="shadow-premium relative z-10 aspect-4/5 overflow-hidden rounded-[2rem]">
								<Image
									src="https://images.unsplash.com/photo-1544717297-fa20d00f796b?q=80&w=2024&auto=format&fit=crop"
									alt="Ms Hoa - Founder"
									fill
									className="object-cover"
								/>
							</div>
							<div className="bg-accent absolute -right-6 -bottom-6 -z-10 h-1/2 w-1/2 rounded-[2rem]" />
							<div className="bg-primary/10 absolute -top-6 -left-6 -z-10 h-1/3 w-1/3 rounded-full" />
						</div>
					</div>
				</div>
			</section>

			{/* Mission, Vision, Values - Modern Grid */}
			<section className="bg-primary py-24 text-white lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="mb-20 text-center">
						<h2 className="text-accent mb-4 text-sm font-bold tracking-[0.3em] uppercase">
							Định hướng chiến lược
						</h2>
						<h3 className="font-heading text-3xl font-extrabold md:text-5xl">Vươn tầm quốc tế</h3>
					</div>
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
						{[
							{
								icon: Target,
								title: "Sứ mệnh",
								desc: "Trao cho trẻ em Việt Nam năng lực ngôn ngữ và bộ kỹ năng toàn cầu để tự tin mở cửa tương lai rạng rỡ.",
							},
							{
								icon: Trophy,
								title: "Tầm nhìn",
								desc: "Trở thành hệ thống giáo dục tiếng Anh hàng đầu, định hình tiêu chuẩn đào tạo trẻ em chuẩn Cambridge tại Việt Nam.",
							},
							{
								icon: Handshake,
								title: "Giá trị cốt lõi",
								desc: "Đồng hành - Truyền cảm hứng - Đột phá - Tận tâm - Nhân văn làm kim chỉ nam cho mọi hoạt động.",
							},
						].map((item, idx) => (
							<div key={idx} className="flex flex-col items-center text-center">
								<div className="shadow-accent/20 mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 shadow-2xl backdrop-blur-md">
									<item.icon className="text-accent h-10 w-10" />
								</div>
								<h4 className="font-heading mb-4 text-2xl font-bold">{item.title}</h4>
								<p className="text-lg leading-relaxed text-zinc-300">{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Partners Section - Highlighted */}
			<section className="py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
						<div className="max-w-xl text-center lg:text-left">
							<h2 className="text-accent mb-4 text-sm font-bold tracking-[0.3em] uppercase">
								Mạng lưới đối tác
							</h2>
							<h3 className="text-dark font-heading mb-6 text-4xl font-extrabold md:text-5xl">
								Hơn <span className="text-primary italic">300 Tổ chức</span> <br /> Tin Tưởng Đồng Hành
							</h3>
							<p className="text-lg leading-relaxed text-zinc-600">
								Chúng tôi tự hào là đối tác Bạch Kim của IDP & CIEC, đồng hành cùng các đơn vị uy tín
								như VNExpress, IDP Việt Nam để mang lại giá trị tốt nhất cho học viên.
							</p>
						</div>
						<div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2">
							{[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className="shadow-premium flex h-32 items-center justify-center rounded-3xl border border-zinc-100 bg-white p-8 grayscale transition-all duration-300 hover:scale-105 hover:shadow-xl hover:grayscale-0 dark:border-zinc-800"
								>
									<div className="h-12 w-24 animate-pulse rounded bg-zinc-100" />
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA Section - Premium Design */}
			<section className="py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="shadow-premium relative overflow-hidden rounded-[3rem] bg-zinc-900 p-8 text-center text-white md:p-24">
						<div className="bg-primary/40 absolute -top-24 -left-24 h-64 w-64 rounded-full blur-[100px]" />
						<div className="bg-accent/20 absolute -right-24 -bottom-24 h-64 w-64 rounded-full blur-[100px]" />

						<div className="relative z-10">
							<h3 className="font-heading mb-6 text-3xl font-extrabold md:text-5xl lg:text-6xl">
								Con của bạn đã sẵn sàng để <br className="hidden md:block" />
								<span className="text-accent italic drop-shadow-sm">Khẳng định bản sắc?</span>
							</h3>
							<p className="mx-auto mb-12 max-w-2xl text-lg text-zinc-400 md:text-xl">
								Tham gia cùng hơn 100,000 học viên tại Ms Hoa Junior và bắt đầu hành trình chinh phục
								tiếng Anh chuẩn thế giới ngay hôm nay.
							</p>
							<Link
								href="/lien-he-dang-ky-nhan-tu-van.html"
								className="bg-accent hover:bg-accent/90 shadow-accent/20 inline-block rounded-full px-12 py-5 text-xl font-extrabold text-white shadow-2xl transition-all active:scale-95"
							>
								Đăng ký nhận tư vấn ngay
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
