import React from "react";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-[#282828] text-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 border-b border-[#454545] px-4 py-4 md:grid-cols-4 lg:px-[120px] lg:pt-[60px] lg:pb-[30px]">
				<div className="col-span-1 space-y-4 md:col-span-2">
					<Image
						src="/statics/images/logo.png"
						alt="Logo"
						width={200}
						height={200}
						className="object-contain"
					/>
					<p className="max-w-md font-light text-white">
						Hệ thống đào tạo tiếng Anh trẻ em uy tín top đầu Việt Nam về đảm bảo mục tiêu kép: Toàn diện 4
						kỹ năng chuẩn Cambridge và Điểm giỏi trên trường
					</p>

					<div className="relative h-10 max-w-sm">
						<label htmlFor="footer-email" className="sr-only">
							Nhập email nhận tin tức
						</label>
						<input
							id="footer-email"
							type="email"
							placeholder="Nhập email nhận tin tức"
							className="h-full w-full rounded-lg bg-white px-4 py-[9px] pr-14 text-slate-900 focus:outline-none"
						/>
						<button
							aria-label="Đăng ký nhận bản tin"
							className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-400 transition-colors hover:text-slate-900"
						>
							<ArrowRight size={20} aria-hidden="true" />
						</button>
					</div>

					<div className="flex gap-4">
						<button
							aria-label="Gọi hotline"
							className="hover:bg-stem-blue flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 transition-colors"
						>
							<Phone size={18} aria-hidden="true" />
						</button>
						<button
							aria-label="Xem bản đồ cơ sở"
							className="hover:bg-stem-blue flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 transition-colors"
						>
							<MapPin size={18} aria-hidden="true" />
						</button>
					</div>
				</div>

				<div>
					<h3 className="mb-6 text-lg font-medium uppercase">Khóa học</h3>
					<ul className="space-y-4 font-light text-white">
						<li className="cursor-pointer transition-colors hover:text-white">Toán tư duy</li>
						<li className="cursor-pointer transition-colors hover:text-white">Robotics & Coding</li>
						<li className="cursor-pointer transition-colors hover:text-white">Tiếng Anh STEM</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-6 text-lg font-medium uppercase">THÔNG TIN LIÊN HỆ</h3>
					<ul className="space-y-4 font-light text-white">
						<li>Hotline: 091 255 1090</li>
						<li>Email: info@stemkey.edu.vn</li>
						<li>Địa chỉ: Nam An Khánh, Hà Nội</li>
					</ul>
				</div>
			</div>
			<div className="mx-auto max-w-7xl border-t border-slate-800 px-4 py-5 text-center text-sm text-white lg:px-[120px]">
				© {new Date().getFullYear()} STEMKey Education. All rights reserved.
			</div>
		</footer>
	);
};
