import React, { useState } from "react";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { courseSchema } from "@/lib/validations/admin";
import { Course, Program } from "@/lib/types";
import * as z from "zod";

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingCourse: Course | null;
	selectedProgramId: string | null;
	programs: Program[];
	onSubmit: (data: CourseFormData) => Promise<void>;
	isSubmitting: boolean;
}

export const CourseModal = ({
	isOpen,
	onClose,
	editingCourse,
	selectedProgramId,
	programs,
	onSubmit,
	isSubmitting,
}: CourseModalProps) => {
	const [formData, setFormData] = useState<CourseFormData>(() => {
		if (editingCourse) {
			return {
				program_id: editingCourse.program_id,
				name: editingCourse.name,
				duration: editingCourse.duration || "",
				level: editingCourse.level || "",
				description: editingCourse.description || "",
			};
		}
		return {
			program_id: selectedProgramId || "",
			name: "",
			duration: "",
			level: "",
			description: "",
		};
	});
	const [errors, setErrors] = useState<Partial<Record<keyof CourseFormData, string>>>({});

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof CourseFormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name as keyof CourseFormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = courseSchema.safeParse(formData);

		if (!result.success) {
			const newErrors: Partial<Record<keyof CourseFormData, string>> = {};
			result.error.issues.forEach((issue) => {
				const path = issue.path[0] as string;
				if (path) {
					newErrors[path as keyof CourseFormData] = issue.message;
				}
			});
			setErrors(newErrors);
			return;
		}

		await onSubmit(formData);
	};

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingCourse ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}
			maxWidth="max-w-md"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				<AdminFormField label="Chương trình" error={errors.program_id} required>
					<select
						name="program_id"
						value={formData.program_id}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm disabled:opacity-60"
						disabled={!!selectedProgramId}
					>
						{programs.map((p) => (
							<option key={p.id} value={p.id}>
								{p.name}
							</option>
						))}
					</select>
				</AdminFormField>

				<AdminFormField label="Tên khóa học" error={errors.name} required>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<div className="grid grid-cols-2 gap-4">
					<AdminFormField label="Thời lượng" error={errors.duration}>
						<input
							type="text"
							name="duration"
							value={formData.duration || ""}
							onChange={handleChange}
							placeholder="Ví dụ: 24 buổi"
							className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
						/>
					</AdminFormField>
					<AdminFormField label="Trình độ" error={errors.level}>
						<input
							type="text"
							name="level"
							value={formData.level || ""}
							onChange={handleChange}
							placeholder="Ví dụ: A1 - A2"
							className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
						/>
					</AdminFormField>
				</div>

				<AdminFormField label="Mô tả ngắn" error={errors.description}>
					<textarea
						name="description"
						value={formData.description || ""}
						onChange={handleTextareaChange}
						placeholder="Mô tả ngắn về khóa học..."
						rows={3}
						className="mt-1 block w-full resize-none rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<div className="mt-8 flex gap-3 border-t border-slate-100 pt-4">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition-colors hover:"
					>
						Hủy
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-stem-blue hover:bg-opacity-90 flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
					>
						{isSubmitting ? "Đang lưu..." : "Lưu"}
					</button>
				</div>
			</form>
		</AdminModal>
	);
};
