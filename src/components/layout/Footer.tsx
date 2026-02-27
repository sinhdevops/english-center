import React from "react";
import Link from "next/link";
import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-dark pt-16 pb-8 text-white">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand Column */}
					<div>
						<div className="text-primary mb-6 inline-block rounded-md bg-white px-3 py-1 text-xl font-bold tracking-tighter shadow-sm">
							MS HOA <span className="text-accent">JUNIOR</span>
						</div>
						<p className="mb-6 text-sm leading-relaxed text-zinc-400">
							Hệ thống Anh ngữ Ms Hoa Junior - Tiếng Anh trẻ em chuẩn Cambridge. Chúng tôi mang đến phương
							pháp học tập hiện đại, truyền cảm hứng giúp trẻ tự tin chinh phục tương lai.
						</p>
						<div className="flex gap-4">
							<a
								href="#"
								className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors"
							>
								<Facebook className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-red-600"
							>
								<Youtube className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Contact Column */}
					<div>
						<h3 className="border-accent mb-6 border-l-4 pl-4 text-lg font-bold">Thông tin liên hệ</h3>
						<ul className="space-y-4 text-sm text-zinc-400">
							<li className="flex items-start gap-3">
								<MapPin className="text-accent h-5 w-5 shrink-0" />
								<span>Hệ thống cơ sở trên toàn quốc (Hà Nội, TP.HCM, Đà Nẵng...)</span>
							</li>
							<li className="flex items-center gap-3">
								<Phone className="text-accent h-5 w-5 shrink-0" />
								<span>0965 500 306</span>
							</li>
							<li className="flex items-center gap-3">
								<Mail className="text-accent h-5 w-5 shrink-0" />
								<span>junior@mshoajunior.edu.vn</span>
							</li>
						</ul>
					</div>

					{/* Quick Links Column */}
					<div>
						<h3 className="border-accent mb-6 border-l-4 pl-4 text-lg font-bold">Liên kết nhanh</h3>
						<ul className="space-y-3 text-sm text-zinc-400">
							<li>
								<Link
									href="/vct-cau-chuyen-cua-ms-hoa-junior.html"
									className="transition-colors hover:text-white"
								>
									Về chúng tôi
								</Link>
							</li>
							<li>
								<Link href="/khoa-hoc-tieu-chuan.html" className="transition-colors hover:text-white">
									Khóa học
								</Link>
							</li>
							<li>
								<Link href="/tai-lieu.html" className="transition-colors hover:text-white">
									Tài liệu học tập
								</Link>
							</li>
							<li>
								<Link href="/tin-tuc.html" className="transition-colors hover:text-white">
									Tin tức & Sự kiện
								</Link>
							</li>
						</ul>
					</div>

					{/* Map or App Preview */}
					<div>
						<h3 className="border-accent mb-6 border-l-4 pl-4 text-lg font-bold">Bản đồ</h3>
						<div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-800">
							{/* Mock Map Placeholder */}
							<p className="px-4 text-center text-xs text-zinc-500">
								Bản đồ hệ thống cơ sở
								<br />
								Ms Hoa Junior
							</p>
						</div>
					</div>
				</div>

				<div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-zinc-500">
					© {new Date().getFullYear()} Ms Hoa Junior. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
