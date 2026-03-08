"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StudentTable } from "@/components/admin/students/StudentTable";
import { StudentModal } from "@/components/admin/students/StudentModal";
import { useAdminStore } from "@/store/admin-store";
import { supabase } from "@/lib/supabase-client";
import { Student } from "@/lib/types";
import { toast } from "sonner";
import { Filter, Search } from "lucide-react";

export default function StudentsPage() {
	const {
		students,
		branches,
		courses,
		schedules,
		isLoading,
		fetchStudents,
		fetchBranches,
		fetchCourses,
		fetchSchedules,
	} = useAdminStore();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingStudent, setEditingStudent] = useState<Student | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		fetchStudents();
		fetchBranches();
		fetchCourses();
		fetchSchedules();
	}, [fetchStudents, fetchBranches, fetchCourses, fetchSchedules]);

	const handleOpenModal = (student?: Student) => {
		setEditingStudent(student || null);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa học viên này?")) {
			try {
				const { error } = await supabase.from("students").delete().eq("id", id);
				if (error) throw error;
				toast.success("Đã xóa học viên");
				fetchStudents();
			} catch (error) {
				console.error("Error deleting student:", error);
				toast.error("Lỗi khi xóa học viên");
			}
		}
	};

	const handleSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			// Ensure schedule_id is null if empty string
			const submissionData = {
				...data,
				schedule_id: data.schedule_id || null,
			};

			if (editingStudent) {
				const { error } = await supabase.from("students").update(submissionData).eq("id", editingStudent.id);
				if (error) throw error;
				toast.success("Đã cập nhật thông tin học viên");
			} else {
				const { error } = await supabase.from("students").insert([submissionData]);
				if (error) throw error;
				toast.success("Đã thêm học viên mới");
			}
			fetchStudents();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error saving student:", error);
			toast.error("Lỗi khi lưu thông tin học viên");
		} finally {
			setIsSubmitting(false);
		}
	};

	const filteredStudents = students.filter(
		(s) =>
			s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			s.phone.includes(searchQuery) ||
			s.email.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<AdminLayout>
			<AdminPageHeader
				title="Quản lý học viên"
				description="Xem và quản lý hồ sơ học viên, thông tin liên lạc và lộ trình học."
				actionLabel="Thêm học viên mới"
				onAction={() => handleOpenModal()}
			/>

			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="relative w-full max-w-md">
					<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
					<input
						type="text"
						placeholder="Tìm kiếm học viên..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="focus:border-stem-blue focus:ring-stem-blue w-full rounded-xl border-slate-200 bg-white py-2 pr-4 pl-10 text-sm transition-all"
					/>
				</div>
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

			<StudentTable
				students={filteredStudents}
				branches={branches}
				courses={courses}
				isLoading={isLoading}
				onEdit={handleOpenModal}
				onDelete={handleDelete}
			/>

			<StudentModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingStudent={editingStudent}
				branches={branches}
				courses={courses}
				schedules={schedules}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</AdminLayout>
	);
}
