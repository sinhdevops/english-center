import React from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { createClient } from "@/utils/supabase/server";
import StudentsClient from "./StudentsClient";

export default async function StudentsPage() {
	const supabase = await createClient();

	const { data: students } = await supabase.from("students").select("*").order("created_at", { ascending: false });

	const { data: branches } = await supabase.from("branches").select("*").order("name");
	const { data: courses } = await supabase.from("courses").select("*").order("name");
	const { data: schedules } = await supabase.from("schedules").select("*").order("start_date");

	return (
		<AdminLayout>
			<StudentsClient
				initialStudents={students || []}
				branches={branches || []}
				courses={courses || []}
				schedules={schedules || []}
			/>
		</AdminLayout>
	);
}
