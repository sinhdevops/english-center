import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import NewsCard from "@/components/pages/news/news-card";
import FeaturedNewsItem from "@/components/pages/news/featured-news-item";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/lib/supabase-client";
import { Pagination } from "@/components/ui/pagination";

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

	const { data: events, count } = await supabase
		.from("events")
		.select("*", { count: "exact" })
		.eq("category", "Góc ba mẹ")
		.order("date", { ascending: false })
		.range(from, to);

	const newsList = events || [];
	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

	const featured = currentPage === 1 ? newsList[0] : null;
	const gridItems = currentPage === 1 ? newsList.slice(1) : newsList;

	const breadcrumbItems = [
		{ label: "Trang chủ", href: "/" },
		{ label: "Góc ba mẹ", active: true },
	];

	return (
		<div className="min-h-screen bg-slate-50">
			{/* Page Header */}
			<div className="border-b border-slate-100 bg-white">
				<div className="mx-auto max-w-7xl px-4 pt-3">
					<Breadcrumb items={breadcrumbItems} variant="dark" />
				</div>
			</div>

			{/* Content */}
			<div className="mx-auto max-w-7xl px-4 py-10">
				{newsList.length ? (
					<>
						{featured && (
							<div className="mb-10">
								<FeaturedNewsItem
									id={featured.id}
									title={featured.title}
									category="Góc ba mẹ"
									date={featured.date}
									desc={featured.excerpt || featured.description}
									img={featured.image_url}
								/>
							</div>
						)}

						{gridItems.length > 0 && (
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
								{gridItems.map((item, i) => (
									<NewsCard
										key={item.id}
										id={item.id}
										title={item.title}
										category="Góc ba mẹ"
										date={item.date}
										desc={item.excerpt || item.description}
										img={item.image_url}
										index={i}
									/>
								))}
							</div>
						)}

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
