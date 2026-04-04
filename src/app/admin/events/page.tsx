import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Quản lý Sự kiện | Admin",
  description: "Trang quản trị events",
};

export default async function EventsPage() {
	const supabase = await createClient();

	const { data: events } = await supabase.from("events").select("*").order("created_at", { ascending: false });

	return (
		<>
			<PageContent initialEvents={events || []} />
		</>
	);
}
