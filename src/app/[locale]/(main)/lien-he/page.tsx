import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ChevronRight,
	Phone,
	Mail,
	MapPin,
	MessageSquare,
	Clock,
	Send,
	ArrowRight,
	Facebook,
	Instagram,
	Youtube,
	Globe,
	CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
	return (
		<div className="flex flex-col overflow-x-hidden font-sans">
			{/* Hero & Breadcrumb */}
			<section className="bg-dark relative py-20 text-white lg:py-32">
				<div className="bg-primary/20 absolute top-0 right-0 h-full w-1/2 blur-[120px]" />
				<div className="bg-accent/10 absolute bottom-0 left-0 h-1/2 w-full blur-[100px]" />

				<div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
					<nav className="flex items-center gap-2 text-sm text-zinc-400">
						<Link href="/" className="hover:text-accent transition-colors">
							Trang chủ
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="font-medium text-white">Liên hệ</span>
					</nav>

					<div className="mt-16 text-center lg:max-w-3xl lg:text-left">
						<h1 className="font-heading text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
							Kết nối <br />
							<span className="text-accent italic underline decoration-white/10 underline-offset-8">
								Tương lai
							</span>
						</h1>
						<p className="mt-10 text-xl leading-relaxed text-zinc-400 md:text-2xl">
							Đội ngũ Ms Hoa Junior luôn sẵn sàng lắng nghe và đồng hành cùng phụ huynh trên hành trình
							khai phá tiềm năng tiếng Anh của con.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Channels & Form */}
			<section className="relative -mt-20 pt-24 lg:pt-32">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
						{/* Left: Contact Info */}
						<div className="space-y-8 lg:col-span-5">
							<div className="group shadow-premium rounded-[3rem] border border-zinc-50 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
								<h2 className="text-dark font-heading mb-8 text-3xl font-bold">Thông tin liên hệ</h2>

								<div className="space-y-8">
									<div className="flex gap-6">
										<div className="bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
											<Phone className="h-6 w-6" />
										</div>
										<div>
											<p className="mb-1 text-xs font-bold tracking-widest text-zinc-400 uppercase">
												Hotline tư vấn
											</p>
											<p className="text-dark text-xl font-bold">0965 500 306</p>
											<p className="mt-1 text-sm text-zinc-500">
												Hỗ trợ 24/7 (Miễn phí cuộc gọi)
											</p>
										</div>
									</div>

									<div className="flex gap-6">
										<div className="bg-accent/10 text-accent flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
											<Mail className="h-6 w-6" />
										</div>
										<div>
											<p className="mb-1 text-xs font-bold tracking-widest text-zinc-400 uppercase">
												Địa chỉ Email
											</p>
											<p className="text-dark text-xl font-bold">tuvan@mshoajunior.edu.vn</p>
											<p className="mt-1 text-sm text-zinc-500">
												Chúng tôi phản hồi trong vòng 2h
											</p>
										</div>
									</div>

									<div className="flex gap-6">
										<div className="bg-dark/5 text-dark flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
											<Clock className="h-6 w-6" />
										</div>
										<div>
											<p className="mb-1 text-xs font-bold tracking-widest text-zinc-400 uppercase">
												Giờ làm việc
											</p>
											<p className="text-dark text-xl font-bold">08:00 - 21:00</p>
											<p className="mt-1 text-sm text-zinc-500">Từ Thứ Hai đến Chủ Nhật</p>
										</div>
									</div>
								</div>

								<div className="mt-12 border-t border-zinc-100 pt-10">
									<p className="text-dark mb-6 font-bold">Theo dõi chúng tôi tại:</p>
									<div className="flex gap-4">
										{[
											{ icon: Facebook, color: "hover:bg-[#1877F2]" },
											{ icon: Instagram, color: "hover:bg-[#E4405F]" },
											{ icon: Youtube, color: "hover:bg-[#FF0000]" },
											{ icon: Globe, color: "hover:bg-primary" },
										].map((social, i) => (
											<button
												key={i}
												className={`flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-zinc-500 transition-all duration-300 hover:text-white ${social.color}`}
											>
												<social.icon className="h-5 w-5" />
											</button>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Right: Lead Form */}
						<div className="lg:col-span-7">
							<div className="shadow-premium relative rounded-[3.5rem] border border-zinc-50 bg-white p-8 md:p-16">
								<div className="mb-12">
									<h2 className="text-dark font-heading mb-4 text-4xl font-extrabold">
										Gửi yêu cầu tư vấn
									</h2>
									<p className="text-lg text-zinc-500">
										Vui lòng để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ tư vấn lộ trình
										học phù hợp nhất cho con.
									</p>
								</div>

								<form className="space-y-8">
									<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
										<div className="space-y-2">
											<label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
												Họ và tên phụ huynh
											</label>
											<input
												type="text"
												placeholder="Nguyễn Văn A"
												className="text-dark focus:ring-primary/5 focus:border-primary w-full rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-4 transition-all outline-none focus:ring-4"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
												Số điện thoại
											</label>
											<input
												type="tel"
												placeholder="09xx xxx xxx"
												className="text-dark focus:ring-primary/5 focus:border-primary w-full rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-4 transition-all outline-none focus:ring-4"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
										<div className="space-y-2">
											<label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
												Email (Không bắt buộc)
											</label>
											<input
												type="email"
												placeholder="example@mail.com"
												className="text-dark focus:ring-primary/5 focus:border-primary w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 shadow-sm transition-all outline-none focus:ring-4"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
												Quan tâm khóa học
											</label>
											<select className="text-dark focus:ring-primary/5 focus:border-primary w-full cursor-pointer appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 shadow-sm transition-all outline-none focus:ring-4">
												<option>Hệ tiêu chuẩn 4 kỹ năng</option>
												<option>Hệ chuyên & cận chuyên</option>
												<option>Lớp học 1-1 / Nhóm nhỏ</option>
												<option>IELTS Master Junior</option>
											</select>
										</div>
									</div>

									<div className="space-y-2">
										<label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
											Lời nhắn cho chúng tôi
										</label>
										<textarea
											rows={4}
											placeholder="Tôi muốn hỏi về..."
											className="text-dark focus:ring-primary/5 focus:border-primary w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 shadow-sm transition-all outline-none focus:ring-4"
										></textarea>
									</div>

									<button className="bg-primary hover:bg-primary/95 shadow-primary/20 flex w-full items-center justify-center gap-3 rounded-2xl py-6 text-xl font-extrabold text-white shadow-xl transition-all active:scale-95">
										<Send className="h-6 w-6" />
										Gửi thông tin ngay
									</button>

									<p className="text-center text-sm text-zinc-400 italic">
										* Thông tin của quý phụ huynh hoàn toàn được bảo mật.
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Campuses Hub */}
			<section className="bg-light py-24 lg:py-40">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="mb-20 text-center">
						<h2 className="text-accent mb-4 text-sm font-bold tracking-[0.4em] uppercase">
							Hệ thống trung tâm
						</h2>
						<h3 className="text-dark font-heading text-4xl font-extrabold md:text-5xl lg:text-6xl">
							Hiện diện <span className="text-primary italic">Toàn quốc</span>
						</h3>
						<p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">
							Với hơn 50 cơ sở trải dài 3 miền Bắc - Trung - Nam, chúng tôi luôn ở gần và sẵn sàng phục vụ
							con bạn tốt nhất.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								city: "Đà Nẵng",
								locations: [
									{
										name: "Cơ sở Thanh Khê",
										address: "103-105 Hàm Nghi, Vĩnh Trung, Thanh Khê",
										phone: "02363 572 009",
									},
									{
										name: "Cơ sở Liên Chiểu",
										address: "254 Tôn Đức Thắng, Hòa Minh, Liên Chiểu",
										phone: "02366 295 757",
									},
									{
										name: "Cơ sở Ngũ Hành Sơn",
										address: "226 Ngũ Hành Sơn, Mỹ An, Ngũ Hành Sơn",
										phone: "02366 538 899",
									},
								],
								img: "https://images.unsplash.com/photo-1559592481-74488ea01cf1?q=80&w=2073&auto=format&fit=crop",
							},
							{
								city: "Hà Nội",
								locations: [
									{
										name: "Cơ sở Cầu Giấy",
										address: "40 Nguyễn Hoàng, Mỹ Đình 2, Nam Từ Liêm",
										phone: "02466 512 009",
									},
									{
										name: "Cơ sở Hà Đông",
										address: "18 Liền kề 11 Khu đô thị Xa La, Hà Đông",
										phone: "02466 512 010",
									},
									{
										name: "Cơ sở Long Biên",
										address: "432 Nguyễn Văn Cừ, Gia Thụy, Long Biên",
										phone: "02366 538 899",
									},
								],
								img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
							},
							{
								city: "TP. Hồ Chí Minh",
								locations: [
									{
										name: "Cơ sở Quận 10",
										address: "596 Sư Vạn Hạnh, Phường 10, Quận 10",
										phone: "02822 430 022",
									},
									{
										name: "Cơ sở Gò Vấp",
										address: "672A Phan Văn Trị, Phường 10, Gò Vấp",
										phone: "02822 430 023",
									},
									{
										name: "Cơ sở Thủ Đức",
										address: "215 Nam Hòa, Phước Long A, Quận 9",
										phone: "02822 430 024",
									},
								],
								img: "https://images.unsplash.com/photo-1567117632960-56e34a4c2456?q=80&w=2070&auto=format&fit=crop",
							},
						].map((city, idx) => (
							<div
								key={idx}
								className="group shadow-premium overflow-hidden rounded-[3rem] bg-white transition-all duration-500 hover:shadow-2xl"
							>
								<div className="relative h-60">
									<Image
										src={city.img}
										alt={city.city}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="from-dark/60 absolute inset-0 bg-gradient-to-t to-transparent" />
									<h4 className="font-heading absolute bottom-6 left-8 text-3xl font-extrabold text-white">
										{city.city}
									</h4>
								</div>
								<div className="space-y-8 p-10">
									{city.locations.map((loc, lIdx) => (
										<div key={lIdx} className="space-y-3">
											<div className="text-primary flex items-center gap-2 font-bold">
												<MapPin className="h-4 w-4" />
												<span className="text-sm tracking-wider uppercase">{loc.name}</span>
											</div>
											<p className="leading-relaxed font-medium text-zinc-600">{loc.address}</p>
											<div className="flex items-center gap-2 text-sm text-zinc-400">
												<Phone className="h-3.5 w-3.5" />
												<span>{loc.phone}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>

					<div className="mt-20 text-center">
						<Link
							href="/he-thong-co-so"
							className="text-primary inline-flex items-center gap-3 text-lg font-extrabold transition-all hover:gap-5"
						>
							Xem tất cả 50+ cơ sở toàn Việt Nam <ArrowRight className="h-6 w-6" />
						</Link>
					</div>
				</div>
			</section>

			{/* FAQ or Help CTA */}
			<section className="py-24 lg:py-32">
				<div className="bg-dark relative mx-auto max-w-5xl overflow-hidden rounded-[4rem] p-12 px-4 text-center md:p-24 lg:px-8">
					<div className="bg-primary/20 absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl" />
					<div className="bg-accent/10 absolute -right-24 -bottom-24 h-64 w-64 rounded-full blur-3xl" />

					<h3 className="font-heading relative z-10 mb-8 text-4xl font-extrabold text-white">
						Bạn vẫn còn thắc mắc?
					</h3>
					<p className="relative z-10 mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-zinc-400">
						Đừng ngần ngại trò truyện trực tiếp với tư vấn viên của chúng tôi để được giải đáp mọi câu hỏi
						về khóa học.
					</p>

					<div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
						<button className="bg-primary hover:bg-primary/90 flex items-center gap-3 rounded-2xl px-12 py-5 font-bold text-white transition-all">
							<MessageSquare className="h-5 w-5" />
							Chat qua Zalo
						</button>
						<button className="rounded-2xl border border-white/20 bg-white/10 px-12 py-5 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
							Gọi tư vấn ngay
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
