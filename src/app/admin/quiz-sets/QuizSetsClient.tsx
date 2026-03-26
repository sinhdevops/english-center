"use client";

import { useState } from "react";
import {
	ChevronDown,
	ChevronRight,
	Trash2,
	Plus,
	Pencil,
	Check,
	X,
	Clock,
	BookOpen,
	ToggleLeft,
	ToggleRight,
} from "lucide-react";
import { toast } from "sonner";
import { QuizSet, QuizQuestion } from "@/lib/types";
import {
	createQuizSet,
	updateQuizSet,
	deleteQuizSet,
	createQuizQuestion,
	updateQuizQuestion,
	deleteQuizQuestion,
} from "./actions";

interface Props {
	initialQuizSets: QuizSet[];
}

const AGE_GROUPS = ["3-4 tuổi", "4-5 tuổi", "5-6 tuổi", "Tiểu học"];

function QuestionRow({
	question,
	onDelete,
}: {
	question: QuizQuestion;
	onDelete: (id: number) => void;
}) {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(question.text);
	const [options, setOptions] = useState<string[]>(question.options);
	const [correctAnswer, setCorrectAnswer] = useState(question.correct_answer);
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateQuizQuestion(question.id, { text, options, correct_answer: correctAnswer });
			toast.success("Đã cập nhật câu hỏi");
			setEditing(false);
		} catch {
			toast.error("Lỗi khi cập nhật câu hỏi");
		} finally {
			setSaving(false);
		}
	};

	if (editing) {
		return (
			<tr className="bg-blue-50/40">
				<td className="px-4 py-3 text-slate-500 text-xs">{question.question_order}</td>
				<td className="px-4 py-3">
					<input
						className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</td>
				<td className="px-4 py-3">
					<div className="space-y-1">
						{options.map((opt, i) => (
							<div key={i} className="flex items-center gap-1">
								<span className="text-xs text-slate-400 w-4">{i}.</span>
								<input
									className="flex-1 rounded border border-slate-200 px-2 py-0.5 text-xs"
									value={opt}
									onChange={(e) => {
										const next = [...options];
										next[i] = e.target.value;
										setOptions(next);
									}}
								/>
								<input
									type="radio"
									name={`correct-${question.id}`}
									checked={correctAnswer === i}
									onChange={() => setCorrectAnswer(i)}
									title="Đáp án đúng"
								/>
							</div>
						))}
					</div>
				</td>
				<td className="px-4 py-3 text-right">
					<div className="flex items-center justify-end gap-1">
						<button
							onClick={handleSave}
							disabled={saving}
							className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50"
							title="Lưu"
						>
							<Check size={14} />
						</button>
						<button
							onClick={() => setEditing(false)}
							className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
							title="Huỷ"
						>
							<X size={14} />
						</button>
					</div>
				</td>
			</tr>
		);
	}

	return (
		<tr className="border-t border-slate-100 hover:bg-slate-50/60">
			<td className="px-4 py-3 text-xs text-slate-400">{question.question_order}</td>
			<td className="px-4 py-3 text-sm font-medium text-slate-700">{question.text}</td>
			<td className="px-4 py-3">
				<div className="flex flex-wrap gap-1">
					{question.options.map((opt, i) => (
						<span
							key={i}
							className={`rounded px-2 py-0.5 text-xs font-medium ${
								i === question.correct_answer
									? "bg-emerald-100 text-emerald-700"
									: "bg-slate-100 text-slate-500"
							}`}
						>
							{opt}
						</span>
					))}
				</div>
			</td>
			<td className="px-4 py-3 text-right">
				<div className="flex items-center justify-end gap-1">
					<button
						onClick={() => setEditing(true)}
						className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
						title="Sửa"
					>
						<Pencil size={14} />
					</button>
					<button
						onClick={() => onDelete(question.id)}
						className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
						title="Xóa"
					>
						<Trash2 size={14} />
					</button>
				</div>
			</td>
		</tr>
	);
}

