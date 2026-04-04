import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Đăng ký mới | Admin",
  description: "Trang quản trị registrations",
};

export default async function RegistrationsPage() {
	const supabase = await createClient();

	const { data: registrations } = await supabase
		.from("registrations")
		.select("*")
		.order("created_at", { ascending: false });

	const { data: branches } = await supabase.from("branches").select("*");
	const { data: courses } = await supabase.from("courses").select("*");

	return (
		<>
			<PageContent
				initialRegistrations={registrations || []}
				branches={branches || []}
				courses={courses || []}
			/>
		</>
	);
}
