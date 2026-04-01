import HeaderPage from "@/components/common/HeaderPage";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/lib/supabase-client";
import { Newspaper } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import NewsListWithSidebar from "@/components/pages/news/NewsListWithSidebar";

const ITEMS_PER_PAGE = 10;

export default async function LearningCornerPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;

	const from = (currentPage - 1) * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;

	const [{ data: events, count }, { data: courses }] = await Promise.all([
		supabase
			.from("events")
			.select("*", { count: "exact" })
			.eq("category", "Góc học tập")
			.neq("type", "video")
			.order("date", { ascending: false })
			.range(from, to),

		supabase.from("courses").select("id, name, duration").order("created_at", { ascending: true }).limit(20),
	]);

	const articleItems = events || [];
	const videoItems: any[] = [];
	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	return (
		<div className="min-h-screen bg-white">
			<HeaderPage title="Góc học tập" />
			<div className="mx-auto max-w-7xl px-4 py-10 lg:py-20 lg:px-0">
				{articleItems.length || videoItems.length ? (
					<>
						<NewsListWithSidebar
							newsTitle="GÓC HỌC TẬP"
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
