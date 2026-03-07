import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { CourserSidebar } from "@/components/ui/courser-sidebar";
import NewsCarousel from "@/components/pages/news/news-carousel";
import NewsItem from "@/components/pages/news/news-item";
import { NEWS_LIST } from "@/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
	title: "Tin tức - STEMKey",
	description: "Cập nhật những tin tức mới nhất về giáo dục, Robotics và các sự kiện tại STEMKey.",
};

export default function NewsPage() {
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
				<NewsCarousel />

				<div className="flex flex-col gap-16 lg:flex-row">
					<div className="w-full lg:w-2/3">
						<h1 className="mb-10 flex items-center gap-3 text-3xl font-black text-slate-900">
							<TrendingUp className="text-stem-blue" />
							Tin tức mới nhất
						</h1>

						<div className="space-y-4">
							{NEWS_LIST.map((news, idx) => (
								<NewsItem
									key={idx}
									title={news.title}
									date={news.date}
									desc={news.desc}
									img={news.img}
								/>
							))}
						</div>

						{/* Pagination */}
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
					</div>

					<div className="w-full lg:w-1/3">
						<CourserSidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
