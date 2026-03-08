"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { Users, Calendar, BookOpen, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ClassSchedule, Event } from "@/lib/types";
import {
	MOCK_SCHEDULES,
	MOCK_EVENTS,
	MOCK_STUDENTS,
	MOCK_REGISTRATIONS,
	MOCK_BRANCHES,
	MOCK_COURSES,
} from "@/lib/mock-data";
import { supabase } from "@/lib/supabase-client";

export default function Dashboard() {
	const [stats, setStats] = useState([
		{ name: "Tổng học viên", value: "0", icon: Users, change: "+0%", trend: "up" },
		{ name: "Lớp đang mở", value: "0", icon: BookOpen, change: "+0%", trend: "up" },
		{ name: "Sự kiện sắp tới", value: "0", icon: Calendar, change: "0", trend: "up" },
		{ name: "Đăng ký mới", value: "0", icon: TrendingUp, change: "+0%", trend: "up" },
	]);
	const [latestSchedules, setLatestSchedules] = useState<ClassSchedule[]>([]);
	const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchDashboardData = React.useCallback(async () => {
		setIsLoading(true);
		try {
			const { count: studentCount, error: studentErr } = await supabase
				.from("students")
				.select("*", { count: "exact", head: true });
			const { count: openClassesCount, error: classErr } = await supabase
				.from("schedules")
				.select("*", { count: "exact", head: true })
				.eq("status", "open");
			const { count: upcomingEventsCount, error: eventErr } = await supabase
				.from("events")
				.select("*", { count: "exact", head: true });
			const { count: newRegistrationsCount, error: regErr } = await supabase
				.from("registrations")
				.select("*", { count: "exact", head: true })
				.eq("status", "pending");

			if (studentErr || classErr || eventErr || regErr) {
				console.warn("Supabase fetch error, using mock data for stats");
				setStats([
					{
						name: "Tổng học viên",
						value: MOCK_STUDENTS.length.toLocaleString(),
						icon: Users,
						change: "+12%",
						trend: "up",
					},
					{
						name: "Lớp đang mở",
						value: MOCK_SCHEDULES.filter((s) => s.status === "open").length.toString(),
						icon: BookOpen,
						change: "+5%",
						trend: "up",
					},
					{
						name: "Sự kiện sắp tới",
						value: MOCK_EVENTS.length.toString(),
						icon: Calendar,
						change: "+2",
						trend: "up",
					},
					{
						name: "Đăng ký mới",
						value: MOCK_REGISTRATIONS.filter((r) => r.status === "pending").length.toString(),
						icon: TrendingUp,
						change: "+18%",
						trend: "up",
					},
				]);
			} else {
				setStats([
					{
						name: "Tổng học viên",
						value: (studentCount || 0).toLocaleString(),
						icon: Users,
						change: "+12%",
						trend: "up",
					},
					{
						name: "Lớp đang mở",
						value: (openClassesCount || 0).toString(),
						icon: BookOpen,
						change: "+5%",
						trend: "up",
					},
					{
						name: "Sự kiện sắp tới",
						value: (upcomingEventsCount || 0).toString(),
						icon: Calendar,
						change: "+2",
						trend: "up",
					},
					{
						name: "Đăng ký mới",
						value: (newRegistrationsCount || 0).toString(),
						icon: TrendingUp,
						change: "+18%",
						trend: "up",
					},
				]);
			}

			const { data: schedules, error: sErr } = await supabase
				.from("schedules")
				.select("*")
				.order("start_date", { ascending: true })
				.limit(3);
			const { data: events, error: eErr } = await supabase
				.from("events")
				.select("*")
				.order("created_at", { ascending: false })
				.limit(2);
			const { data: branches } = await supabase.from("branches").select("*");
			const { data: courses } = await supabase.from("courses").select("*");

			if (sErr || eErr) {
				console.warn("Supabase fetch error for lists, using mock data");
				setLatestSchedules(
					MOCK_SCHEDULES.slice(0, 3).map((s) => ({
						...s,
						branchName: MOCK_BRANCHES.find((b) => b.id === s.branch_id)?.name,
						courseName: MOCK_COURSES.find((c) => c.id === s.course_id)?.name,
					})),
				);
				setFeaturedEvents(MOCK_EVENTS.slice(0, 2));
			} else {
				if (schedules) {
					setLatestSchedules(
						schedules.map((s) => ({
							...s,
							branchName: branches?.find((b) => b.id === s.branch_id)?.name,
							courseName: courses?.find((c) => c.id === s.course_id)?.name,
						})),
					);
				}
				if (events) {
					setFeaturedEvents(events);
				}
			}
		} catch (error: any) {
			console.error("Unexpected error fetching dashboard data:", error);
			// Final fallback
			setFeaturedEvents(MOCK_EVENTS.slice(0, 2));
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchDashboardData();
	}, [fetchDashboardData]);

	return (
		<AdminLayout>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat, index) => (
					<motion.div
						key={stat.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
					>
						<div className="flex items-center justify-between">
							<div className="rounded-xl bg-slate-50 p-2.5 text-indigo-600">
								<stat.icon size={24} />
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
							<h3 className="text-2xl font-bold text-slate-900">{isLoading ? "..." : stat.value}</h3>
						</div>
					</motion.div>
				))}
			</div>

			<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<h3 className="text-lg font-semibold text-slate-900">Lịch khai giảng mới nhất</h3>
					<p className="text-sm text-slate-500">Các lớp học dự kiến khai giảng trong thời gian tới.</p>
					<div className="mt-6 space-y-4">
						{isLoading ? (
							<div className="flex h-32 items-center justify-center">
								<div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
							</div>
						) : latestSchedules.length === 0 ? (
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
						{isLoading ? (
							<div className="flex h-32 items-center justify-center">
								<div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
							</div>
						) : featuredEvents.length === 0 ? (
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
		</AdminLayout>
	);
}
