import { createClient } from "@/utils/supabase/server";
import RegistrationsClient from "./RegistrationsClient";

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
			<RegistrationsClient
				initialRegistrations={registrations || []}
				branches={branches || []}
				courses={courses || []}
			/>
		</>
	);
}
