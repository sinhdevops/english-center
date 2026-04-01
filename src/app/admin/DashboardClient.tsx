"use client";

import React from "react";
import {
	Users,
	BookOpen,
	TrendingUp,
	Calendar,
	Clock,
	MapPin,
	ArrowUpRight,
	UserCheck,
	UserMinus,
	GraduationCap,
	ClipboardList,
	Phone,
	CheckCircle2,
	XCircle,
	AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ClassSchedule, Event, Registration } from "@/lib/types";

interface DashboardClientProps {
	studentStats: { active: number; inactive: number; graduated: number; total: number };
	registrationStats: { pending: number; contacted: number; enrolled: number; cancelled: number; total: number };
	openClassesCount: number;
	fullClassesCount: number;
	recentRegistrations: (Registration & { branchName: string; courseName: string })[];
	latestSchedules: (ClassSchedule & { branchName: string; courseName: string })[];
	upcomingEvents: Event[];
}

const REGISTRATION_STATUS_CONFIG = {
	pending: { label: "Chờ xử lý", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
	contacted: { label: "Đã liên hệ", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
	enrolled: { label: "Đã nhập học", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
	cancelled: { label: "Đã hủy", color: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
};

const SCHEDULE_STATUS_CONFIG = {
	open: { label: "Đang mở", color: "bg-emerald-100 text-emerald-700" },
	full: { label: "Đã đầy", color: "bg-amber-100 text-amber-700" },
	closed: { label: "Đã đóng", color: "bg-rose-100 text-rose-700" },
};

export default function DashboardClient({
	studentStats,
	registrationStats,
	openClassesCount,
	fullClassesCount,
	recentRegistrations,
	latestSchedules,
	upcomingEvents,
}: DashboardClientProps) {
	const today = new Date().toLocaleDateString("vi-VN", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">Tổng quan</h1>
					<p className="mt-1 text-sm text-slate-500 capitalize">{today}</p>
				</div>
				<div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
					<div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
					Hệ thống hoạt động bình thường
				</div>
			</div>

			{/* Main Stats */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
				{[
					{
						label: "Tổng học viên",
						value: studentStats.total,
						icon: Users,
						color: "text-indigo-600 bg-indigo-50",
						sub: `${studentStats.active} đang học`,
						subIcon: UserCheck,
						subColor: "text-emerald-600",
					},
					{
						label: "Lớp đang mở",
						value: openClassesCount,
						icon: BookOpen,
						color: "text-violet-600 bg-violet-50",
						sub: `${fullClassesCount} lớp đã đầy`,
						subIcon: AlertCircle,
						subColor: "text-amber-600",
					},
					{
						label: "Đăng ký chờ xử lý",
						value: registrationStats.pending,
						icon: ClipboardList,
						color: "text-amber-600 bg-amber-50",
						sub: `${registrationStats.total} tổng đăng ký`,
						subIcon: TrendingUp,
						subColor: "text-slate-500",
					},
					{
						label: "Sự kiện sắp tới",
						value: upcomingEvents.length,
						icon: Calendar,
						color: "text-rose-600 bg-rose-50",
						sub: upcomingEvents[0]
							? new Date(upcomingEvents[0].date).toLocaleDateString("vi-VN")
							: "Chưa có sự kiện",
						subIcon: Clock,
						subColor: "text-slate-500",
					},
				].map((item, i) => {
					const Icon = item.icon;
					const SubIcon = item.subIcon;
					return (
						<motion.div
							key={item.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.07 }}
							className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
						>
							<div className="flex items-start justify-between">
								<div className={cn("rounded-xl p-2.5", item.color)}>
									<Icon size={22} />
								</div>
								<ArrowUpRight size={16} className="text-slate-300" />
							</div>
							<div className="mt-4">
								<p className="text-sm font-medium text-slate-500">{item.label}</p>
								<p className="mt-1 text-3xl font-bold text-slate-900">{item.value}</p>
							</div>
							<div className={cn("mt-3 flex items-center gap-1 text-xs font-medium", item.subColor)}>
								<SubIcon size={13} />
								{item.sub}
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Registration Funnel */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
			>
				<div className="mb-5 flex items-center justify-between">
					<div>
						<h3 className="font-semibold text-slate-900">Quy trình đăng ký</h3>
						<p className="text-sm text-slate-500">Tổng {registrationStats.total} đăng ký</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
					{(
						[
							{ key: "pending", icon: AlertCircle },
							{ key: "contacted", icon: Phone },
							{ key: "enrolled", icon: CheckCircle2 },
							{ key: "cancelled", icon: XCircle },
						] as const
					).map(({ key, icon: Icon }) => {
						const cfg = REGISTRATION_STATUS_CONFIG[key];
						const count = registrationStats[key];
						const pct = registrationStats.total > 0 ? Math.round((count / registrationStats.total) * 100) : 0;
						return (
							<div key={key} className="rounded-xl border border-slate-100 p-4">
								<div className="flex items-center gap-2">
									<div className={cn("h-2 w-2 rounded-full", cfg.dot)} />
									<span className="text-xs font-medium text-slate-500">{cfg.label}</span>
								</div>
								<p className="mt-2 text-2xl font-bold text-slate-900">{count}</p>
								<div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
									<div
										className={cn("h-full rounded-full transition-all", cfg.dot)}
										style={{ width: `${pct}%` }}
									/>
								</div>
								<p className="mt-1 text-xs text-slate-400">{pct}%</p>
							</div>
						);
					})}
				</div>
			</motion.div>

			{/* Student Breakdown + Schedules */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
				{/* Student Status */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.35 }}
					className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
				>
					<h3 className="font-semibold text-slate-900">Phân bổ học viên</h3>
					<p className="text-sm text-slate-500">Theo trạng thái hiện tại</p>
					<div className="mt-6 space-y-4">
						{[
							{
								label: "Đang học",
								count: studentStats.active,
								icon: UserCheck,
								bar: "bg-indigo-500",
								text: "text-indigo-600",
							},
							{
								label: "Tạm dừng",
								count: studentStats.inactive,
								icon: UserMinus,
								bar: "bg-amber-400",
								text: "text-amber-600",
							},
							{
								label: "Đã tốt nghiệp",
								count: studentStats.graduated,
								icon: GraduationCap,
								bar: "bg-emerald-500",
								text: "text-emerald-600",
							},
						].map((item) => {
							const pct = studentStats.total > 0 ? Math.round((item.count / studentStats.total) * 100) : 0;
							const Icon = item.icon;
							return (
								<div key={item.label}>
									<div className="mb-1.5 flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Icon size={15} className={item.text} />
											<span className="text-sm font-medium text-slate-700">{item.label}</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-bold text-slate-900">{item.count}</span>
											<span className="text-xs text-slate-400">{pct}%</span>
										</div>
									</div>
									<div className="h-2 overflow-hidden rounded-full bg-slate-100">
										<div
											className={cn("h-full rounded-full transition-all", item.bar)}
											style={{ width: `${pct}%` }}
										/>
									</div>
								</div>
							);
						})}
						<div className="mt-2 rounded-xl  px-4 py-3 text-center">
							<p className="text-xs text-slate-500">Tổng cộng</p>
							<p className="text-2xl font-bold text-slate-900">{studentStats.total}</p>
							<p className="text-xs text-slate-500">học viên</p>
						</div>
					</div>
				</motion.div>

				{/* Schedules */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
				>
					<h3 className="font-semibold text-slate-900">Lịch khai giảng sắp tới</h3>
					<p className="text-sm text-slate-500">Các lớp học dự kiến mở trong thời gian tới</p>
					<div className="mt-5 max-h-[calc(3*5.75rem+2*0.75rem)] overflow-y-auto space-y-3 pr-1">
						{latestSchedules.length === 0 ? (
							<p className="py-10 text-center text-sm text-slate-400">Chưa có lịch khai giảng</p>
						) : (
							latestSchedules.map((s) => {
								const cfg = SCHEDULE_STATUS_CONFIG[s.status] ?? SCHEDULE_STATUS_CONFIG.closed;
								return (
									<div
										key={s.id}
										className="flex flex-col gap-2 rounded-xl border border-slate-100 p-4 transition hover: sm:flex-row sm:items-center sm:justify-between"
									>
										<div className="flex items-start gap-3">
											<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
												<BookOpen size={16} />
											</div>
											<div>
												<p className="text-sm font-semibold text-slate-900">{s.courseName}</p>
												<p className="mt-0.5 text-xs text-slate-500">
													Mã lớp: <span className="font-medium text-slate-700">{s.class_code}</span>
												</p>
												<div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
													<span className="flex items-center gap-1">
														<MapPin size={11} />
														{s.branchName}
													</span>
													<span className="flex items-center gap-1">
														<Clock size={11} />
														{s.schedule}
													</span>
													<span className="flex items-center gap-1">
														<Calendar size={11} />
														{new Date(s.start_date).toLocaleDateString("vi-VN")}
													</span>
												</div>
											</div>
										</div>
										<span className={cn("w-fit rounded-full px-3 py-1 text-xs font-semibold", cfg.color)}>
											{cfg.label}
										</span>
									</div>
								);
							})
						)}
					</div>
				</motion.div>
			</div>

			{/* Recent Registrations + Events */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
				{/* Recent Registrations */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.45 }}
					className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
				>
					<h3 className="font-semibold text-slate-900">Đăng ký mới nhất</h3>
					<p className="text-sm text-slate-500">7 đăng ký gần đây nhất</p>
					<div className="mt-5 overflow-x-auto">
						{recentRegistrations.length === 0 ? (
							<p className="py-10 text-center text-sm text-slate-400">Chưa có đăng ký nào</p>
						) : (
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-slate-100 text-left">
										<th className="pb-3 pr-4 text-xs font-semibold text-slate-500">Học viên</th>
										<th className="pb-3 pr-4 text-xs font-semibold text-slate-500">Khóa học</th>
										<th className="pb-3 pr-4 text-xs font-semibold text-slate-500 hidden md:table-cell">Cơ sở</th>
										<th className="pb-3 pr-4 text-xs font-semibold text-slate-500 hidden sm:table-cell">Ngày</th>
										<th className="pb-3 text-xs font-semibold text-slate-500">Trạng thái</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-50">
									{recentRegistrations.map((r) => {
										const cfg = REGISTRATION_STATUS_CONFIG[r.status];
										return (
											<tr key={r.id} className="group transition hover:">
												<td className="py-3 pr-4">
													<p className="font-medium text-slate-900 line-clamp-1">{r.student_name}</p>
													<p className="text-xs text-slate-500">{r.phone}</p>
												</td>
												<td className="py-3 pr-4">
													<p className="text-slate-700 line-clamp-1">{r.courseName}</p>
												</td>
												<td className="py-3 pr-4 hidden md:table-cell">
													<p className="text-slate-600 line-clamp-1">{r.branchName}</p>
												</td>
												<td className="py-3 pr-4 hidden sm:table-cell">
													<p className="text-slate-500">
														{new Date(r.created_at).toLocaleDateString("vi-VN")}
													</p>
												</td>
												<td className="py-3">
													<span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", cfg.color)}>
														{cfg.label}
													</span>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</div>
				</motion.div>

				{/* Upcoming Events */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
				>
					<h3 className="font-semibold text-slate-900">Sự kiện sắp tới</h3>
					<p className="text-sm text-slate-500">Các hoạt động trong thời gian tới</p>
					<div className="mt-5 space-y-4">
						{upcomingEvents.length === 0 ? (
							<p className="py-10 text-center text-sm text-slate-400">Không có sự kiện sắp tới</p>
						) : (
							upcomingEvents.map((event) => {
								const eventDate = new Date(event.date);
								const day = eventDate.toLocaleDateString("vi-VN", { day: "2-digit" });
								const month = eventDate.toLocaleDateString("vi-VN", { month: "short" });
								return (
									<div
										key={event.id}
										className="flex gap-4 rounded-xl border border-slate-100 p-4 transition hover:"
									>
										<div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
											<span className="text-lg font-bold leading-none">{day}</span>
											<span className="text-[10px] font-medium uppercase">{month}</span>
										</div>
										<div className="min-w-0">
											<p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
												{event.category || "Sự kiện"}
											</p>
											<h4 className="mt-0.5 text-sm font-semibold text-slate-900 line-clamp-1">
												{event.title}
											</h4>
											{event.location && (
												<p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
													<MapPin size={11} />
													{event.location}
												</p>
											)}
											{event.excerpt && (
												<p className="mt-1 text-xs text-slate-500 line-clamp-2">{event.excerpt}</p>
											)}
										</div>
									</div>
								);
							})
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
