"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ScheduleTable } from "@/components/admin/schedules/ScheduleTable";
import { ScheduleModal } from "@/components/admin/schedules/ScheduleModal";
import { useAdminStore } from "@/store/admin-store";
import { supabase } from "@/lib/supabase-client";
import { ClassSchedule } from "@/lib/types";
import { toast } from "sonner";
import { Filter } from "lucide-react";

export default function SchedulesPage() {
	const { schedules, branches, courses, isLoading, fetchSchedules, fetchBranches, fetchCourses } = useAdminStore();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingSchedule, setEditingSchedule] = useState<ClassSchedule | null>(null);

	useEffect(() => {
		fetchSchedules();
		fetchBranches();
		fetchCourses();
	}, [fetchSchedules, fetchBranches, fetchCourses]);

	const handleOpenModal = (schedule?: ClassSchedule) => {
		setEditingSchedule(schedule || null);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa lịch khai giảng này?")) {
			try {
				const { error } = await supabase.from("schedules").delete().eq("id", id);
				if (error) throw error;
				toast.success("Đã xóa lịch khai giảng");
				fetchSchedules();
			} catch (error) {
				console.error("Error deleting schedule:", error);
				toast.error("Lỗi khi xóa lịch khai giảng");
			}
		}
	};

	const handleSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingSchedule) {
				const { error } = await supabase.from("schedules").update(data).eq("id", editingSchedule.id);
				if (error) throw error;
				toast.success("Đã cập nhật lịch khai giảng");
			} else {
				const { error } = await supabase.from("schedules").insert([data]);
				if (error) throw error;
				toast.success("Đã thêm lịch khai giảng mới");
			}
			fetchSchedules();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error saving schedule:", error);
			toast.error("Lỗi khi lưu lịch khai giảng");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AdminLayout>
			<AdminPageHeader
				title="Lịch khai giảng"
				description="Quản lý các lớp học sắp khai giảng tại các cơ sở."
				actionLabel="Thêm lịch mới"
				onAction={() => handleOpenModal()}
			/>

			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
				<div className="flex items-center gap-2">
					<button className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
						<Filter size={16} className="mr-2" />
						Lọc
					</button>
					<select className="focus:border-stem-blue focus:ring-stem-blue rounded-xl border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-all">
						<option>Tất cả cơ sở</option>
						{branches.map((b) => (
							<option key={b.id} value={b.id}>
								{b.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<ScheduleTable
				schedules={schedules}
				branches={branches}
				courses={courses}
				isLoading={isLoading}
				onEdit={handleOpenModal}
				onDelete={handleDelete}
			/>

			<ScheduleModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingSchedule={editingSchedule}
				branches={branches}
				courses={courses}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</AdminLayout>
	);
}
