import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ScheduleFormData>({
		resolver: zodResolver(scheduleSchema),
		defaultValues: {
			branch_id: branches[0]?.id || "",
			course_id: courses[0]?.id || "",
			class_code: "",
			schedule: "",
			start_date: "",
			status: "open",
		},
	});

	useEffect(() => {
		if (editingSchedule) {
			reset({
				branch_id: editingSchedule.branch_id,
				course_id: editingSchedule.course_id,
				class_code: editingSchedule.class_code,
				schedule: editingSchedule.schedule,
				start_date: editingSchedule.start_date,
				status: editingSchedule.status,
			});
		} else {
			reset({
				branch_id: branches[0]?.id || "",
				course_id: courses[0]?.id || "",
				class_code: "",
				schedule: "",
				start_date: "",
				status: "open",
			});
		}
	}, [editingSchedule, reset, branches, courses, isOpen]);

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingSchedule ? "Chỉnh sửa lịch khai giảng" : "Thêm lịch mới"}
		>
			<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
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

				<AdminFormField label="Mã lớp" error={errors.class_code?.message} required>
					<input
						type="text"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("class_code")}
					/>
				</AdminFormField>

				<AdminFormField label="Ngày khai giảng" error={errors.start_date?.message} required>
					<input
						type="date"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("start_date")}
					/>
				</AdminFormField>

				<AdminFormField
					label="Lịch học chi tiết"
					error={errors.schedule?.message}
					required
					className="col-span-2"
				>
					<input
						type="text"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						placeholder="Ví dụ: MsHoa Junior - Ca (16h30 - 18h00 Thứ 7, CN)"
						{...register("schedule")}
					/>
				</AdminFormField>

				<AdminFormField label="Trạng thái" error={errors.status?.message} required className="col-span-2">
					<select
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("status")}
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
						className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50"
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
