import ContentDetailPage from "@/components/pages/shared/content-detail-page";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const supabase = await createClient();

	const { data: event, error } = await supabase.from("events").select("*").eq("id", slug).single();

	if (error || !event) {
		return notFound();
	}

	return (
		<ContentDetailPage
			article={{
				title: event.title,
				date: event.date,
				image_url: event.image_url,
				content: event.content,
				description: event.description,
				excerpt: event.excerpt,
			}}
			typeLabel="bài viết"
			breadcrumbItems={[
				{ label: "Trang chủ", href: "/" },
				{ label: "Tin tức", href: "/tin-tuc" },
				{ label: event.title, active: true },
			]}
		/>
	);
}
