import React, { useState } from "react";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { studentSchema } from "@/lib/validations/admin";
import { Branch, Course, ClassSchedule, Student } from "@/lib/types";
import * as z from "zod";

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingStudent: Student | null;
	branches: Branch[];
	courses: Course[];
	schedules: ClassSchedule[];
	onSubmit: (data: StudentFormData) => Promise<void>;
	isSubmitting: boolean;
}

export const StudentModal = ({
	isOpen,
	onClose,
	editingStudent,
	branches,
	courses,
	schedules,
	onSubmit,
	isSubmitting,
}: StudentModalProps) => {
	const [formData, setFormData] = useState<StudentFormData>(() => {
		if (editingStudent) {
			return {
				name: editingStudent.name,
				age: editingStudent.age,
				grade: editingStudent.grade,
				parent_name: editingStudent.parent_name,
				phone: editingStudent.phone,
				email: editingStudent.email,
				branch_id: editingStudent.branch_id,
				course_id: editingStudent.course_id,
				schedule_id: editingStudent.schedule_id || null,
				status: editingStudent.status as any,
			};
		}
		return {
			name: "",
			age: 0,
			grade: "",
			parent_name: "",
			phone: "",
			email: "",
			branch_id: branches[0]?.id || "",
			course_id: courses[0]?.id || "",
			schedule_id: null,
			status: "active",
		};
	});
	const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const val = type === "number" ? (value === "" ? 0 : Number(value)) : value;

		setFormData((prev) => ({
			...prev,
			[name]: val,
		}));

		if (errors[name as keyof StudentFormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = studentSchema.safeParse(formData);

		if (!result.success) {
			const newErrors: Partial<Record<keyof StudentFormData, string>> = {};
			result.error.issues.forEach((issue) => {
				const path = issue.path[0] as string;
				if (path) {
					newErrors[path as keyof StudentFormData] = issue.message;
				}
			});
			setErrors(newErrors);
			return;
		}

		await onSubmit(formData);
	};

	const filteredSchedules = schedules.filter(
		(s) => s.branch_id === formData.branch_id && s.course_id === formData.course_id,
	);

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingStudent ? "Chỉnh sửa hồ sơ học viên" : "Thêm học viên mới"}
		>
			<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<AdminFormField label="Tên học viên" error={errors.name} required>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<div className="grid grid-cols-2 gap-4">
					<AdminFormField label="Tuổi" error={errors.age} required>
						<input
							type="number"
							name="age"
							value={formData.age || ""}
							onChange={handleChange}
							className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
						/>
					</AdminFormField>
					<AdminFormField label="Lớp" error={errors.grade} required>
						<input
							type="text"
							name="grade"
							value={formData.grade}
							onChange={handleChange}
							className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
						/>
					</AdminFormField>
				</div>

				<AdminFormField label="Tên phụ huynh" error={errors.parent_name} required>
					<input
						type="text"
						name="parent_name"
						value={formData.parent_name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<AdminFormField label="Số điện thoại" error={errors.phone} required>
					<input
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<AdminFormField label="Email" error={errors.email} required>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<AdminFormField label="Trạng thái" error={errors.status} required>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					>
						<option value="active">Đang học</option>
						<option value="inactive">Tạm dừng</option>
						<option value="graduated">Đã tốt nghiệp</option>
					</select>
				</AdminFormField>

				<AdminFormField label="Cơ sở" error={errors.branch_id} required>
					<select
						name="branch_id"
						value={formData.branch_id}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					>
						{branches.map((b) => (
							<option key={b.id} value={b.id}>
								{b.name}
							</option>
						))}
					</select>
				</AdminFormField>

				<AdminFormField label="Khóa học" error={errors.course_id} required>
					<select
						name="course_id"
						value={formData.course_id}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					>
						{courses.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
				</AdminFormField>

				<AdminFormField
					label="Lịch khai giảng (Lớp)"
					error={errors.schedule_id}
					className="col-span-1 md:col-span-2"
				>
					<select
						name="schedule_id"
						value={formData.schedule_id || ""}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					>
						<option value="">Chưa xếp lớp</option>
						{filteredSchedules.map((s) => (
							<option key={s.id} value={s.id}>
								{s.class_code} ({s.schedule})
							</option>
						))}
					</select>
				</AdminFormField>

				<div className="col-span-1 mt-4 flex gap-3 md:col-span-2">
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
						{isSubmitting ? "Đang lưu..." : "Lưu thông tin"}
					</button>
				</div>
			</form>
		</AdminModal>
	);
};
