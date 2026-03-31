import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/lib/supabase-client";
import { Pagination } from "@/components/ui/pagination";
import NewsListWithSidebar from "@/components/pages/news/NewsListWithSidebar";
import HeaderPage from "@/components/common/HeaderPage";

export const metadata: Metadata = {
	title: "Góc ba mẹ - STEMKey",
	description: "Những thông tin hữu ích dành cho ba mẹ tại STEMKey.",
};

const ITEMS_PER_PAGE = 10;

export default async function ParentsCornerPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;

	const from = (currentPage - 1) * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;

	const [{ data: events, count }, { data: videos }, { data: courses }] = await Promise.all([
		supabase
			.from("events")
			.select("*", { count: "exact" })
			.eq("category", "Góc ba mẹ")
			.neq("type", "video")
			.order("date", { ascending: false })
			.range(from, to),

		supabase
			.from("events")
			.select("*")
			.eq("category", "Góc ba mẹ")
			.eq("type", "video")
			.order("date", { ascending: false })
			.limit(6),

		supabase
			.from("courses")
			.select("id, name, duration")
			.order("created_at", { ascending: true })
			.limit(20),
	]);

	const articleItems = events || [];
	const videoItems = videos || [];
	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	const breadcrumbItems = [
		{ label: "Trang chủ", href: "/" },
		{ label: "Góc ba mẹ", active: true },
	];

	return (
		<div className="min-h-screen bg-slate-50">
			<HeaderPage title="Góc ba mẹ"/>
			<div className="mx-auto max-w-7xl px-4 py-20">
				{articleItems.length || videoItems.length ? (
					<>
						<NewsListWithSidebar
							newsTitle="TIN TỨC VỀ GÓC BA MẸ"
							videoItems={videoItems}
							articleItems={articleItems}
							courses={courses || []}
							detailBase="/tin-tuc"
							variant="parents-corner"
						/>
						<Pagination totalPages={totalPages} currentPage={currentPage} />
					</>
				) : (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<Newspaper size={48} className="mb-4 text-slate-200" />
						<p className="text-lg font-semibold text-slate-400">Hiện tại chưa có bài viết.</p>
					</div>
				)}
			</div>
		</div>
	);
}
