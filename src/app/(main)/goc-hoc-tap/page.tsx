import { CourserSidebar } from "@/components/ui/courser-sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/lib/supabase-client";
import NewsItem from "@/components/pages/news/news-item";
import { TrendingUp } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export default async function LearningCornerPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;

	// Calculate range for pagination
	const from = (currentPage - 1) * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;

	const { data: events, count } = await supabase
		.from("events")
		.select("*", { count: "exact" })
		.eq("category", "Góc học tập")
		.order("date", { ascending: false })
		.range(from, to);

	const newsList = events || [];
	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	return (
		<div className="min-h-screen bg-white">
			<div className="border-b border-slate-100 bg-slate-50 py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb items={[{ label: "Góc học tập", active: true }]} variant="dark" />
				</div>
			</div>
			<div className="mx-auto max-w-7xl px-4 py-6 text-center">
				<div className="flex flex-col gap-16 lg:flex-row">
					<div className="w-full text-left lg:w-2/3">
						<h1 className="mb-10 flex items-center gap-3 text-3xl font-black text-slate-900 uppercase">
							<TrendingUp className="text-stem-blue" />
							Góc học tập
						</h1>

						{newsList.length ? (
							<>
								<div className="space-y-4">
									{newsList.map((news) => (
										<NewsItem
											key={news.id}
											id={news.id}
											title={news.title}
											category="Góc học tập"
											date={news.date}
											desc={news.excerpt || news.description}
											img={news.image_url}
										/>
									))}
								</div>

								<Pagination totalPages={totalPages} currentPage={currentPage} />
							</>
						) : (
							<p className="text-slate-500 italic">Hiện tại chưa có bài viết trong góc học tập.</p>
						)}
					</div>
					<div className="w-full text-left lg:w-1/3">
						<CourserSidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
