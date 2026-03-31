import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/lib/supabase-client";
import { Pagination } from "@/components/ui/pagination";
import NewsListWithSidebar from "@/components/pages/news/NewsListWithSidebar";

import HeaderPage from "@/components/common/HeaderPage";

export const metadata: Metadata = {
	title: "Tin tức - STEMKey",
	description: "Cập nhật những tin tức mới nhất về giáo dục, Robotics và các sự kiện tại STEMKey.",
};

const ITEMS_PER_PAGE = 10;

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;

	const from = (currentPage - 1) * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;

	const [{ data: events, count }, { data: courses }] = await Promise.all([
		supabase
			.from("events")
			.select("*", { count: "exact" })
			.eq("category", "Tin tức")
			.neq("type", "video")
			.order("date", { ascending: false })
			.range(from, to),

		supabase.from("courses").select("id, name, description").order("created_at", { ascending: true }).limit(20),
	]);

	const articleItems = events || [];
	const videoItems: any[] = [];
	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	const breadcrumbItems = [
		{ label: "Trang chủ", href: "/" },
		{ label: "Tin tức", active: true },
	];

	return (
		<div className="min-h-screen bg-slate-50">
			<HeaderPage title="TIN TỨC" />

			<div className="mx-auto max-w-7xl px-4 py-10">
				{articleItems.length || videoItems.length ? (
					<>
						<NewsListWithSidebar
							newsTitle="TIN TỨC"
							videoItems={videoItems}
							articleItems={articleItems}
							courses={courses || []}
							detailBase="/tin-tuc"
							variant="news"
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
