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

	const description = event.excerpt || event.description || "Bài viết từ STEMKey";

	return {
		title: event.title,
		description: description.slice(0, 160),
		openGraph: {
			title: event.title,
			description: description,
			type: "article",
			images: event.image_url ? [{ url: event.image_url, width: 1200, height: 630 }] : [],
		},
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://stemkey.vn'}/tin-tuc/${slug}`,
		},
	};
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: event.title,
		description: event.excerpt || event.description,
		image: event.image_url ? [event.image_url] : [],
		datePublished: event.date,
		dateModified: event.updated_at || event.date,
		author: {
			"@type": "Organization",
			name: "STEMKey",
		},
		publisher: {
			"@type": "Organization",
			name: "STEMKey",
			logo: {
				"@type": "ImageObject",
				url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://stemkey.vn'}/statics/images/logo.png`,
			},
		},
	};

	return (
		<PageContent
			event={event}
			relatedArticles={relatedArticles || []}
			programs={programs || []}
			jsonLd={jsonLd}
		/>
	);
}
