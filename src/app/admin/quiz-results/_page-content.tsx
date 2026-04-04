"use client";

import { useSearchParams } from "next/navigation";

import { useState } from "react";
import { Phone, Mail, ClipboardCheck, Calendar, Trash2, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { QuizResult } from "@/lib/types";
import { toast } from "sonner";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { deleteQuizResult } from "@/actions/quiz-result.actions";

interface QuizResultsClientProps {
	initialResults: QuizResult[];
}

const getScoreColor = (score: number | null) => {
	if (score === null) return "text-slate-400";
	if (score >= 8) return "text-emerald-600";
	if (score >= 5) return "text-amber-600";
	return "text-red-500";
};

export default function QuizResultsClient({ initialResults }: QuizResultsClientProps) {
	const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set());
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

	const ITEMS_PER_PAGE = 10;

	const handleDelete = async (id: string) => {
		if (!confirm("Bạn có chắc muốn xóa kết quả này?")) return;
		try {
			await deleteQuizResult(id);
			toast.success("Đã xóa kết quả");
		} catch {
			toast.error("Lỗi khi xóa kết quả");
		}
	};

	const toggleEmail = (email: string) => {
		setExpandedEmails((prev) => {
			const next = new Set(prev);
			if (next.has(email)) next.delete(email);
			else next.add(email);
			return next;
		});
	};

	// Group by email
	const grouped = initialResults.reduce<Record<string, QuizResult[]>>((acc, r) => {
		const key = r.user_email || "unknown";
		if (!acc[key]) acc[key] = [];
		acc[key].push(r);
		return acc;
	}, {});

	const groupEntries = Object.entries(grouped);
	const totalPages = Math.ceil(groupEntries.length / ITEMS_PER_PAGE);
	const paginatedGroupEntries = groupEntries.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-slate-900">Kết quả bài test online</h1>
				<p className="text-sm text-slate-500">Danh sách học viên đã hoàn thành bài kiểm tra trực tuyến.</p>
			</div>

			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-left text-sm">
						<thead>
							<tr className="border-b border-slate-100 /50">
								<th className="px-6 py-4 font-bold text-slate-700">Thông tin học viên</th>
								<th className="px-6 py-4 font-bold text-slate-700">SĐT phụ huynh</th>
								<th className="px-6 py-4 font-bold text-slate-700">Số bài đã làm</th>
								<th className="px-6 py-4 font-bold text-slate-700">Lần gần nhất</th>
								<th className="px-6 py-4 text-right font-bold text-slate-700">Thao tác</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{groupEntries.length === 0 ? (
								<tr>
									<td colSpan={5} className="px-6 py-12 text-center text-slate-400">
										Chưa có kết quả bài test nào
									</td>
								</tr>
							) : (
								paginatedGroupEntries.map(([email, results]) => {
									const isExpanded = expandedEmails.has(email);
									const latest = results.reduce((a, b) =>
										(a.completed_at ?? "") > (b.completed_at ?? "") ? a : b
									);

									return (
										<>
											{/* Group row */}
											<tr
												key={email}
												onClick={() => toggleEmail(email)}
												className="cursor-pointer transition-colors hover:"
											>
												<td className="px-6 py-4">
													<div className="flex items-center gap-2">
														{isExpanded ? (
															<ChevronDown size={15} className="shrink-0 text-slate-400" />
														) : (
															<ChevronRight size={15} className="shrink-0 text-slate-400" />
														)}
														<Mail size={12} className="shrink-0 text-slate-400" />
														<span className="font-medium text-slate-800">{email}</span>
													</div>
												</td>
												<td className="px-6 py-4 text-slate-600">
													<div className="flex items-center gap-2">
														<Phone size={14} className="text-slate-400" />
														{latest.parent_phone}
													</div>
												</td>
												<td className="px-6 py-4">
													<span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
														<ClipboardCheck size={13} />
														{results.length} bài
													</span>
												</td>
												<td className="px-6 py-4 text-slate-500">
													<div className="flex items-center gap-1">
														<Calendar size={14} />
														{latest.completed_at
															? new Date(latest.completed_at).toLocaleDateString("vi-VN")
															: "—"}
													</div>
												</td>
												<td className="px-6 py-4" />
											</tr>

											{/* Expanded rows */}
											{isExpanded &&
												results.map((result) => (
													<tr
														key={result.id}
														className="/60 transition-colors hover:bg-slate-100/60"
													>
														<td className="py-3 pl-16 pr-6 text-slate-500">
															<div className="flex items-center gap-2">
																<ClipboardCheck size={14} className="text-indigo-400" />
																<span className="font-semibold text-indigo-600">
																	Bài test #{result.quiz_slug}
																</span>
															</div>
														</td>
														<td className="px-6 py-3">
															<div className="flex items-center gap-1 text-slate-600">
																<CheckCircle2 size={14} className="text-emerald-400" />
																<span className="font-semibold">
																	{result.completed_count}
																</span>
																<span className="text-slate-400">/ {result.total_questions}</span>
															</div>
														</td>
														<td className="px-6 py-3">
															<span className={`text-lg font-black ${getScoreColor(result.score)}`}>
																{result.score ?? "—"}
															</span>
															<span className="text-xs text-slate-400">/10</span>
														</td>
														<td className="px-6 py-3 text-slate-500">
															<div className="flex items-center gap-1 text-xs">
																<Calendar size={13} />
																{result.completed_at
																	? new Date(result.completed_at).toLocaleDateString("vi-VN")
																	: "—"}
															</div>
														</td>
														<td className="px-6 py-3 text-right">
															<button
																onClick={(e) => {
																	e.stopPropagation();
																	handleDelete(result.id);
																}}
																className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
																title="Xóa"
															>
																<Trash2 size={15} />
															</button>
														</td>
													</tr>
												))}
										</>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</div>
			<AdminPagination currentPage={currentPage} totalPages={totalPages} />
		</>
	);
}
