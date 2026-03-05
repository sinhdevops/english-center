import React from "react";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-[#282828] text-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4 border-b border-[#454545] py-4 lg:px-[120px] lg:pt-[60px] lg:pb-[30px]">
				<div className="col-span-1 md:col-span-2 space-y-4">
					<Image
						src="/statics/images/logo.png"
						alt="Logo"
						width={200}
						height={200}
						className="object-contain"
					/>
					<p className="max-w-md text-white font-light">
						Hệ thống đào tạo tiếng Anh trẻ em uy tín top đầu Việt Nam về đảm bảo mục tiêu kép: Toàn diện 4 kỹ năng chuẩn Cambridge và Điểm giỏi trên trường
					</p>

					<div className="relative max-w-sm h-10">
						<input
							type="email"
							placeholder="Nhập email nhận tin tức"
							className="w-full bg-white text-slate-900 h-full py-[9px] px-4 rounded-lg focus:outline-none pr-14"
						/>
						<button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-slate-400 flex items-center justify-center rounded-full hover:text-slate-900 transition-colors">
							<ArrowRight size={20} />
						</button> 
					</div>

					<div className="flex gap-4">
						<div className="hover:bg-stem-blue flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 transition-colors">
							<Phone size={18} />
						</div>
						<div className="hover:bg-stem-blue flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-800 transition-colors">
							<MapPin size={18} />
						</div>
					</div>
				</div>

				<div>
					<h3 className="mb-6 text-lg font-medium uppercase">Khóa học</h3>
					<ul className="space-y-4 text-white font-light">
						<li className="cursor-pointer transition-colors hover:text-white ">Toán tư duy</li>
						<li className="cursor-pointer transition-colors hover:text-white ">Robotics & Coding</li>
						<li className="cursor-pointer transition-colors hover:text-white ">Tiếng Anh STEM</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-6 text-lg font-medium uppercase">THÔNG TIN LIÊN HỆ</h3>
					<ul className="space-y-4 text-white font-light">
						<li>Hotline: 091 255 1090</li>
						<li>Email: info@stemkey.edu.vn</li>
						<li>Địa chỉ: Nam An Khánh, Hà Nội</li>
					</ul>
				</div>
			</div>
			<div className="mx-auto lg:px-[120px] py-5 max-w-7xl border-t border-slate-800 px-4 text-center text-sm text-white">
				© {new Date().getFullYear()} STEMKey Education. All rights reserved.
			</div>
		</footer>
	);
};
