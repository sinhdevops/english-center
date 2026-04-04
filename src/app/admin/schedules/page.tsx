import React from "react";
import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Lịch khai giảng | Admin",
  description: "Trang quản trị schedules",
};

export default async function SchedulesPage() {
	const supabase = await createClient();

	const { data: schedulesData } = await supabase
		.from("schedules")
		.select("*, students(count)")
		.order("start_date", { ascending: true });

	const { data: branches } = await supabase.from("branches").select("*").order("name");
	const { data: courses } = await supabase.from("courses").select("*").order("name");

	const processedSchedules = (schedulesData || []).map((s) => ({
		...s,
		student_count: (s as any).students?.[0]?.count || 0,
	}));

	return (
		<>
			<PageContent initialSchedules={processedSchedules} branches={branches || []} courses={courses || []} />
		</>
	);
}
