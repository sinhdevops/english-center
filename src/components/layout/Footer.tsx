import React from "react";
import { Phone, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-slate-900 py-12 text-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
				<div className="col-span-1 md:col-span-2">
					<Image
						src="/statics/images/logo.png"
						alt="Logo"
						width={200}
						height={200}
						className="object-contain"
					/>
					<p className="mb-6 max-w-md text-slate-400">
						Khơi dậy niềm đam mê sáng tạo và trang bị kỹ năng thế kỷ 21 cho thế hệ trẻ Việt Nam.
					</p>
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
					<h3 className="mb-6 text-lg font-bold">Khóa học</h3>
					<ul className="space-y-4 text-slate-400">
						<li className="cursor-pointer transition-colors hover:text-white">Toán tư duy</li>
						<li className="cursor-pointer transition-colors hover:text-white">Robotics & Coding</li>
						<li className="cursor-pointer transition-colors hover:text-white">Tiếng Anh STEM</li>
						<li className="cursor-pointer transition-colors hover:text-white">Kỹ năng mềm</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-6 text-lg font-bold">Liên hệ</h3>
					<ul className="space-y-4 text-slate-400">
						<li>Hotline: 091 255 1090</li>
						<li>Email: info@stemkey.edu.vn</li>
						<li>Địa chỉ: Nam An Khánh, Hà Nội</li>
					</ul>
				</div>
			</div>
			<div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 px-4 pt-12 text-center text-sm text-slate-500">
				© {new Date().getFullYear()} STEMKey Education. All rights reserved.
			</div>
		</footer>
	);
};
