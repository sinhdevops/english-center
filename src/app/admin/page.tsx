import React from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { Users, Calendar, BookOpen, TrendingUp } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
	const supabase = await createClient();

	// Fetch Stats
	const [
		{ count: studentCount },
		{ count: openClassesCount },
		{ count: upcomingEventsCount },
		{ count: newRegistrationsCount },
	] = await Promise.all([
		supabase.from("students").select("*", { count: "exact", head: true }),
		supabase.from("schedules").select("*", { count: "exact", head: true }).eq("status", "open"),
		supabase.from("events").select("*", { count: "exact", head: true }),
		supabase.from("registrations").select("*", { count: "exact", head: true }).eq("status", "pending"),
	]);

	const stats = [
		{
			name: "Tổng học viên",
			value: (studentCount || 0).toLocaleString(),
			icon: Users,
			change: "+12%",
			trend: "up",
		},
		{ name: "Lớp đang mở", value: (openClassesCount || 0).toString(), icon: BookOpen, change: "+5%", trend: "up" },
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
	];

	// Fetch Lists
	const { data: schedules } = await supabase
		.from("schedules")
		.select("*")
		.order("start_date", { ascending: true })
		.limit(3);

	const { data: events } = await supabase
		.from("events")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(2);

	const { data: branches } = await supabase.from("branches").select("*");
	const { data: courses } = await supabase.from("courses").select("*");

	const processedSchedules = (schedules || []).map((s) => ({
		...s,
		branchName: branches?.find((b) => b.id === s.branch_id)?.name,
		courseName: courses?.find((c) => c.id === s.course_id)?.name,
	}));

	return (
		<AdminLayout>
			<DashboardClient stats={stats} latestSchedules={processedSchedules} featuredEvents={events || []} />
		</AdminLayout>
	);
}
