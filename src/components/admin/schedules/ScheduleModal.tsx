import React, { useState } from "react";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { scheduleSchema } from "@/lib/validations/admin";
import { Branch, Course, ClassSchedule } from "@/lib/types";
import * as z from "zod";

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingSchedule: ClassSchedule | null;
	branches: Branch[];
	courses: Course[];
	onSubmit: (data: ScheduleFormData) => Promise<void>;
	isSubmitting: boolean;
}

export const ScheduleModal = ({
	isOpen,
	onClose,
	editingSchedule,
	branches,
	courses,
	onSubmit,
	isSubmitting,
}: ScheduleModalProps) => {
	const [formData, setFormData] = useState<ScheduleFormData>(() => {
		if (editingSchedule) {
			return {
				branch_id: editingSchedule.branch_id,
				course_id: editingSchedule.course_id,
				class_code: editingSchedule.class_code,
				schedule: editingSchedule.schedule,
				start_date: editingSchedule.start_date,
				status: editingSchedule.status as any,
			};
		}
		return {
			branch_id: branches[0]?.id || "",
			course_id: courses[0]?.id || "",
			class_code: "",
			schedule: "",
			start_date: "",
			status: "open",
		};
	});
	const [errors, setErrors] = useState<Partial<Record<keyof ScheduleFormData, string>>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name as keyof ScheduleFormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = scheduleSchema.safeParse(formData);

		if (!result.success) {
			const newErrors: Partial<Record<keyof ScheduleFormData, string>> = {};
			result.error.issues.forEach((issue) => {
				const path = issue.path[0] as string;
				if (path) {
					newErrors[path as keyof ScheduleFormData] = issue.message;
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
			title={editingSchedule ? "Chỉnh sửa lịch khai giảng" : "Thêm lịch mới"}
		>
			<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
				<AdminFormField label="Cơ sở" error={errors.branch_id} required>
					<select
						name="branch_id"
						value={formData.branch_id}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
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
						className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
					>
						{courses.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
				</AdminFormField>

				<AdminFormField label="Mã lớp" error={errors.class_code} required>
					<input
						type="text"
						name="class_code"
						value={formData.class_code}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<AdminFormField label="Ngày khai giảng" error={errors.start_date} required>
					<input
						type="date"
						name="start_date"
						value={formData.start_date}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<AdminFormField label="Lịch học chi tiết" error={errors.schedule} required className="col-span-2">
					<input
						type="text"
						name="schedule"
						value={formData.schedule}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
						placeholder="Ví dụ: MsHoa Junior - Ca (16h30 - 18h00 Thứ 7, CN)"
					/>
				</AdminFormField>

				<AdminFormField label="Trạng thái" error={errors.status} required className="col-span-2">
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
					>
						<option value="open">Đang mở</option>
						<option value="full">Đã đầy</option>
						<option value="closed">Đã đóng</option>
					</select>
				</AdminFormField>

				<div className="col-span-2 mt-4 flex gap-3">
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
