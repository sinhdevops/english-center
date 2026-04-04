import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Tổng quan hệ thống | Admin",
  description: "Trang quản trị Dashboard",
};

export default async function DashboardPage() {
	const supabase = await createClient();

	// Fetch core stats in parallel
	const [
		{ data: allStudents },
		{ data: allRegistrations },
		{ count: openClassesCount },
		{ count: fullClassesCount },
		{ data: upcomingEvents },
	] = await Promise.all([
		supabase.from("students").select("status"),
		supabase.from("registrations").select("status, created_at"),
		supabase.from("schedules").select("*", { count: "exact", head: true }).eq("status", "open"),
		supabase.from("schedules").select("*", { count: "exact", head: true }).eq("status", "full"),
		supabase
			.from("events")
			.select("*")
			.gte("date", new Date().toISOString().split("T")[0])
			.order("date", { ascending: true })
			.limit(3),
	]);

	// Student breakdown
	const studentStats = {
		active: allStudents?.filter((s) => s.status === "active").length || 0,
		inactive: allStudents?.filter((s) => s.status === "inactive").length || 0,
		graduated: allStudents?.filter((s) => s.status === "graduated").length || 0,
		total: allStudents?.length || 0,
	};

	// Registration breakdown
	const registrationStats = {
		pending: allRegistrations?.filter((r) => r.status === "pending").length || 0,
		contacted: allRegistrations?.filter((r) => r.status === "contacted").length || 0,
		enrolled: allRegistrations?.filter((r) => r.status === "enrolled").length || 0,
		cancelled: allRegistrations?.filter((r) => r.status === "cancelled").length || 0,
		total: allRegistrations?.length || 0,
	};

	// Fetch supporting data
	const { data: branches } = await supabase.from("branches").select("*");
	const { data: courses } = await supabase.from("courses").select("*");

	// Recent registrations (last 7)
	const { data: recentRegistrationsRaw } = await supabase
		.from("registrations")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(7);

	const recentRegistrations = (recentRegistrationsRaw || []).map((r) => ({
		...r,
		branchName: branches?.find((b) => b.id === r.branch_id)?.name || "—",
		courseName: courses?.find((c) => c.id === r.course_id)?.name || "—",
	}));

	// Latest schedules (next 4 opening)
	const { data: schedules } = await supabase
		.from("schedules")
		.select("*")
		.order("start_date", { ascending: true })
		.limit(4);

	const processedSchedules = (schedules || []).map((s) => ({
		...s,
		branchName: branches?.find((b) => b.id === s.branch_id)?.name || "—",
		courseName: courses?.find((c) => c.id === s.course_id)?.name || s.class_code,
	}));

	return (
		<PageContent
			studentStats={studentStats}
			registrationStats={registrationStats}
			openClassesCount={openClassesCount || 0}
			fullClassesCount={fullClassesCount || 0}
			recentRegistrations={recentRegistrations}
			latestSchedules={processedSchedules}
			upcomingEvents={upcomingEvents || []}
		/>
	);
}
