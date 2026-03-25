"use client";

import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ScheduleTable } from "@/components/admin/schedules/ScheduleTable";
import { ScheduleModal } from "@/components/admin/schedules/ScheduleModal";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { ClassSchedule, Branch, Course } from "@/lib/types";
import { toast } from "sonner";
import { Filter } from "lucide-react";
import { createSchedule, updateSchedule, deleteSchedule } from "./actions";

interface SchedulesClientProps {
	initialSchedules: ClassSchedule[];
	branches: Branch[];
	courses: Course[];
}

const ITEMS_PER_PAGE = 10;

export default function SchedulesClient({ initialSchedules, branches, courses }: SchedulesClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingSchedule, setEditingSchedule] = useState<ClassSchedule | null>(null);
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

	const handleOpenModal = (schedule?: ClassSchedule) => {
		setEditingSchedule(schedule || null);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa lịch khai giảng này?")) {
			try {
				await deleteSchedule(id);
				toast.success("Đã xóa lịch khai giảng");
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
				await updateSchedule(editingSchedule.id, data);
				toast.success("Đã cập nhật lịch khai giảng");
			} else {
				await createSchedule(data);
				toast.success("Đã thêm lịch khai giảng mới");
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error saving schedule:", error);
			toast.error("Lỗi khi lưu lịch khai giảng");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
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
				schedules={initialSchedules.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)}
				branches={branches}
				courses={courses}
				isLoading={false}
				onEdit={handleOpenModal}
				onDelete={handleDelete}
			/>

			<AdminPagination
				currentPage={currentPage}
				totalPages={Math.ceil(initialSchedules.length / ITEMS_PER_PAGE)}
			/>

			<ScheduleModal
				key={isModalOpen ? editingSchedule?.id || "new" : "closed"}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingSchedule={editingSchedule}
				branches={branches}
				courses={courses}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</>
	);
}
