import React from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { createClient } from "@/utils/supabase/server";
import ProgramsClient from "./ProgramsClient";

export default async function ProgramsPage() {
	const supabase = await createClient();

	const { data: programs } = await supabase.from("programs").select("*").order("name");
	const { data: courses } = await supabase.from("courses").select("*").order("name");

	return (
		<AdminLayout>
			<ProgramsClient initialPrograms={programs || []} initialCourses={courses || []} />
		</AdminLayout>
	);
}
