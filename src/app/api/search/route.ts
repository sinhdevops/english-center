import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("q");

	if (!query) {
		return NextResponse.json({ results: [] });
	}

	const supabase = await createClient();

	try {
		const [programsRes, coursesRes, eventsRes] = await Promise.all([
			supabase.from("programs").select("id, name, description, image_url").ilike("name", `%${query}%`),
			supabase.from("courses").select("id, name, description").ilike("name", `%${query}%`),
			supabase
				.from("events")
				.select("id, title, excerpt, description, image_url, date")
				.ilike("title", `%${query}%`),
		]);

		const results = [
			...(programsRes.data || []).map((p: any) => ({
				id: p.id,
				title: p.name,
				description: p.description || "",
				type: "program",
				image_url: p.image_url,
			})),
			...(coursesRes.data || []).map((c: any) => ({
				id: c.id,
				title: c.name,
				description: c.description || "",
				type: "course",
			})),
			...(eventsRes.data || []).map((e: any) => ({
				id: e.id,
				title: e.title,
				description: e.excerpt || e.description || "",
				type: "event",
				image_url: e.image_url,
				date: e.date,
			})),
		];

		return NextResponse.json({ results });
	} catch (error) {
		console.error("Search API Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
