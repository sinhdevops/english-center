"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Calendar } from "lucide-react";
import { IMAGES } from "../../../../public/statics/images";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import HeaderPage from "@/components/common/HeaderPage";

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

const CITIES = ["TP.Hồ Chí Minh", "Hà Nội"];

interface LichKhaiGiangClientProps {
	initialBranches: Branch[];
	initialSchedules: ScheduleWithJoin[];
}

export default function LichKhaiGiangClient({ initialBranches, initialSchedules }: LichKhaiGiangClientProps) {
	const [activeCity, setActiveCity] = React.useState("TP.Hồ Chí Minh");
	const [selectedBranchId, setSelectedBranchId] = React.useState<string | null>(
		initialBranches.length > 0 ? initialBranches[0].id : null,
	);

	const normalize = (s: string) =>
		s
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();
	const CITY_KEYWORDS: Record<string, string[]> = {
		"TP.Hồ Chí Minh": ["ho chi minh", "hcm", "sai gon"],
		"Hà Nội": ["ha noi"],
	};
	const filteredBranches = initialBranches.filter((b) => {
		const keywords = CITY_KEYWORDS[activeCity] ?? [normalize(activeCity)];
		const normalizedAddress = normalize(b.city ?? b.address ?? "");
		return keywords.some((kw) => normalizedAddress.includes(kw));
	});

	React.useEffect(() => {
		setSelectedBranchId(filteredBranches[0]?.id ?? null);
	}, [activeCity]);

	const selectedBranch = initialBranches.find((b) => b.id === selectedBranchId);
	const branchSchedules = initialSchedules.filter((s) => s.branch_id === selectedBranchId);

	return (
		<div className="min-h-screen bg-[#F8FAFC]">
			{/* Banner Section */}
			<HeaderPage title="Lịch khai giảng" />

			<div className="mx-auto max-w-7xl py-25 px-4 lg:px-0">
				<h2 className="mb-6 text-xl font-bold text-slate-800 uppercase">Chọn khu vực</h2>

				<div className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto pb-2 whitespace-nowrap lg:flex-wrap">
					{CITIES.map((city) => (
						<button
							key={city}
							onClick={() => setActiveCity(city)}
							className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all lg:px-6 ${
								activeCity === city
									? "bg-[#ED1C24] text-white"
									: "border border-slate-200 bg-white text-slate-600 hover:border-[#ED1C24] hover:text-[#ED1C24]"
							}`}
						>
							{city}
						</button>
					))}
				</div>

				<div className="flex flex-col gap-6 lg:flex-row">
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
									className={`cursor-pointer rounded-xl border-2 bg-white p-6 transition-all ${
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
								</motion.div>
							))}
						</div>
					</div>

					<div className="flex-1">
						<div className="rounded-2xl border border-slate-100 bg-white p-6 lg:p-8">
							<div className="mb-8 flex items-center justify-between">
								<div>
									<h3 className="text-xl font-black tracking-tight text-slate-900 uppercase lg:text-2xl">
										Lịch khai giảng
									</h3>
									{selectedBranch && (
										<p className="mt-1 text-sm text-slate-500">{selectedBranch.address}</p>
									)}
								</div>
							</div>

							<div className="space-y-4 lg:hidden">
								<AnimatePresence mode="popLayout">
									{branchSchedules.length > 0 ? (
										branchSchedules.map((schedule, idx) => (
											<motion.div
												key={schedule.id}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: idx * 0.05 }}
												className="rounded-xl border border-slate-100 bg-slate-50/30 p-5"
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
															Khai giảng:{""}
															{new Date(schedule.start_date).toLocaleDateString("vi-VN")}
														</span>
													</div>
												</div>

												<Link href="/khoa-hoc/dang-ky">
													<button className="bg-stem-blue w-full rounded-xl py-3.5 text-sm font-black tracking-widest text-white uppercase active:scale-95">
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

							<div className="scrollbar-hide hidden w-full overflow-x-auto lg:block">
								<table className="w-full min-w-[900px] text-left">
									<thead>
										<tr className="bg-[#001D44] text-[13px] font-bold tracking-wider text-white uppercase">
											<th className="w-[25%] rounded-tl-xl px-6 py-4">Chương trình</th>
											<th className="w-[20%] px-6 py-4">Khóa học</th>
											<th className="w-[10%] px-6 py-4">Lớp</th>
											<th className="w-[20%] px-6 py-4">Lịch học</th>
											<th className="w-[12%] px-6 py-4">Khai giảng</th>
											<th className="w-[13%] rounded-tr-xl px-6 py-4 text-center">Hành động</th>
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
														<td className="px-6 py-6 text-slate-500">
															{schedule.schedule}
														</td>
														<td className="px-6 py-6 font-medium whitespace-nowrap text-slate-800">
															{new Date(schedule.start_date).toLocaleDateString("vi-VN")}
														</td>
														<td className="px-6 py-6 text-center">
															<Link href="/khoa-hoc/dang-ky">
																<button className="hover:text-stem-blue text-[13px] font-black whitespace-nowrap text-slate-900 uppercase transition-colors hover:cursor-pointer">
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
