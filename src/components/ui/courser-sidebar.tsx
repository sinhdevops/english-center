import React from "react";
import { Facebook, Youtube, Phone, Mail, MessageCircle, Play } from "lucide-react";

export const CourserSidebar: React.FC = () => (
	<aside className="space-y-12">
		{/* Courses */}
		<div>
			<h4 className="mb-6 inline-block border-b-2 border-[#c41e3a] pb-2 text-xl font-bold text-slate-900">
				Các khóa học
			</h4>
			<div className="space-y-4">
				{[
					{
						title: "TIẾNG ANH TIỂU HỌC",
						img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
					},
					{
						title: "TIẾNG ANH THCS",
						img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
					},
					{
						title: "LUYỆN THI - LUYỆN KỸ NĂNG",
						img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400",
					},
				].map((course, i) => (
					<div
						key={i}
						className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl shadow-md"
					>
						<img
							src={course.img}
							alt={course.title}
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							referrerPolicy="no-referrer"
						/>
						<div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
						<div className="absolute inset-0 flex items-center justify-center p-6">
							<h5 className="text-center text-xl leading-tight font-black text-white drop-shadow-lg">
								{course.title}
							</h5>
						</div>
					</div>
				))}
			</div>
		</div>
		{/* Social Media */}
		<div>
			<h4 className="mb-6 inline-block border-b-2 border-[#c41e3a] pb-2 text-xl font-bold text-slate-900">
				Mạng xã hội
			</h4>
			<div className="relative space-y-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#f27121] to-[#e94057] p-6">
				{/* Decorative dots */}
				<div className="absolute top-2 left-2 h-1 w-1 rounded-full bg-white/40" />
				<div className="absolute right-4 bottom-4 h-2 w-2 rounded-full bg-white/40" />

				<button className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50">
					<Facebook className="text-blue-600" size={20} fill="currentColor" />
					Fanpage STEMKey
				</button>
				<button className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50">
					<Facebook className="text-blue-600" size={20} fill="currentColor" />
					Group Cộng đồng STEMKey
				</button>
				<button className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50">
					<Youtube className="text-red-600" size={20} fill="currentColor" />
					Youtube STEMKey Việt Nam
				</button>
				<button className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50">
					<MessageCircle className="text-blue-400" size={20} fill="currentColor" />
					Zalo STEMKey Official
				</button>
				<button className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50">
					<Play className="text-black" size={20} fill="currentColor" />
					Tik Tok STEMKey
				</button>

				<div className="pt-4">
					<p className="mb-3 text-xs font-bold tracking-wider text-white uppercase opacity-90">
						Liên lạc trực tiếp
					</p>
					<button className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
							<Phone size={16} fill="currentColor" />
						</div>
						Gọi điện: <span className="ml-auto text-red-600">0965500306</span>
					</button>
				</div>
			</div>
		</div>

		{/* Newsletter */}
		<div className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
			<div className="mb-4 flex items-center gap-3">
				<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
					<Mail size={24} />
				</div>
				<h4 className="text-lg leading-tight font-black text-slate-900 uppercase">Đăng ký nhận bản tin</h4>
			</div>
			<div className="flex gap-2">
				<input
					type="email"
					placeholder="Email của bạn"
					className="flex-grow rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none"
				/>
				<button className="rounded-xl bg-[#c41e3a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700">
					Đăng ký
				</button>
			</div>
			<p className="mt-3 text-[10px] leading-relaxed text-slate-400">
				Đăng ký email để nhận bản tin mới nhất của chúng tôi.
			</p>
		</div>
	</aside>
);
