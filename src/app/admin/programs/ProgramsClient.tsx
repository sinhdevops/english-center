"use client";

import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProgramList } from "@/components/admin/programs/ProgramList";
import { ProgramModal } from "@/components/admin/programs/ProgramModal";
import { CourseModal } from "@/components/admin/programs/CourseModal";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Program, Course } from "@/lib/types";
import { toast } from "sonner";
import { createProgram, updateProgram, deleteProgram, createCourse, updateCourse, deleteCourse } from "./actions";

interface ProgramsClientProps {
	initialPrograms: Program[];
	initialCourses: Course[];
}

const ITEMS_PER_PAGE = 10;

export default function ProgramsClient({ initialPrograms, initialCourses }: ProgramsClientProps) {
	const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
	const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

	const [editingProgram, setEditingProgram] = useState<Program | null>(null);
	const [editingCourse, setEditingCourse] = useState<Course | null>(null);
	const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

	// Program Handlers
	const handleOpenProgramModal = (program?: Program) => {
		setEditingProgram(program || null);
		setIsProgramModalOpen(true);
	};

	const handleProgramSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingProgram) {
				await updateProgram(editingProgram.id, data);
				toast.success("Đã cập nhật chương trình");
			} else {
				await createProgram(data);
				toast.success("Đã thêm chương trình mới");
			}
			setIsProgramModalOpen(false);
		} catch (error) {
			console.error("Error saving program:", error);
			toast.error("Lỗi khi lưu chương trình");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleProgramDelete = async (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		if (confirm("Bạn có chắc chắn muốn xóa chương trình này và tất cả khóa học bên trong?")) {
			try {
				await deleteProgram(id);
				toast.success("Đã xóa chương trình");
			} catch (error) {
				console.error("Error deleting program:", error);
				toast.error("Lỗi khi xóa chương trình");
			}
		}
	};

	// Course Handlers
	const handleOpenCourseModal = (programId: string, course?: Course) => {
		setSelectedProgramId(programId);
		setEditingCourse(course || null);
		setIsCourseModalOpen(true);
	};

	const handleCourseSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingCourse) {
				await updateCourse(editingCourse.id, data);
				toast.success("Đã cập nhật khóa học");
			} else {
				await createCourse(data);
				toast.success("Đã thêm khóa học mới");
			}
			setIsCourseModalOpen(false);
		} catch (error) {
			console.error("Error saving course:", error);
			toast.error("Lỗi khi lưu khóa học");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCourseDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
			try {
				await deleteCourse(id);
				toast.success("Đã xóa khóa học");
			} catch (error) {
				console.error("Error deleting course:", error);
				toast.error("Lỗi khi xóa khóa học");
			}
		}
	};

	const totalPages = Math.ceil(initialPrograms.length / ITEMS_PER_PAGE);
	const paginatedPrograms = initialPrograms.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	return (
		<>
			<AdminPageHeader
				title="Chương trình học"
				description="Quản lý các chương trình đào tạo và lộ trình học tập."
				actionLabel="Thêm chương trình mới"
				onAction={() => handleOpenProgramModal()}
			/>

			<ProgramList
				programs={paginatedPrograms}
				courses={initialCourses}
				isLoading={false}
				onEditProgram={handleOpenProgramModal}
				onDeleteProgram={handleProgramDelete}
				onAddCourse={handleOpenCourseModal}
				onEditCourse={handleOpenCourseModal}
				onDeleteCourse={handleCourseDelete}
			/>

			<AdminPagination currentPage={currentPage} totalPages={totalPages} />

			<ProgramModal
				key={isProgramModalOpen ? `program-${editingProgram?.id || "new"}` : "program-closed"}
				isOpen={isProgramModalOpen}
				onClose={() => setIsProgramModalOpen(false)}
				editingProgram={editingProgram}
				onSubmit={handleProgramSubmit}
				isSubmitting={isSubmitting}
			/>

			<CourseModal
				key={isCourseModalOpen ? `course-${editingCourse?.id || "new"}` : "course-closed"}
				isOpen={isCourseModalOpen}
				onClose={() => setIsCourseModalOpen(false)}
				editingCourse={editingCourse}
				selectedProgramId={selectedProgramId}
				programs={initialPrograms}
				onSubmit={handleCourseSubmit}
				isSubmitting={isSubmitting}
			/>
		</>
	);
}
