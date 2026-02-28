"use client";

import { motion } from "motion/react";
import { Zap } from "lucide-react";

const Hero = () => {
	return (
		<section className="relative flex min-h-[600px] items-center overflow-hidden lg:min-h-[700px]">
			{/* Tech/Circuit Background Pattern */}
			<div className="pointer-events-none absolute inset-0 z-10 opacity-20">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 1000 1000"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					<path
						d="M0 100 L100 100 L150 150 L300 150 M400 50 L450 100 L600 100 M700 200 L800 200 L850 250 M100 400 L200 400 L250 350 M500 600 L600 600 L650 650 M800 800 L900 800 L950 750"
						fill="none"
						stroke="#1d8cf8"
						strokeWidth="1"
						strokeDasharray="5,5"
					/>
					<circle cx="100" cy="100" r="3" fill="#1d8cf8" />
					<circle cx="300" cy="150" r="3" fill="#1d8cf8" />
					<circle cx="600" cy="100" r="3" fill="#1d8cf8" />
					<circle cx="850" cy="250" r="3" fill="#1d8cf8" />
				</svg>
			</div>

			{/* Background Gradient */}
			<div
				className="absolute inset-0 z-0"
				style={{ background: "linear-gradient(280.15deg, #FFCFDF 15.09%, #82ADE9 93.34%)" }}
			/>

			<div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 py-12 lg:flex-row lg:gap-8 lg:py-0">
				<div className="w-full text-center lg:w-3/5 lg:text-left">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.span
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className="text-stem-blue mb-6 inline-block rounded-full border border-white/20 bg-white/30 px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md lg:text-sm"
						>
							Hệ thống giáo dục STEM hàng đầu
						</motion.span>

						<h2 className="mb-2 text-2xl leading-tight font-black tracking-tight text-slate-900 sm:text-4xl lg:mb-4 lg:text-6xl">
							Phát triển toàn diện
						</h2>
						<h3 className="mb-8 text-xl leading-tight font-black tracking-tight text-[#19B24B] sm:text-3xl lg:mb-10 lg:text-5xl">
							Tư duy – Ngôn ngữ – Công nghệ
						</h3>

						<div className="mb-10 inline-block space-y-4 text-left lg:mb-12">
							{[
								"Toán tư duy – Rèn logic & suy luận nền tảng",
								"Robotics – Lắp ráp, lập trình, phát triển STEM",
								"Tiếng Anh – Nghe nói tự nhiên, tự tin giao tiếp",
							].map((text, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 + i * 0.1 }}
									className="flex items-center gap-3 text-base font-semibold text-slate-700 lg:text-lg"
								>
									<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#19B24B] text-white">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="4"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-3 w-3"
										>
											<polyline points="20 6 9 17 4 12"></polyline>
										</svg>
									</div>
									<span>{text}</span>
								</motion.div>
							))}
						</div>

						<div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
							<button className="w-full transform rounded-2xl bg-[#0A7DFF] px-8 py-4 text-sm font-black tracking-wider text-white uppercase shadow-xl shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95 sm:w-auto">
								Đăng ký học thử miễn phí
							</button>
							<button className="w-full transform rounded-2xl border border-white/50 bg-white/80 px-8 py-4 text-sm font-black tracking-wider text-slate-800 uppercase shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95 sm:w-auto">
								Tư vấn lộ trình học
							</button>
						</div>
					</motion.div>
				</div>

				<div className="relative flex w-full justify-center lg:w-2/5 lg:justify-end">
					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						transition={{ duration: 1, type: "spring", bounce: 0.4 }}
						className="relative w-full max-w-[450px] lg:max-w-none"
					>
						{/* Decorative Elements */}
						<div className="absolute -top-10 -right-10 h-32 w-32 animate-pulse rounded-full bg-yellow-400 opacity-20 blur-3xl" />
						<div className="absolute -bottom-10 -left-10 h-40 w-40 animate-pulse rounded-full bg-blue-400 opacity-20 blur-3xl" />

						<div className="relative z-10 overflow-hidden rounded-[2rem] border-8 border-white/30 shadow-2xl backdrop-blur-sm">
							<img
								src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000"
								alt="STEMKey Students"
								className="aspect-[4/5] h-full w-full object-cover lg:aspect-auto lg:h-[600px]"
								referrerPolicy="no-referrer"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

							{/* Floating Badge */}
							<div className="absolute right-6 bottom-6 left-6 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur-md">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
										<Zap size={20} fill="currentColor" />
									</div>
									<div>
										<div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
											Học viên xuất sắc
										</div>
										<div className="text-sm font-black text-slate-900">
											Hơn 5000+ học sinh tin tưởng
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

