import React from "react";
// Removed Phone and MapPin icons as they are no longer used in the footer
import Image from "next/image";
import { PROGRAMS_DATA } from "@/constants";
import Link from "next/link";
import { FooterCta } from "./FooterCta";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-white text-gray-800">
			<div className="px-4 lg:px-0">

				<FooterCta />

			</div>
			<div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 border-b border-gray-200 px-4 lg:px-0 py-8 md:grid-cols-[3fr_2fr_2fr_3fr] lg:pt-15 lg:pb-7.5">
				<div className="col-span-2 space-y-4 md:col-span-1">
					<Image
						src="/statics/images/logo.svg"
						alt="Logo"
						width={160}
						height={60}
						className="object-contain"
					/>
					<p className="max-w-xs text-sm text-gray-700">
						Hệ thống giáo dục phát triển tư duy sáng tạo và phản biện.
					</p>

					<div className="flex gap-3">
						<Link
							href="https://www.facebook.com/people/STEMKey-Edu/61583934994908/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook"
							className="transition-transform hover:scale-110"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="16" cy="16" r="16" fill="#1877F2" />
								<path
									d="M20.5 16.7h-3v8h-3.5v-8h-2v-3h2v-2.2c0-2.8 1.4-4.3 4-4.3h2.5v3h-1.6c-1.3 0-1.6.6-1.6 1.5v2h3.2l-.5 3z"
									fill="white"
								/>
							</svg>
						</Link>
						<Link
							href="https://youtube.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="YouTube"
							className="transition-transform hover:scale-110"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="16" cy="16" r="16" fill="#FF0000" />
								<path
									d="M23.1558 11.2333C22.95 10.4667 22.35 9.87334 21.5834 9.66667C20.2167 9.3 16 9.3 16 9.3C16 9.3 11.7834 9.3 10.4168 9.66334C9.65013 9.86667 9.05013 10.4667 8.84346 11.2333C8.48346 12.6033 8.48346 15.4333 8.48346 15.4333C8.48346 15.4333 8.48346 18.2633 8.84346 19.6367C9.04679 20.4033 9.64679 21.0033 10.4135 21.21C11.7801 21.5767 16.0001 21.5767 16.0001 21.5767C16.0001 21.5767 20.2168 21.5767 21.5868 21.2133C22.3535 21.01 22.9535 20.41 23.1601 19.6433C23.5201 18.2733 23.5201 15.4433 23.5201 15.4433C23.5201 15.4433 23.5235 12.6133 23.1558 11.2333ZM14.4834 18.0433V12.8233L18.8434 15.4333L14.4834 18.0433Z"
									fill="white"
								/>
							</svg>
						</Link>
						<Link
							href="https://tiktok.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="TikTok"
							className="transition-transform hover:scale-110"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="16" cy="16" r="16" fill="black" />
								<path
									d="M21.5 13.8c-1.3-.1-2.4-.7-3.2-1.7v6.4c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.2 0 .4 0 .6.1v2.7c-.2 0-.4-.1-.6-.1-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V9.5h2.7c.1 1.4 1 2.5 2.5 3v1.3z"
									fill="white"
								/>
							</svg>
						</Link>
					</div>
				</div>

				<div>
					<h3 className="mb-6 text-sm font-bold uppercase tracking-wide text-gray-900">STEMKEY</h3>
					<ul className="space-y-3 text-sm text-gray-700">
						<li className="cursor-pointer transition-colors hover:text-gray-900">
							<Link href="/ve-chung-toi">Về chúng tôi</Link>
						</li>
						<li className="cursor-pointer transition-colors hover:text-gray-900">
							<Link href="/goc-ba-me">Góc ba mẹ</Link>
						</li>
						<li className="cursor-pointer transition-colors hover:text-gray-900">
							<Link href="/goc-hoc-tap">Góc học tập</Link>
						</li>
						<li className="cursor-pointer transition-colors hover:text-gray-900">
							<Link href="/tin-tuc">Tin tức</Link>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-6 text-sm font-bold uppercase tracking-wide text-gray-900">KHÓA HỌC</h3>
					<ul className="space-y-3 text-sm text-gray-700">
						{PROGRAMS_DATA.map((item) => (
							<li key={item.title} className="cursor-pointer transition-colors hover:text-gray-900">
								<Link href={`/chuong-trinh/${item.slug}`}>{item.title}</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="col-span-2 md:col-span-1">
					<h3 className="mb-6 text-sm font-bold uppercase tracking-wide text-gray-900">THÔNG TIN LIÊN HỆ</h3>
					<ul className="space-y-3 text-sm text-gray-700">
						<li>Hotline: 091 255 1090</li>
						<li>Email hỗ trợ học tập: info@stemkey.edu.vn</li>
						<li>Địa chỉ: Tầng 4 - Tòa nhà T4, Thăng Long Victory, An Khánh, Hà Nội</li>
					</ul>
				</div>
			</div>
			<div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-gray-600">
				© {new Date().getFullYear()} STEMKey Education. All rights reserved.
			</div>
		</footer>
	);
};
