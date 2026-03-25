"use client";

import React from"react";
import Image from"next/image";
import Link from"next/link";
import { useParams } from"next/navigation";
import { Calendar, Book } from"lucide-react";
import { PROGRAMS_DETAIL_DATA } from"@/constants";
import { Breadcrumb } from"@/components/ui/breadcrumb";

export default function ProgramDetailPage() {
	const { slug } = useParams();
	const program = PROGRAMS_DETAIL_DATA[slug as string];

	if (!program) {
		return (
			<div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
				<h1 className="text-4xl font-bold">404</h1>
				<p className="text-slate-500">Không tìm thấy chương trình học này</p>
				<Link href="/" className="text-stem-blue font-bold hover:underline">
					Quay lại trang chủ
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50/30">
			{/* Breadcrumb Section */}
			<div className="border-b border-slate-100 bg-white py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb
						items={[
							{ label:"Học online", href:"#" },
							{ label: program.breadcrumb, active: true },
						]}
						variant="dark"
					/>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
				<div className="flex flex-col gap-10 lg:flex-row">
					{/* Main Content Area */}
					<div className="w-full lg:w-2/3">
						{/* Banner Banner */}
						<div className="relative mb-8 aspect-20/11 overflow-hidden rounded-xl sm:aspect-16/7">
							<div className="absolute inset-0 bg-linear-to-r from-[#e96443] to-[#904e95]" />
							<div className="relative z-10 flex h-full items-center justify-between px-6 sm:px-10">
								<div className="z-20 max-w-[65%] text-white sm:max-w-xs">
									<h1 className="text-xl leading-tight font-black sm:text-3xl lg:text-5xl">
										{program.bannerTitle}
									</h1>
									<div className="mt-2 inline-block rounded-md bg-[#004a87] px-3 py-1.5 text-[10px] font-black tracking-widest uppercase sm:mt-4 sm:px-4 sm:text-base lg:text-xl">
										{program.bannerSubtitle}
									</div>
								</div>
								<div className="relative h-[85%] w-[45%] self-end sm:h-full sm:w-1/2">
									<Image
										src={program.img}
										alt={program.title}
										fill
										className="object-contain object-bottom-right"
										referrerPolicy="no-referrer"
										priority
									/>
								</div>
							</div>
							<div className="absolute right-0 bottom-0 left-0 h-1 bg-white/20" />
						</div>

						{/* Description Content */}
						<div className="rounded-4xl bg-white p-8 lg:p-12">
							<h2 className="mb-6 text-2xl font-black text-slate-800 lg:text-4xl">{program.title}</h2>
							<div className="prose prose-slate max-w-none space-y-6 leading-relaxed text-slate-600">
								<p className="border-stem-blue border-l-4 pl-6 text-lg font-medium text-slate-900 italic">
									{program.description}
								</p>
								<p className="text-justify text-base">{program.content}</p>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="w-full space-y-8 lg:w-1/3">
						{/* Registration CTA */}
						<div className="overflow-hidden rounded-4xl border border-slate-100 bg-white p-2">
							<div className="p-6 text-center">
								<p className="mb-2 text-sm font-medium text-slate-500">Thay đổi để đón cơ hội mới</p>
								<p className="mb-6 font-bold text-slate-800">Nhận lộ trình FREE cho con</p>
								<Link href="/khoa-hoc/dang-ky" className="block w-full">
									<button className="bg-stem-blue w-full rounded-xl py-4 text-base font-black tracking-widest text-white transition-all hover:bg-[#a01830] active:scale-[0.98]">
										{">>> Tôi sẵn sàng <<<"}
									</button>
								</Link>
							</div>
						</div>

						{/* Quick Links Menu */}
						<div className="overflow-hidden rounded-4xl border border-slate-100 bg-white">
							<div className="border-b border-slate-50 bg-slate-50/30 p-5 px-8">
								<h3 className="h-4 leading-none font-black text-slate-900">Liên kết nhanh</h3>
							</div>
							<div className="divide-y divide-slate-50">
								<div className="group flex cursor-pointer items-center justify-between p-5 px-8 transition-colors hover:bg-slate-50">
									<div className="flex items-center gap-3">
										<Calendar size={18} className="text-stem-blue" />
										<span className="text-sm font-bold text-slate-600">Lịch khai giảng</span>
									</div>
									<Link
										href="/lich-khai-giang"
										className="text-stem-blue flex items-center gap-1 text-[10px] font-black tracking-tighter uppercase"
									>
										Xem chi tiết
									</Link>
								</div>
								<div className="group flex cursor-pointer items-center justify-between p-5 px-8 transition-colors hover:bg-slate-50">
									<div className="flex items-center gap-3">
										<Book size={18} className="text-stem-blue" />
										<Link href="/khoa-hoc/dang-ky" className="text-sm font-bold text-slate-600">
											Giáo trình tự học {program.title}
										</Link>
									</div>
									<span className="text-stem-blue flex items-center gap-1 text-[10px] font-black tracking-tighter uppercase">
										Xem chi tiết
									</span>
								</div>
							</div>
						</div>

						{/* Roadmap List */}
						<div className="space-y-4">
							<h3 className="border-stem-blue inline-block border-b-2 px-2 pb-1 text-lg font-black text-slate-900">
								Lộ trình học miễn phí
							</h3>
							<div className="space-y-3">
								{program.roadmap.map((item: string, idx: number) => (
									<div
										key={idx}
										className="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-all"
									>
										<div className="text-stem-blue border-stem-blue flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-white text-sm font-bold">
											{idx + 1}
										</div>
										<span className="text-sm font-bold text-slate-700">{item}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