const Programs = () => {
	const programs = [
		{
			title: "Toán tư duy",
			desc: "Phát triển tư duy - Vững nền tảng",
			gradient: "from-[#7c3a11] to-[#d97706]",
			img: "https://img.freepik.com/free-vector/cute-girl-reading-book-cartoon-character_1308-133857.jpg",
		},
		{
			title: "Robotics",
			desc: "Lắp ráp & lập trình - Tư duy Stem",
			gradient: "from-[#166534] to-[#fbbf24]",
			img: "https://img.freepik.com/free-vector/cute-girl-reading-book-cartoon-character_1308-133857.jpg",
		},
		{
			title: "Tiếng anh",
			desc: "Nghe nói tự nhiên - Tự tin giao tiếp",
			gradient: "from-[#1e3a8a] to-[#db2777]",
			img: "https://img.freepik.com/free-vector/cute-girl-reading-book-cartoon-character_1308-133857.jpg",
		},
	];

	return (
		<section className="bg-white py-24">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-12 text-center lg:mb-20">
					<h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-4xl lg:mb-6 lg:text-5xl">
						Các chương trình học tại STEMKey
					</h2>
					<p className="mx-auto max-w-3xl text-base font-medium text-slate-500 lg:text-lg">
						Hệ thống giáo dục dành cho trẻ 4-10 tuổi, phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ
					</p>
				</div>

				<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
					{programs.map((p, i) => (
						<motion.div
							key={i}
							whileHover={{ y: -12, scale: 1.02 }}
							className={`relative overflow-hidden rounded-3xl bg-gradient-to-br p-10 text-white ${p.gradient} flex h-[280px] flex-col justify-between shadow-xl`}
						>
							<div className="relative z-10 w-3/5">
								<h3 className="mb-3 text-3xl font-bold">{p.title}</h3>
								<p className="mb-8 text-sm leading-relaxed opacity-90">{p.desc}</p>
								<button className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:bg-white/20">
									Xem chi tiết
								</button>
							</div>
							<div className="pointer-events-none absolute right-0 bottom-0 flex h-full w-1/2 items-end justify-end p-4">
								<img
									src={p.img}
									alt={p.title}
									className="h-4/5 w-full object-contain"
									referrerPolicy="no-referrer"
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

const ExclusiveModel = () => {
	const items = [
		{ id: "4H", text: "Xem trước bài giảng" },
		{ id: "3H", text: "Học trên lớp cùng giáo viên" },
		{ id: "1H", text: "Ba mẹ đồng hành cùng con học tập" },
		{ id: "6H", text: "Trợ giảng hỗ trợ học tập của con" },
	];

	return (
		<section className="bg-white py-24">
			<div className="mx-auto max-w-7xl px-4">
				<div className="mb-12 text-center lg:mb-20">
					<h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-4xl lg:mb-6 lg:text-5xl">
						Mô hình lớp học độc quyền
					</h2>
					<p className="mx-auto max-w-4xl text-base leading-relaxed font-medium text-slate-500 lg:text-lg">
						Lớp học đảo ngược thúc đẩy khả năng tự học, tính chủ động và tích cực trong học tập ở học trò,
						các con không phụ thuộc, chờ thầy cô đưa kiến thức.
					</p>
				</div>

				<div className="flex flex-col items-stretch gap-16 lg:flex-row">
					<div className="flex w-full flex-col justify-center space-y-6 lg:w-1/2">
						{items.map((item, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.15 }}
								className="flex cursor-default items-center gap-6 rounded-2xl border border-slate-50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow hover:shadow-md"
							>
								<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#0a1d4d] text-xl font-black text-white">
									{item.id}
								</div>
								<span className="text-lg font-semibold text-slate-800">{item.text}</span>
							</motion.div>
						))}
					</div>
					<div className="w-full lg:w-1/2">
						<div className="relative h-full min-h-[400px] overflow-hidden rounded-[40px] shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000"
								alt="Mô hình lớp học"
								className="h-full w-full object-cover"
								referrerPolicy="no-referrer"
							/>
							<div className="absolute inset-0 bg-black/5" />
							<div className="absolute right-4 bottom-4 lg:right-12 lg:bottom-12">
								<div className="rounded-2xl border border-white/20 bg-white/95 p-4 text-center shadow-2xl backdrop-blur-sm lg:rounded-3xl lg:p-8">
									<h4 className="mb-1 text-sm font-bold tracking-widest text-[#c41e3a] uppercase lg:mb-3 lg:text-xl">
										Mô hình lớp học
									</h4>
									<div className="text-2xl font-black tracking-[0.1em] text-slate-900 lg:text-5xl lg:tracking-[0.2em]">
										4-3-1-6
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default function HomePage() {
	return (
		<div className="bg-white">
			<Hero />
			<Programs />
			<ExclusiveModel />
		</div>
	);
}
