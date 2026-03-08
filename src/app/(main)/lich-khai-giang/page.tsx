"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import { MapPin, Phone, ExternalLink, Calendar, BookOpen, User } from "lucide-react";
import { IMAGES } from "../../../../public/statics/images";

interface ScheduleWithJoin {
	id: string;
	branch_id: string;
	course_id: string;
	class_code: string;
	schedule: string;
	start_date: string;
	status: string;
	course: {
		name: string;
		program: {
			name: string;
		};
	};
}

interface Branch {
	id: string;
	name: string;
	address: string;
	city?: string;
}

const CITIES = [
	"TP.Hồ Chí Minh",
	"Đà Nẵng",
	"Hải Phòng",
	"Bình Dương",
	"Bắc Ninh",
	"Đồng Nai",
	"Nghệ An",
	"Thanh Hóa",
	"Hà Nội",
	"Quảng Ninh",
	"Hà Tĩnh",
	"Nha Trang",
	"Thừa Thiên Huế",
	"Vũng Tàu",
	"Lớp online",
];

export default function LichKhaiGiangPage() {
	const [activeCity, setActiveCity] = React.useState("Đà Nẵng"); // Default to Đà Nẵng as per center's focus
	const [branches, setBranches] = React.useState<Branch[]>([]);
	const [schedules, setSchedules] = React.useState<ScheduleWithJoin[]>([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [selectedBranchId, setSelectedBranchId] = React.useState<string | null>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				// Fetch branches
				const { data: bData, error: bError } = await supabase.from("branches").select("*");
				if (bError) throw bError;
				setBranches(bData || []);

				// Fetch schedules with joins
				const { data: sData, error: sError } = await supabase
					.from("schedules")
					.select(
						`
						*,
						course:courses(
							name,
							program:programs(name)
						)
					`,
					)
					.eq("status", "open")
					.order("start_date", { ascending: true });
				if (sError) throw sError;
				setSchedules((sData as any) || []);

				if (bData && bData.length > 0) {
					setSelectedBranchId(bData[0].id);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	// Filter branches by city (mock city mapping if not in DB)
	// For now, if city is not in DB, we'll just show all branches in TP.Hồ Chí Minh or current city
	const filteredBranches = branches.filter((b) => b.city === activeCity || activeCity === "Đà Nẵng" || true);
	// Since we might not have 'city' column yet, let's just show what we have

	const selectedBranch = branches.find((b) => b.id === selectedBranchId);
	const branchSchedules = schedules.filter((s) => s.branch_id === selectedBranchId);

	return (
		<div className="min-h-screen bg-[#F8FAFC]">
			{/* Banner Section */}
			<section className="relative h-[200px] w-full overflow-hidden bg-[#ED1C24] lg:h-[300px]">
				<div className="absolute inset-0 bg-linear-to-r from-[#ED1C24] via-[#F15A24] to-[#ED1C24/80]" />

				{/* Background decorative elements */}
				<div className="absolute top-0 right-0 h-full w-1/3 opacity-10">
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
						<path
							fill="#FFFFFF"
							d="M47.7,-63.2C59.9,-54.4,66.7,-38.1,70.5,-21.2C74.3,-4.3,75.1,13.2,68.9,28.7C62.7,44.2,49.5,57.7,34,66.1C18.5,74.5,0.7,77.8,-17.1,73.7C-34.9,69.6,-52.7,58.1,-63.4,42.5C-74.1,26.9,-77.7,7.2,-73.4,-10.1C-69.1,-27.4,-56.9,-42.3,-43.3,-50.9C-29.7,-59.5,-14.8,-61.8,1.6,-64C18,-66.2,35.5,-72,47.7,-63.2Z"
							transform="translate(100 100)"
						/>
					</svg>
				</div>

				<div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between px-6">
					<div className="flex flex-col gap-2 lg:gap-4">
						<motion.h1
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							className="text-3xl font-black tracking-tighter text-white uppercase md:text-5xl lg:text-7xl"
						>
							LỊCH KHAI GIẢNG
						</motion.h1>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2 }}
							className="w-fit rounded-lg bg-[#FBB03B] px-4 py-1.5 shadow-lg lg:px-6 lg:py-2"
						>
							<span className="text-sm font-bold text-[#ED1C24] uppercase lg:text-lg">
								Hệ thống giáo dục STEMKey
							</span>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="hidden h-full lg:block"
					>
						<Image
							src={IMAGES.courser}
							alt="Students"
							className="h-full w-auto object-contain object-bottom pt-10"
						/>
					</motion.div>
				</div>
			</section>

			{/* Navigation Breadcrumb & Title */}
			<div className="mx-auto max-w-7xl px-6 py-8">
				<nav className="mb-8 text-sm text-slate-500">
					<Link href="/" className="hover:text-stem-blue">
						Trang chủ
					</Link>
					<span className="mx-2">›</span>
					<span className="font-medium text-slate-900">Lịch khai giảng</span>
				</nav>

				<h2 className="mb-6 text-xl font-bold text-slate-800 uppercase">Chọn khu vực</h2>

				{/* City Filter Tabs */}
				<div className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto pb-2 whitespace-nowrap lg:flex-wrap">
					{CITIES.map((city) => (
						<button
							key={city}
							onClick={() => setActiveCity(city)}
							className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all lg:px-6 ${
								activeCity === city
									? "bg-[#ED1C24] text-white shadow-md"
									: "border border-slate-200 bg-white text-slate-600 hover:border-[#ED1C24] hover:text-[#ED1C24]"
							}`}
						>
							{city}
						</button>
					))}
				</div>

				<div className="flex flex-col gap-6 lg:flex-row">
					{/* Left: Branch Info */}
					<div className="w-full lg:w-1/3">
						<h3 className="mb-4 text-lg font-bold text-slate-800">
							Lịch khai giảng các lớp tại {activeCity}
						</h3>
						<p className="mb-8 text-sm leading-relaxed text-slate-600">
							Lộ trình đào tạo chuẩn quốc tế, giúp con khơi dậy niềm đam mê sáng tạo, tư duy logic và làm
							chủ công nghệ tương lai. Ba mẹ hãy đăng ký giữ chỗ ngay để nhận ưu đãi lên đến 40%.
						</p>

						<div className="space-y-4">
							{filteredBranches.map((branch) => (
								<motion.div
									key={branch.id}
									whileHover={{ y: -4 }}
									onClick={() => setSelectedBranchId(branch.id)}
									className={`cursor-pointer rounded-xl border-2 bg-white p-6 shadow-sm transition-all ${
										selectedBranchId === branch.id
											? "border-stem-blue ring-4 ring-blue-50/50"
											: "border-transparent"
									}`}
								>
									<h4 className="mb-3 font-bold text-slate-900">{branch.address}</h4>
									<div className="space-y-2 text-sm text-slate-500">
										<div className="flex items-center gap-2">
											<MapPin size={16} className="text-[#ED1C24]" />
											<span>{branch.name}</span>
										</div>
										<div className="flex items-center gap-2">
											<Phone size={16} className="text-[#ED1C24]" />
											<span>02866 575 760</span>
										</div>
									</div>
									<div className="mt-4 flex gap-4">
										<button className="text-stem-blue flex items-center gap-1 text-xs font-semibold uppercase hover:underline">
											<MapPin size={12} /> Chỉ đường
										</button>
										<button className="text-stem-blue flex items-center gap-1 text-xs font-semibold text-nowrap uppercase hover:underline">
											<ExternalLink size={12} /> Xem cơ sở
										</button>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Right: Schedule Display */}
					<div className="flex-1">
						<div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl lg:p-8">
							<div className="mb-8 flex items-center justify-between">
								<div>
									<h3 className="text-xl font-black tracking-tight text-slate-900 uppercase lg:text-2xl">
										Lịch khai giảng
									</h3>
									{selectedBranch && (
										<p className="mt-1 text-sm text-slate-500">{selectedBranch.address}</p>
									)}
								</div>
								<div className="hidden sm:block">
									<select
										value={selectedBranchId || ""}
										onChange={(e) => setSelectedBranchId(e.target.value)}
										className="focus:ring-stem-blue rounded-lg border border-slate-200 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
									>
										<option disabled value="">
											Chọn cơ sở
										</option>
										{branches.map((b) => (
											<option key={b.id} value={b.id}>
												{b.name}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Mobile Card List */}
							<div className="space-y-4 lg:hidden">
								<AnimatePresence mode="popLayout">
									{branchSchedules.length > 0 ? (
										branchSchedules.map((schedule, idx) => (
											<motion.div
												key={schedule.id}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: idx * 0.05 }}
												className="rounded-xl border border-slate-100 bg-slate-50/30 p-5 shadow-sm"
											>
												<div className="mb-4 flex items-start justify-between">
													<div>
														<p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
															{schedule.course?.program?.name || "Tiêu chuẩn"}
														</p>
														<h4 className="text-stem-blue text-lg leading-tight font-black">
															{schedule.course?.name || "Robotics"}
														</h4>
													</div>
													<span className="rounded bg-slate-100 px-2 py-1 font-mono text-[10px] font-bold text-slate-600">
														{schedule.class_code}
													</span>
												</div>

												<div className="mb-5 space-y-3">
													<div className="flex items-center gap-3 text-sm text-slate-600">
														<Calendar size={14} className="text-slate-400" />
														<span>{schedule.schedule}</span>
													</div>
													<div className="flex items-center gap-3 text-sm text-slate-600">
														<div className="h-4 w-4 rounded-full border-2 border-[#ED1C24]/20 p-0.5">
															<div className="h-full w-full rounded-full bg-[#ED1C24]" />
														</div>
														<span className="font-medium">
															Khai giảng:{" "}
															{new Date(schedule.start_date).toLocaleDateString("vi-VN")}
														</span>
													</div>
												</div>

												<Link href="/khoa-hoc/dang-ky">
													<button className="bg-stem-blue w-full rounded-xl py-3.5 text-sm font-black tracking-widest text-white uppercase shadow-lg shadow-blue-500/20 active:scale-95">
														Đăng ký ngay
													</button>
												</Link>
											</motion.div>
										))
									) : (
										<div className="py-10 text-center text-sm text-slate-400 italic">
											Chưa có lịch khai giảng nào cho cơ sở này.
										</div>
									)}
								</AnimatePresence>
							</div>

							{/* Desktop Table View */}
							<div className="hidden overflow-x-auto lg:block">
								<table className="w-full text-left">
									<thead>
										<tr className="bg-[#001D44] text-[13px] font-bold tracking-wider text-white uppercase">
											<th className="rounded-tl-xl px-6 py-4">Chương trình</th>
											<th className="px-6 py-4">Khóa học</th>
											<th className="px-6 py-4">Lớp</th>
											<th className="px-6 py-4 text-nowrap">Lịch học</th>
											<th className="px-6 py-4">Khai giảng</th>
											<th className="rounded-tr-xl px-6 py-4 text-center">Hành động</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-100">
										<AnimatePresence mode="popLayout">
											{branchSchedules.length > 0 ? (
												branchSchedules.map((schedule, idx) => (
													<motion.tr
														key={schedule.id}
														initial={{ opacity: 0, y: 10 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: idx * 0.05 }}
														className="text-sm transition-colors hover:bg-slate-50/50"
													>
														<td className="px-6 py-6 font-bold text-slate-800">
															{schedule.course?.program?.name || "Tiêu chuẩn"}
														</td>
														<td className="text-stem-blue px-6 py-6 font-semibold">
															{schedule.course?.name || "Robotics"}
														</td>
														<td className="px-6 py-6">
															<span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-bold text-slate-700">
																{schedule.class_code}
															</span>
														</td>
														<td className="min-w-[150px] px-6 py-6 text-slate-500">
															{schedule.schedule}
														</td>
														<td className="px-6 py-6 font-medium text-slate-800">
															{new Date(schedule.start_date).toLocaleDateString("vi-VN")}
														</td>
														<td className="px-6 py-6 text-center">
															<Link href="/khoa-hoc/dang-ky">
																<button className="hover:text-stem-blue text-[13px] font-black text-slate-900 uppercase transition-colors">
																	Đăng ký
																</button>
															</Link>
														</td>
													</motion.tr>
												))
											) : (
												<tr>
													<td colSpan={6} className="py-20 text-center text-slate-400 italic">
														Chưa có lịch khai giảng nào cho cơ sở này.
													</td>
												</tr>
											)}
										</AnimatePresence>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
