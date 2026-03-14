import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { CourserSidebar } from "@/components/ui/courser-sidebar";
import NewsItem from "@/components/pages/news/news-item";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/lib/supabase-client";
import { Pagination } from "@/components/ui/pagination";

export const metadata: Metadata = {
	title: "Tin tức - STEMKey",
	description: "Cập nhật những tin tức mới nhất về giáo dục, Robotics và các sự kiện tại STEMKey.",
};

const ITEMS_PER_PAGE = 6;

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;

	// Calculate range for pagination
	const from = (currentPage - 1) * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;

	// Fetch count and data
	const [{ data: events, count }, { data: allEvents }] = await Promise.all([
		supabase
			.from("events")
			.select("*", { count: "exact" })
			.eq("category", "Tin tức")
			.order("date", { ascending: false })
			.range(from, to),
		supabase.from("events").select("*").eq("category", "Tin tức").order("date", { ascending: false }),
	]);

	const newsList = events || [];
	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	const breadcrumbItems = [
		{ label: "Trang chủ", href: "/" },
		{ label: "Tin tức", active: true },
	];

	return (
		<div className="min-h-screen bg-white">
			<div className="border-b border-slate-100 bg-slate-50 py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb items={breadcrumbItems} variant="dark" />
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
				<div className="flex flex-col gap-16 lg:flex-row">
					<div className="w-full lg:w-2/3">
						<h1 className="mb-10 flex items-center gap-3 text-3xl font-black text-slate-900">
							<TrendingUp className="text-stem-blue" />
							Tin tức mới nhất
						</h1>

						{newsList.length ? (
							<>
								<div className="space-y-4">
									{newsList.map((news) => (
										<NewsItem
											key={news.id}
											id={news.id}
											title={news.title}
											category={news.category}
											date={news.date}
											desc={news.excerpt || news.description}
											img={news.image_url}
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
