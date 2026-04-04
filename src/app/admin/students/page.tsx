import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Quản lý Học viên | Admin",
  description: "Trang quản trị students",
};

export default async function StudentsPage() {
	const supabase = await createClient();

	const { data: students } = await supabase.from("students").select("*").order("created_at", { ascending: false });

	const { data: branches } = await supabase.from("branches").select("*").order("name");
	const { data: courses } = await supabase.from("courses").select("*").order("name");
	const { data: schedules } = await supabase.from("schedules").select("*").order("start_date");

	return (
		<>
			<PageContent
				initialStudents={students || []}
				branches={branches || []}
				courses={courses || []}
				schedules={schedules || []}
			/>
		</>
	);
}
