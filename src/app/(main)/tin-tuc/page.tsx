import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { CourserSidebar } from "@/components/ui/courser-sidebar";
import NewsCarousel from "@/components/pages/news/news-carousel";
import NewsItem from "@/components/pages/news/news-item";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { supabase } from "@/lib/supabase-client";

export const metadata: Metadata = {
	title: "Tin tức - STEMKey",
	description: "Cập nhật những tin tức mới nhất về giáo dục, Robotics và các sự kiện tại STEMKey.",
};

export default async function NewsPage() {
	const { data: events } = await supabase.from("events").select("*").order("date", { ascending: false });

	const newsList = events || [];
	const carouselItems = newsList.slice(0, 4); // First 4 for carousel
	const listItems = newsList.slice(4); // Rest for list

	const breadcrumbItems = [
		{ label: "Trang chủ", href: "/" },
		{ label: "Tin tức", active: true },
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Dynamic Breadcrumbs would be better handled by a layout or specialized component */}
			<div className="border-b border-slate-100 bg-slate-50 py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb items={breadcrumbItems} variant="dark" />
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
				{carouselItems.length > 0 && <NewsCarousel items={carouselItems} />}

				<div className="flex flex-col gap-16 lg:flex-row">
					<div className="w-full lg:w-2/3">
						<h1 className="mb-10 flex items-center gap-3 text-3xl font-black text-slate-900">
							<TrendingUp className="text-stem-blue" />
							Tin tức mới nhất
						</h1>

						<div className="space-y-4">
							{listItems.length > 0 ? (
								listItems.map((news) => (
									<NewsItem
										key={news.id}
										id={news.id}
										title={news.title}
										date={news.date}
										desc={news.excerpt || news.description}
										img={news.image_url}
									/>
								))
							) : newsList.length <= 4 && newsList.length > 0 ? (
								<p className="text-slate-500 italic">Xem các tin tức nổi bật phía trên.</p>
							) : (
								<p className="text-slate-500 italic">Hiện tại chưa có tin tức mới.</p>
							)}
						</div>

						{/* Pagination (Static for now as we don't have enough data) */}
						{listItems.length > 10 && (
							<div className="mt-12 flex items-center justify-center gap-2">
								{[1, 2, 3, "..."].map((p, i) => (
									<button
										key={i}
										className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
											p === 1
												? "bg-stem-blue text-white"
												: "bg-slate-50 text-slate-600 hover:bg-slate-100"
										}`}
									>
										{p}
									</button>
								))}
								<button className="h-10 rounded-lg bg-slate-50 px-4 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100">
									Tiếp theo
								</button>
							</div>
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
