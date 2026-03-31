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
	ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { QuizSet, QuizQuestion } from "@/lib/types";
import { Modal } from "@/components/ui/modal";
import {
	createQuizSet,
	updateQuizSet,
	deleteQuizSet,
	createQuizQuestion,
	updateQuizQuestion,
	deleteQuizQuestion,
	uploadQuizImage,
} from "./actions";

interface Props {
	initialQuizSets: QuizSet[];
}

const AGE_GROUPS = ["3-4 tuổi", "4-5 tuổi", "5-6 tuổi", "Tiểu học"];

function ImageUploadSlot({
	index,
	existingUrl,
	newFile,
	newPreview,
	onFileChange,
}: {
	index: number;
	existingUrl?: string;
	newFile: File | null;
	newPreview: string;
	onFileChange: (idx: number, file: File | null) => void;
}) {
	const preview = newPreview || existingUrl || "";
	const label = String.fromCharCode(65 + index);
	return (
		<div className="flex flex-col items-center gap-1">
			<label className="cursor-pointer group">
				<div
					className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors ${
						preview ? "border-indigo-300 bg-slate-50" : "border-slate-300 bg-slate-50 hover:border-indigo-400"
					}`}
				>
					{preview ? (
						<img src={preview} alt={label} className="h-full w-full object-cover" />
					) : (
						<ImageIcon size={18} className="text-slate-300 group-hover:text-indigo-400" />
					)}
					<span className="absolute bottom-0 right-0 rounded-tl bg-black/50 px-1 text-[9px] font-black text-white">
						{label}
					</span>
				</div>
				<input
					type="file"
					accept="image/*"
					className="sr-only"
					onChange={(e) => onFileChange(index, e.target.files?.[0] ?? null)}
				/>
			</label>
		</div>
	);
}

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
	const [optionType, setOptionType] = useState<'text' | 'image'>(question.option_type ?? 'text');
	const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);
	const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", "", ""]);
	const [saving, setSaving] = useState(false);

	const handleImageChange = (idx: number, file: File | null) => {
		const newFiles = [...imageFiles];
		newFiles[idx] = file;
		setImageFiles(newFiles);
		const newPreviews = [...imagePreviews];
		newPreviews[idx] = file ? URL.createObjectURL(file) : "";
		setImagePreviews(newPreviews);
	};

	const handleSave = async () => {
		setSaving(true);
		try {
			let imageUrls: string[] | null = question.option_images ?? null;
			if (optionType === 'image') {
				// Upload only slots where a new file was selected
				const urls = [...(question.option_images ?? ["", "", "", ""])];
				for (let i = 0; i < 4; i++) {
					if (imageFiles[i]) {
						const fd = new FormData();
						fd.append("file", imageFiles[i]!);
						urls[i] = await uploadQuizImage(fd);
					}
				}
				imageUrls = urls;
			}
			await updateQuizQuestion(question.id, {
				text,
				options,
				correct_answer: correctAnswer,
				option_type: optionType,
				option_images: optionType === 'image' ? imageUrls : null,
			});
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
					<div className="mb-2">
						<select
							className="rounded border border-slate-200 px-2 py-0.5 text-xs"
							value={optionType}
							onChange={(e) => setOptionType(e.target.value as 'text' | 'image')}
						>
							<option value="text">Text</option>
							<option value="image">Hình ảnh</option>
						</select>
					</div>
					{optionType === 'image' ? (
						<div className="space-y-1.5">
							{options.map((opt, i) => (
								<div key={i} className="flex items-center gap-2">
									<ImageUploadSlot
										index={i}
										existingUrl={question.option_images?.[i] ?? ""}
										newFile={imageFiles[i]}
										newPreview={imagePreviews[i]}
										onFileChange={handleImageChange}
									/>
									<input
										className="flex-1 rounded border border-slate-200 px-2 py-0.5 text-xs"
										placeholder={`Nhãn đáp án ${String.fromCharCode(65 + i)}`}
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
					) : (
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
					)}
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
				{question.option_type === 'image' ? (
					<div className="flex items-center gap-1.5">
						<ImageIcon size={12} className="text-indigo-400" />
						<div className="flex gap-1">
							{(question.option_images ?? []).map((url, i) => (
								<img
									key={i}
									src={url}
									alt={question.options[i]}
									className={`h-8 w-8 rounded object-cover ring-2 ${
										i === question.correct_answer ? "ring-emerald-400" : "ring-transparent"
									}`}
								/>
							))}
						</div>
					</div>
				) : (
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
				)}
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
	const [optionType, setOptionType] = useState<'text' | 'image'>('text');
	const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);
	const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", "", ""]);
	const [saving, setSaving] = useState(false);

	const handleImageChange = (idx: number, file: File | null) => {
		const newFiles = [...imageFiles];
		newFiles[idx] = file;
		setImageFiles(newFiles);
		const newPreviews = [...imagePreviews];
		newPreviews[idx] = file ? URL.createObjectURL(file) : "";
		setImagePreviews(newPreviews);
	};

	const handleSave = async () => {
		if (!text.trim()) {
			toast.error("Vui lòng điền câu hỏi");
			return;
		}
		if (optionType === 'image') {
			if (imageFiles.some((f) => !f)) {
				toast.error("Vui lòng chọn đủ 4 ảnh đáp án");
				return;
			}
		} else {
			if (options.some((o) => !o.trim())) {
				toast.error("Vui lòng điền đầy đủ các đáp án");
				return;
			}
		}
		setSaving(true);
		try {
			let imageUrls: string[] | null = null;
			if (optionType === 'image') {
				const urls: string[] = [];
				for (const file of imageFiles) {
					const fd = new FormData();
					fd.append("file", file!);
					urls.push(await uploadQuizImage(fd));
				}
				imageUrls = urls;
			}
			await createQuizQuestion({
				quiz_set_id: quizSetId,
				question_order: nextOrder,
				text: text.trim(),
				options: options.map((o) => o.trim()),
				correct_answer: correctAnswer,
				option_type: optionType,
				option_images: imageUrls,
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
				<div className="mb-2">
					<select
						className="rounded border border-slate-200 px-2 py-0.5 text-xs"
						value={optionType}
						onChange={(e) => setOptionType(e.target.value as 'text' | 'image')}
					>
						<option value="text">Text</option>
						<option value="image">Hình ảnh</option>
					</select>
				</div>
				{optionType === 'image' ? (
					<div className="space-y-1.5">
						{options.map((opt, i) => (
							<div key={i} className="flex items-center gap-2">
								<ImageUploadSlot
									index={i}
									existingUrl=""
									newFile={imageFiles[i]}
									newPreview={imagePreviews[i]}
									onFileChange={handleImageChange}
								/>
								<input
									className="flex-1 rounded border border-slate-200 px-2 py-0.5 text-xs"
									placeholder={`Nhãn đáp án ${String.fromCharCode(65 + i)} (vd: Quả táo)`}
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
				) : (
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
				)}
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
	const [confirmModal, setConfirmModal] = useState<{
		open: boolean;
		message: string;
		onConfirm: () => void;
	}>({ open: false, message: "", onConfirm: () => {} });
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

	const handleDeleteSet = () => {
		setConfirmModal({
			open: true,
			message: `Xóa quiz set "${quizSet.title}"? Tất cả câu hỏi cũng sẽ bị xóa.`,
			onConfirm: async () => {
				try {
					await deleteQuizSet(quizSet.id);
					toast.success("Đã xóa quiz set");
				} catch {
					toast.error("Lỗi khi xóa quiz set");
				}
			},
		});
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

	const handleDeleteQuestion = (id: number) => {
		setConfirmModal({
			open: true,
			message: "Xóa câu hỏi này?",
			onConfirm: async () => {
				try {
					await deleteQuizQuestion(id);
					toast.success("Đã xóa câu hỏi");
				} catch {
					toast.error("Lỗi khi xóa câu hỏi");
				}
			},
		});
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

			<Modal
				isOpen={confirmModal.open}
				onClose={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
				title="Xác nhận xóa"
			>
				<div className="space-y-5 text-center">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
						<Trash2 size={28} className="text-red-500" />
					</div>
					<p className="text-sm text-slate-600">{confirmModal.message}</p>
					<div className="flex gap-3">
						<button
							onClick={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
							className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
						>
							Huỷ
						</button>
						<button
							onClick={() => {
								setConfirmModal((prev) => ({ ...prev, open: false }));
								confirmModal.onConfirm();
							}}
							className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white hover:bg-red-600"
						>
							Xóa
						</button>
					</div>
				</div>
			</Modal>
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
	const [filterAge, setFilterAge] = useState<string>("all");

	const filtered = filterAge === "all"
		? initialQuizSets
		: initialQuizSets.filter((qs) => qs.age_group === filterAge);

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

			{/* Filter */}
			<div className="mb-4 flex flex-wrap gap-2">
				{["all", ...AGE_GROUPS].map((ag) => (
					<button
						key={ag}
						onClick={() => setFilterAge(ag)}
						className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
							filterAge === ag
								? "bg-indigo-600 text-white"
								: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
						}`}
					>
						{ag === "all" ? "Tất cả" : ag}
					</button>
				))}
			</div>

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
							{filtered.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center text-slate-400">
										Không có quiz set nào
									</td>
								</tr>
							) : (
								filtered.map((qs) => <QuizSetRow key={qs.id} quizSet={qs} />)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
