import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Quản lý Chương trình | Admin",
  description: "Trang quản trị programs",
};

export default async function ProgramsPage() {
	const supabase = await createClient();

	const { data: programs } = await supabase.from("programs").select("*").order("name");
	const { data: courses } = await supabase.from("courses").select("*").order("name");

	return (
		<>
			<PageContent initialPrograms={programs || []} initialCourses={courses || []} />
		</>
	);
}
