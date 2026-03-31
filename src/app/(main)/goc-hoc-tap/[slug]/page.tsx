import ContentDetailPage from "@/components/pages/shared/content-detail-page";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function LearningCornerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const supabase = await createClient();

	const { data: event, error } = await supabase.from("events").select("*").eq("id", slug).single();

	if (error || !event) {
		return notFound();
	}

	const [{ data: programs }, { data: relatedArticles }] = await Promise.all([
		supabase.from("programs").select("id, name, image_url").order("created_at", { ascending: true }),
		supabase
			.from("events")
			.select("id, title, image_url, date")
			.eq("category", event.category)
			.neq("id", slug)
			.order("date", { ascending: false })
			.limit(3),
	]);

	return (
		<ContentDetailPage
			article={{
				title: event.title,
				date: event.date,
				category: event.category,
				image_url: event.image_url,
				content: event.content,
				description: event.description,
				excerpt: event.excerpt,
			}}
			relatedArticles={relatedArticles || []}
			typeLabel="tài liệu"
			programs={programs || []}
		/>
	);
}