function AddQuestionRow({
	quizSetId,
	nextOrder,
	onDone,
}: {
	quizSetId: string;
	nextOrder: number;
	onDone: () => void;
}) {
	const [text, setText] = useState("");
	const [options, setOptions] = useState(["", "", "", ""]);
	const [correctAnswer, setCorrectAnswer] = useState(0);
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		if (!text.trim() || options.some((o) => !o.trim())) {
			toast.error("Vui lòng điền đầy đủ câu hỏi và các đáp án");
			return;
		}
		setSaving(true);
		try {
			await createQuizQuestion({
				quiz_set_id: quizSetId,
				question_order: nextOrder,
				text: text.trim(),
				options: options.map((o) => o.trim()),
				correct_answer: correctAnswer,
			});
			toast.success("Đã thêm câu hỏi");
			onDone();
		} catch {
			toast.error("Lỗi khi thêm câu hỏi");
		} finally {
			setSaving(false);
		}
	};

	return (
		<tr className="bg-blue-50/30 border-t border-blue-100">
			<td className="px-4 py-3 text-xs text-slate-400">{nextOrder}</td>
			<td className="px-4 py-3">
				<input
					className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm"
					placeholder="Từ / câu hỏi..."
					value={text}
					onChange={(e) => setText(e.target.value)}
					autoFocus
				/>
			</td>
			<td className="px-4 py-3">
				<div className="space-y-1">
					{options.map((opt, i) => (
						<div key={i} className="flex items-center gap-1">
							<span className="text-xs text-slate-400 w-4">{i}.</span>
							<input
								className="flex-1 rounded border border-slate-200 px-2 py-0.5 text-xs"
								placeholder={`Đáp án ${i}`}
								value={opt}
								onChange={(e) => {
									const next = [...options];
									next[i] = e.target.value;
									setOptions(next);
								}}
							/>
							<input
								type="radio"
								name={`new-correct-${quizSetId}`}
								checked={correctAnswer === i}
								onChange={() => setCorrectAnswer(i)}
								title="Đáp án đúng"
							/>
						</div>
					))}
				</div>
			</td>
			<td className="px-4 py-3 text-right">
				<div className="flex items-center justify-end gap-1">
					<button
						onClick={handleSave}
						disabled={saving}
						className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50"
						title="Lưu"
					>
						<Check size={14} />
					</button>
					<button
						onClick={onDone}
						className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
						title="Huỷ"
					>
						<X size={14} />
					</button>
				</div>
			</td>
		</tr>
	);
}

