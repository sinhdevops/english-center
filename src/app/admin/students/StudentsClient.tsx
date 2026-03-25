"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StudentTable } from "@/components/admin/students/StudentTable";
import { StudentModal } from "@/components/admin/students/StudentModal";
import { Student, Branch, Course, ClassSchedule } from "@/lib/types";
import { toast } from "sonner";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Filter, Search } from "lucide-react";
import { createStudent, updateStudent, deleteStudent } from "./actions";

interface StudentsClientProps {
	initialStudents: Student[];
	branches: Branch[];
	courses: Course[];
	schedules: ClassSchedule[];
}

const ITEMS_PER_PAGE = 10;

export default function StudentsClient({ initialStudents, branches, courses, schedules }: StudentsClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingStudent, setEditingStudent] = useState<Student | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const router = useRouter();
	const pathname = usePathname();

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		const params = new URLSearchParams(searchParams.toString());
		params.delete("page");
		router.replace(`${pathname}?${params.toString()}`);
	};

	const handleOpenModal = (student?: Student) => {
		setEditingStudent(student || null);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa học viên này?")) {
			try {
				await deleteStudent(id);
				toast.success("Đã xóa học viên");
			} catch (error) {
				console.error("Error deleting student:", error);
				toast.error("Lỗi khi xóa học viên");
			}
		}
	};

	const handleSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			const submissionData = {
				...data,
				schedule_id: data.schedule_id || null,
			};

			if (editingStudent) {
				await updateStudent(editingStudent.id, submissionData);
				toast.success("Đã cập nhật thông tin học viên");
			} else {
				await createStudent(submissionData);
				toast.success("Đã thêm học viên mới");
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error saving student:", error);
			toast.error("Lỗi khi lưu thông tin học viên");
		} finally {
			setIsSubmitting(false);
		}
	};

	const filteredStudents = initialStudents.filter(
		(s) =>
			s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			s.phone.includes(searchQuery) ||
			s.email.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
	const paginatedStudents = filteredStudents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	return (
		<>
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
						onChange={(e) => handleSearchChange(e.target.value)}
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
				students={paginatedStudents}
				branches={branches}
				courses={courses}
				isLoading={false}
				onEdit={handleOpenModal}
				onDelete={handleDelete}
			/>

			<AdminPagination currentPage={currentPage} totalPages={totalPages} />

			<StudentModal
				key={isModalOpen ? `student-${editingStudent?.id || "new"}` : "student-closed"}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingStudent={editingStudent}
				branches={branches}
				courses={courses}
				schedules={schedules}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</>
	);
}
