"use client";

import React from "react";
import { Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ClassSchedule, Event } from "@/lib/types";

interface DashboardClientProps {
	stats: {
		name: string;
		value: string;
		icon: any;
		change: string;
		trend: string;
	}[];
	latestSchedules: ClassSchedule[];
	featuredEvents: Event[];
}

export default function DashboardClient({ stats, latestSchedules, featuredEvents }: DashboardClientProps) {
	return (
		<>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<motion.div
							key={stat.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
						>
							<div className="flex items-center justify-between">
								<div className="rounded-xl bg-slate-50 p-2.5 text-indigo-600">
									<Icon size={24} />
								</div>
								<div
									className={cn(
										"flex items-center text-xs font-medium",
										stat.trend === "up" ? "text-emerald-600" : "text-rose-600",
									)}
								>
									{stat.trend === "up" ? (
										<ArrowUpRight size={14} className="mr-0.5" />
									) : (
										<ArrowDownRight size={14} className="mr-0.5" />
									)}
									{stat.change}
								</div>
							</div>
							<div className="mt-4">
								<p className="text-sm font-medium text-slate-500">{stat.name}</p>
								<h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
							</div>
						</motion.div>
					);
				})}
			</div>

			<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<h3 className="text-lg font-semibold text-slate-900">Lịch khai giảng mới nhất</h3>
					<p className="text-sm text-slate-500">Các lớp học dự kiến khai giảng trong thời gian tới.</p>
					<div className="mt-6 space-y-4">
						{latestSchedules.length === 0 ? (
							<p className="py-8 text-center text-sm text-slate-400">Chưa có lịch khai giảng nào</p>
						) : (
							latestSchedules.map((schedule, i) => (
								<div
									key={schedule.id}
									className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50"
								>
									<div className="flex items-center">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
											{i + 1}
										</div>
										<div className="ml-4">
											<p className="text-sm font-semibold text-slate-900">
												{(schedule as any).courseName || schedule.class_code}
											</p>
											<p className="text-xs text-slate-500">
												{(schedule as any).branchName} •{" "}
												{new Date(schedule.start_date).toLocaleDateString("vi-VN")}
											</p>
										</div>
									</div>
									<span
										className={cn(
											"rounded-full px-2.5 py-0.5 text-xs font-medium",
											schedule.status === "open"
												? "bg-emerald-100 text-emerald-700"
												: "bg-rose-100 text-rose-700",
										)}
									>
										{schedule.status === "open" ? "Đang mở" : "Đã đóng"}
									</span>
								</div>
							))
						)}
					</div>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<h3 className="text-lg font-semibold text-slate-900">Sự kiện nổi bật</h3>
					<p className="text-sm text-slate-500">Các hoạt động ngoại khóa và workshop sắp diễn ra.</p>
					<div className="mt-6 space-y-4">
						{featuredEvents.length === 0 ? (
							<p className="py-8 text-center text-sm text-slate-400">Chưa có sự kiện nào</p>
						) : (
							featuredEvents.map((event) => (
								<div
									key={event.id}
									className="group relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:shadow-md"
								>
									<div className="flex justify-between">
										<div>
											<p className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
												{event.category || "Sự kiện"}
											</p>
											<h4 className="mt-1 line-clamp-1 font-semibold text-slate-900">
												{event.title}
											</h4>
											<p className="mt-2 line-clamp-2 text-sm text-slate-600">
												{event.excerpt || event.description}
											</p>
										</div>
									</div>
									<div className="mt-4 flex items-center text-xs text-slate-500">
										<Calendar size={14} className="mr-1" />
										{event.created_at
											? new Date(event.created_at).toLocaleDateString("vi-VN")
											: "N/A"}
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</>
	);
}