function QuizSetRow({ quizSet }: { quizSet: QuizSet }) {
	const [expanded, setExpanded] = useState(false);
	const [editing, setEditing] = useState(false);
	const [addingQuestion, setAddingQuestion] = useState(false);
	const [title, setTitle] = useState(quizSet.title);
	const [ageGroup, setAgeGroup] = useState(quizSet.age_group);
	const [durationMinutes, setDurationMinutes] = useState(Math.round(quizSet.duration_seconds / 60));
	const [isActive, setIsActive] = useState(quizSet.is_active);
	const [saving, setSaving] = useState(false);

	const handleSaveSet = async () => {
		setSaving(true);
		try {
			await updateQuizSet(quizSet.id, {
				title,
				age_group: ageGroup,
				duration_seconds: durationMinutes * 60,
				is_active: isActive,
			});
			toast.success("Đã cập nhật quiz set");
			setEditing(false);
		} catch {
			toast.error("Lỗi khi cập nhật quiz set");
		} finally {
			setSaving(false);
		}
	};

	const handleDeleteSet = async () => {
		if (!confirm(`Xóa quiz set "${quizSet.title}"? Tất cả câu hỏi cũng sẽ bị xóa.`)) return;
		try {
			await deleteQuizSet(quizSet.id);
			toast.success("Đã xóa quiz set");
		} catch {
			toast.error("Lỗi khi xóa quiz set");
		}
	};

	const handleToggleActive = async () => {
		try {
			await updateQuizSet(quizSet.id, { is_active: !isActive });
			setIsActive((v) => !v);
			toast.success(isActive ? "Đã tắt quiz set" : "Đã bật quiz set");
		} catch {
			toast.error("Lỗi khi cập nhật trạng thái");
		}
	};

	const handleDeleteQuestion = async (id: number) => {
		if (!confirm("Xóa câu hỏi này?")) return;
		try {
			await deleteQuizQuestion(id);
			toast.success("Đã xóa câu hỏi");
		} catch {
			toast.error("Lỗi khi xóa câu hỏi");
		}
	};

	const nextOrder = quizSet.questions.length > 0
		? Math.max(...quizSet.questions.map((q) => q.question_order)) + 1
		: 1;

	return (
		<>
			{/* Quiz Set Row */}
			<tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
				<td className="px-6 py-4">
					<button
						onClick={() => setExpanded((v) => !v)}
						className="flex items-center gap-2 text-left"
					>
						{expanded ? (
							<ChevronDown size={16} className="shrink-0 text-slate-400" />
						) : (
							<ChevronRight size={16} className="shrink-0 text-slate-400" />
						)}
						{editing ? (
							<input
								className="rounded-lg border border-slate-200 px-2 py-1 text-sm font-medium"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								onClick={(e) => e.stopPropagation()}
							/>
						) : (
							<span className="font-semibold text-slate-800">{title}</span>
						)}
					</button>
					{!editing && (
						<div className="ml-6 mt-1">
							<span className="text-xs font-mono text-slate-400">{quizSet.id}</span>
						</div>
					)}
				</td>
				<td className="px-6 py-4">
					{editing ? (
						<select
							className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
							value={ageGroup}
							onChange={(e) => setAgeGroup(e.target.value)}
						>
							{AGE_GROUPS.map((ag) => (
								<option key={ag} value={ag}>{ag}</option>
							))}
						</select>
					) : (
						<span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
							{quizSet.age_group}
						</span>
					)}
				</td>
				<td className="px-6 py-4">
					<div className="flex items-center gap-1 text-slate-600">
						<BookOpen size={14} className="text-slate-400" />
						{quizSet.questions.length} câu
					</div>
				</td>
				<td className="px-6 py-4">
					{editing ? (
						<div className="flex items-center gap-1">
							<input
								type="number"
								min={1}
								className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-sm"
								value={durationMinutes}
								onChange={(e) => setDurationMinutes(Number(e.target.value))}
							/>
							<span className="text-xs text-slate-400">phút</span>
						</div>
					) : (
						<div className="flex items-center gap-1 text-slate-600">
							<Clock size={14} className="text-slate-400" />
							{Math.round(quizSet.duration_seconds / 60)} phút
						</div>
					)}
				</td>
				<td className="px-6 py-4">
					<button
						onClick={handleToggleActive}
						className={`flex items-center gap-1 text-xs font-bold ${
							isActive ? "text-emerald-600" : "text-slate-400"
						}`}
					>
						{isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
						{isActive ? "Hoạt động" : "Ẩn"}
					</button>
				</td>
				<td className="px-6 py-4 text-right">
					<div className="flex items-center justify-end gap-1">
						{editing ? (
							<>
								<button
									onClick={handleSaveSet}
									disabled={saving}
									className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
									title="Lưu"
								>
									<Check size={15} />
								</button>
								<button
									onClick={() => setEditing(false)}
									className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
									title="Huỷ"
								>
									<X size={15} />
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => setEditing(true)}
									className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
									title="Sửa"
								>
									<Pencil size={15} />
								</button>
								<button
									onClick={handleDeleteSet}
									className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
									title="Xóa"
								>
									<Trash2 size={15} />
								</button>
							</>
						)}
					</div>
				</td>
			</tr>

			{/* Expanded questions */}
			{expanded && (
				<tr>
					<td colSpan={6} className="bg-slate-50/50 px-6 py-4">
						<div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-slate-100 bg-slate-50">
										<th className="px-4 py-2 text-left text-xs font-bold text-slate-500 w-10">#</th>
										<th className="px-4 py-2 text-left text-xs font-bold text-slate-500">Câu hỏi</th>
										<th className="px-4 py-2 text-left text-xs font-bold text-slate-500">Đáp án (xanh = đúng)</th>
										<th className="px-4 py-2 text-right text-xs font-bold text-slate-500 w-24">Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{quizSet.questions
										.sort((a, b) => a.question_order - b.question_order)
										.map((q) => (
											<QuestionRow
												key={q.id}
												question={q}
												onDelete={handleDeleteQuestion}
											/>
										))}
									{addingQuestion && (
										<AddQuestionRow
											quizSetId={quizSet.id}
											nextOrder={nextOrder}
											onDone={() => setAddingQuestion(false)}
										/>
									)}
									<tr>
										<td colSpan={4} className="px-4 py-2 border-t border-slate-100">
											<button
												onClick={() => setAddingQuestion(true)}
												className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
											>
												<Plus size={13} /> Thêm câu hỏi
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</td>
				</tr>
			)}
		</>
	);
}

