import ContentDetailPage from "@/components/pages/shared/content-detail-page";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const supabase = await createClient();

	const [{ data: event, error }, { data: programs }] = await Promise.all([
		supabase.from("events").select("*").eq("id", slug).single(),
		supabase.from("programs").select("id, name, image_url").order("created_at", { ascending: true }),
	]);

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
				{ label: "Tin tức chi tiết", active: true },
			]}
			programs={programs || []}
		/>
	);
}
