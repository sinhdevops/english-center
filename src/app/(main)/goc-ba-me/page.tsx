import { CourserSidebar } from "@/components/ui/courser-sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/lib/supabase-client";
import NewsItem from "@/components/pages/news/news-item";
import { TrendingUp } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

export default async function ParentsCornerPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;

	// Calculate range for pagination
	const from = (currentPage - 1) * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;

	// Fetch count and data
	const { data: events, count } = await supabase
		.from("events")
		.select("*", { count: "exact" })
		.eq("category", "Góc ba mẹ")
		.order("date", { ascending: false })
		.range(from, to);

	const newsList = events || [];
	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	return (
		<div className="min-h-screen bg-white">
			<div className="border-b border-slate-100 bg-slate-50 py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb items={[{ label: "Góc ba mẹ", active: true }]} variant="dark" />
				</div>
			</div>
			<div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
				<div className="flex flex-col gap-16 lg:flex-row">
					<div className="w-full text-left lg:w-2/3">
						<h1 className="mb-10 flex items-center justify-center gap-3 text-3xl font-black text-slate-900 uppercase md:justify-start">
							<TrendingUp className="text-stem-blue" />
							Góc ba mẹ
						</h1>
						{newsList.length ? (
							<>
								<div className="space-y-4">
									{newsList.map((item, idx) => (
										<NewsItem
											id={item.id}
											category="Góc ba mẹ"
											key={idx}
											title={item.title}
											date={item.date}
											desc={item.excerpt || item.description}
											img={item.image_url}
										/>
									))}
								</div>

								<Pagination totalPages={totalPages} currentPage={currentPage} />
							</>
						) : (
							<p className="text-slate-500 italic">Hiện tại chưa có bài viết.</p>
						)}
					</div>
					<div className="w-full lg:w-1/3">
						<CourserSidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
