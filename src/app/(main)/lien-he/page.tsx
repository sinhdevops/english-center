import { createClient } from "@/utils/supabase/client";
import PageContent from "./_page-content";

export default async function ContactPage() {
	const supabase = await createClient();

	const { data: branches } = await supabase.from("branches").select("id, name");
	const { data: courses } = await supabase.from("courses").select("id, name");
	return <PageContent branches={branches || []} courses={courses || []} />;
}
