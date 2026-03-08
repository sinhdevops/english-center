import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<StudentFormData>({
		resolver: zodResolver(studentSchema) as any,
		defaultValues: {
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
		},
	});

	const selectedBranchId = useWatch({ control, name: "branch_id" });
	const selectedCourseId = useWatch({ control, name: "course_id" });

	useEffect(() => {
		if (editingStudent) {
			reset({
				name: editingStudent.name,
				age: editingStudent.age,
				grade: editingStudent.grade,
				parent_name: editingStudent.parent_name,
				phone: editingStudent.phone,
				email: editingStudent.email,
				branch_id: editingStudent.branch_id,
				course_id: editingStudent.course_id,
				schedule_id: editingStudent.schedule_id || null,
				status: editingStudent.status,
			});
		} else {
			reset({
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
			});
		}
	}, [editingStudent, reset, branches, courses, isOpen]);

	const filteredSchedules = schedules.filter(
		(s) => s.branch_id === selectedBranchId && s.course_id === selectedCourseId,
	);

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingStudent ? "Chỉnh sửa hồ sơ học viên" : "Thêm học viên mới"}
		>
			<form onSubmit={handleSubmit(onSubmit as any)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<AdminFormField label="Tên học viên" error={errors.name?.message} required>
					<input
						type="text"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("name")}
					/>
				</AdminFormField>

				<div className="grid grid-cols-2 gap-4">
					<AdminFormField label="Tuổi" error={errors.age?.message} required>
						<input
							type="number"
							className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
							{...register("age", { valueAsNumber: true })}
						/>
					</AdminFormField>
					<AdminFormField label="Lớp" error={errors.grade?.message} required>
						<input
							type="text"
							className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
							{...register("grade")}
						/>
					</AdminFormField>
				</div>

				<AdminFormField label="Tên phụ huynh" error={errors.parent_name?.message} required>
					<input
						type="text"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("parent_name")}
					/>
				</AdminFormField>

				<AdminFormField label="Số điện thoại" error={errors.phone?.message} required>
					<input
						type="tel"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("phone")}
					/>
				</AdminFormField>

				<AdminFormField label="Email" error={errors.email?.message} required>
					<input
						type="email"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("email")}
					/>
				</AdminFormField>

				<AdminFormField label="Trạng thái" error={errors.status?.message} required>
					<select
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("status")}
					>
						<option value="active">Đang học</option>
						<option value="inactive">Tạm dừng</option>
						<option value="graduated">Đã tốt nghiệp</option>
					</select>
				</AdminFormField>

				<AdminFormField label="Cơ sở" error={errors.branch_id?.message} required>
					<select
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("branch_id")}
					>
						{branches.map((b) => (
							<option key={b.id} value={b.id}>
								{b.name}
							</option>
						))}
					</select>
				</AdminFormField>

				<AdminFormField label="Khóa học" error={errors.course_id?.message} required>
					<select
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("course_id")}
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
					error={errors.schedule_id?.message}
					className="col-span-1 md:col-span-2"
				>
					<select
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("schedule_id")}
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
						className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50"
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
