import React from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { createClient } from "@/utils/supabase/server";
import EventsClient from "./EventsClient";

export default async function EventsPage() {
	const supabase = await createClient();

	const { data: events } = await supabase.from("events").select("*").order("created_at", { ascending: false });

	return (
		<AdminLayout>
			<EventsClient initialEvents={events || []} />
		</AdminLayout>
	);
}
