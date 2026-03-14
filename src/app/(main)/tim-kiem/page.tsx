"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookOpen, Calendar, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
	id: string;
	title: string;
	description: string;
	type: "program" | "course" | "event";
	image_url?: string;
	date?: string;
}

function SearchResults() {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const performSearch = async () => {
			if (!query.trim()) {
				setResults([]);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			try {
				const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
				const data = await response.json();

				if (data.results) {
					setResults(data.results);
				} else if (data.error) {
					console.error("Search API error:", data.error);
				}
			} catch (error) {
				console.error("Search fetch error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		performSearch();
	}, [query]);

	const breadcrumbItems = [
		{ label: "Trang chủ", href: "/" },
		{ label: "Tìm kiếm", active: true },
	];

	return (
		<div className="min-h-screen bg-white">
			<div className="border-b border-slate-50 bg-slate-50/50 py-4">
				<div className="mx-auto max-w-7xl px-4">
					<Breadcrumb items={breadcrumbItems} variant="dark" />
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
				<div className="mb-12">
					<h1 className="mb-4 flex items-center gap-3 text-3xl font-black text-slate-900 lg:text-4xl">
						<Search className="text-stem-blue" size={32} />
						Kết quả tìm kiếm
					</h1>
					<p className="text-lg text-slate-500">
						{isLoading ? (
							"Đang tìm kiếm..."
						) : (
							<>
								Tìm thấy <span className="font-bold text-slate-900">{results.length}</span> kết quả cho{" "}
								<span className="text-stem-blue font-bold">&quot;{query}&quot;</span>
							</>
						)}
					</p>
				</div>

				{isLoading ? (
					<div className="flex h-64 flex-col items-center justify-center gap-4 text-slate-400">
						<Loader2 className="animate-spin" size={48} />
						<p className="font-medium">Vui lòng đợi trong giây lát...</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						<AnimatePresence mode="popLayout">
							{results.length > 0 ? (
								results.map((result, idx) => (
									<motion.div
										key={`${result.type}-${result.id}`}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: idx * 0.05 }}
										className="group hover:border-stem-blue/20 flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all hover:shadow-xl"
									>
										<div className="relative aspect-video overflow-hidden bg-slate-100">
											<Image
												src={
													result.image_url ||
													"https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
												}
												alt={result.title}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-110"
												referrerPolicy="no-referrer"
											/>
											<div className="absolute top-4 left-4">
												<span
													className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase shadow-sm ${
														result.type === "program"
															? "bg-emerald-500"
															: result.type === "course"
																? "bg-amber-500"
																: "bg-stem-blue"
													}`}
												>
													{result.type === "program"
														? "Chương trình"
														: result.type === "course"
															? "Khóa học"
															: "Tin tức"}
												</span>
											</div>
										</div>

										<div className="flex flex-1 flex-col p-6">
											<Link
												href={
													result.type === "event"
														? `/tin-tuc/${result.id}`
														: result.type === "program"
															? `/khoa-hoc`
															: `/khoa-hoc`
												}
												className="text-stem-blue mt-auto gap-2 text-sm font-bold"
											>
												<div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
													{result.type === "event" ? (
														<>
															<Calendar size={14} />
															<span>
																{new Date(result.date!).toLocaleDateString("vi-VN")}
															</span>
														</>
													) : (
														<>
															<BookOpen size={14} />
															<span>STEMKey Education</span>
														</>
													)}
												</div>

												<h3 className="group-hover:text-stem-blue mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors">
													{result.title}
												</h3>

												<p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
													{result.description}
												</p>

												<div className="flex items-center gap-2">
													Xem chi tiết <ChevronRight size={16} />
												</div>
											</Link>
										</div>
									</motion.div>
								))
							) : (
								<div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
									<div className="mb-6 rounded-full bg-slate-50 p-8 text-slate-300">
										<Search size={64} strokeWidth={1} />
									</div>
									<h2 className="mb-2 text-2xl font-bold text-slate-900">Không tìm thấy kết quả</h2>
									<p className="text-slate-500">
										Rất tiếc, chúng tôi không tìm thấy nội dung nào khớp với từ khóa của bạn.
										<br />
										Vui lòng thử lại với từ khóa khác.
									</p>
								</div>
							)}
						</AnimatePresence>
					</div>
				)}
			</div>
		</div>
	);
}

export default function SearchPage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-white">
					<Loader2 className="text-stem-blue animate-spin" size={48} />
				</div>
			}
		>
			<SearchResults />
		</Suspense>
	);
}