function AddQuizSetForm({ onDone }: { onDone: () => void }) {
	const [id, setId] = useState("");
	const [title, setTitle] = useState("Test đánh giá năng lực tư duy");
	const [ageGroup, setAgeGroup] = useState(AGE_GROUPS[0]);
	const [durationMinutes, setDurationMinutes] = useState(45);
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		if (!id.trim() || !title.trim()) {
			toast.error("Vui lòng điền ID và tiêu đề");
			return;
		}
		setSaving(true);
		try {
			await createQuizSet({
				id: id.trim(),
				title: title.trim(),
				age_group: ageGroup,
				duration_seconds: durationMinutes * 60,
			});
			toast.success("Đã tạo quiz set");
			onDone();
		} catch (e: any) {
			toast.error(e?.message || "Lỗi khi tạo quiz set");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5">
			<h3 className="mb-4 font-bold text-slate-800">Thêm Quiz Set mới</h3>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				<div>
					<label className="mb-1 block text-xs font-bold text-slate-600">ID (slug) *</label>
					<input
						className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
						placeholder="vd: tu-duy-3-4-tuoi"
						value={id}
						onChange={(e) => setId(e.target.value)}
						autoFocus
					/>
				</div>
				<div>
					<label className="mb-1 block text-xs font-bold text-slate-600">Tiêu đề *</label>
					<input
						className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label className="mb-1 block text-xs font-bold text-slate-600">Nhóm tuổi</label>
					<select
						className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
						value={ageGroup}
						onChange={(e) => setAgeGroup(e.target.value)}
					>
						{AGE_GROUPS.map((ag) => (
							<option key={ag} value={ag}>{ag}</option>
						))}
					</select>
				</div>
				<div>
					<label className="mb-1 block text-xs font-bold text-slate-600">Thời gian (phút)</label>
					<input
						type="number"
						min={1}
						className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
						value={durationMinutes}
						onChange={(e) => setDurationMinutes(Number(e.target.value))}
					/>
				</div>
			</div>
			<div className="mt-4 flex gap-2">
				<button
					onClick={handleSave}
					disabled={saving}
					className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
				>
					Tạo Quiz Set
				</button>
				<button
					onClick={onDone}
					className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
				>
					Huỷ
				</button>
			</div>
		</div>
	);
}

export default function QuizSetsClient({ initialQuizSets }: Props) {
	const [showAddForm, setShowAddForm] = useState(false);

	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-slate-900">Quản lý Bài Test</h1>
					<p className="text-sm text-slate-500">Thêm, sửa, xóa quiz sets và câu hỏi.</p>
				</div>
				<button
					onClick={() => setShowAddForm((v) => !v)}
					className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
				>
					<Plus size={16} /> Thêm Quiz Set
				</button>
			</div>

			{showAddForm && <AddQuizSetForm onDone={() => setShowAddForm(false)} />}

			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-left text-sm">
						<thead>
							<tr className="border-b border-slate-100 bg-slate-50/50">
								<th className="px-6 py-4 font-bold text-slate-700">Tiêu đề</th>
								<th className="px-6 py-4 font-bold text-slate-700">Nhóm tuổi</th>
								<th className="px-6 py-4 font-bold text-slate-700">Câu hỏi</th>
								<th className="px-6 py-4 font-bold text-slate-700">Thời gian</th>
								<th className="px-6 py-4 font-bold text-slate-700">Trạng thái</th>
								<th className="px-6 py-4 text-right font-bold text-slate-700">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{initialQuizSets.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center text-slate-400">
										Chưa có quiz set nào
									</td>
								</tr>
							) : (
								initialQuizSets.map((qs) => <QuizSetRow key={qs.id} quizSet={qs} />)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
