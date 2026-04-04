import PageContent from "./_page-content";
import { createClient } from "@/lib/supabase/server";

export default async function RegistrationPage() {
	const supabase = await createClient();

	const { data: branches } = await supabase.from("branches").select("id, name");
	const { data: courses } = await supabase.from("courses").select("id, name");
	return <PageContent branches={branches || []} courses={courses || []} />;
}
