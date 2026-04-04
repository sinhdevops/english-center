import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PageContent from "./_page-content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const supabase = await createClient();

	const { data: event } = await supabase
		.from("events")
		.select("title, excerpt, description, image_url, category")
		.eq("id", slug)
		.single();

	if (!event) return { title: "Không tìm thấy bài viết" };

	return {
		title: event.title,
		description: event.excerpt || event.description || "Góc ba mẹ tại STEMKey",
		openGraph: {
			title: event.title,
			images: event.image_url ? [{ url: event.image_url }] : [],
		},
	};
}

export default async function ParentsCornerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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

	const article = {
		title: event.title,
		date: event.date,
		category: event.category,
		image_url: event.image_url,
		content: event.content,
		description: event.description,
		excerpt: event.excerpt,
	};

	return (
		<PageContent
			article={article}
			relatedArticles={relatedArticles || []}
			programs={programs || []}
		/>
	);
}
