"use client";

import { Phone, Mail, ClipboardCheck, Calendar, Trash2, CheckCircle2 } from "lucide-react";
import { QuizResult } from "@/lib/types";
import { toast } from "sonner";
import { deleteQuizResult } from "./actions";

interface QuizResultsClientProps {
	initialResults: QuizResult[];
}

export default function QuizResultsClient({ initialResults }: QuizResultsClientProps) {
	const handleDelete = async (id: string) => {
		if (!confirm("Bạn có chắc muốn xóa kết quả này?")) return;
		try {
			await deleteQuizResult(id);
			toast.success("Đã xóa kết quả");
		} catch {
			toast.error("Lỗi khi xóa kết quả");
		}
	};

	const getScoreColor = (score: number | null) => {
		if (score === null) return "text-slate-400";
		if (score >= 8) return "text-emerald-600";
		if (score >= 5) return "text-amber-600";
		return "text-red-500";
	};

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-slate-900">Kết quả bài test online</h1>
				<p className="text-sm text-slate-500">Danh sách học viên đã hoàn thành bài kiểm tra trực tuyến.</p>
			</div>

			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-left">
						<thead>
							<tr className="border-b border-slate-100 bg-slate-50/50">
								<th className="px-6 py-4 font-bold text-slate-700">Thông tin học viên</th>
								<th className="px-6 py-4 font-bold text-slate-700">SĐT phụ huynh</th>
								<th className="px-6 py-4 font-bold text-slate-700">Bài test</th>
								<th className="px-6 py-4 font-bold text-slate-700">Số câu hoàn thành</th>
								<th className="px-6 py-4 font-bold text-slate-700">Điểm</th>
								<th className="px-6 py-4 font-bold text-slate-700">Ngày làm bài</th>
								<th className="px-6 py-4 text-right font-bold text-slate-700">Thao tác</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{initialResults.length === 0 ? (
								<tr>
									<td colSpan={7} className="px-6 py-12 text-center text-slate-400">
										Chưa có kết quả bài test nào
									</td>
								</tr>
							) : (
								initialResults.map((result) => (
									<tr key={result.id} className="transition-colors hover:bg-slate-50/50">
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<Mail size={12} className="shrink-0 text-slate-400" />
												{result.user_email || "—"}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<Phone size={15} className="shrink-0 text-slate-400" />
												{result.parent_phone}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<ClipboardCheck size={15} className="text-indigo-400" />
												<span className="font-semibold text-indigo-600">
													Bài test #{result.quiz_slug}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1 font-semibold text-slate-700">
												<CheckCircle2 size={15} className="text-emerald-400" />
												{result.completed_count}
												<span className="text-slate-400">/ {result.total_questions}</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<span
												className={`text-xl font-black ${getScoreColor(result.score)}`}
											>
												{result.score ?? "—"}
											</span>
											<span className="text-slate-400">/10</span>
										</td>
										<td className="px-6 py-4 text-slate-500">
											<div className="flex items-center gap-1">
												<Calendar size={15} />
												{result.completed_at
													? new Date(result.completed_at).toLocaleDateString("vi-VN")
													: "—"}
											</div>
										</td>
										<td className="px-6 py-4 text-right">
											<button
												onClick={() => handleDelete(result.id)}
												className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
												title="Xóa"
											>
												<Trash2 size={16} />
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
