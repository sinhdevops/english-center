"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProgramList } from "@/components/admin/programs/ProgramList";
import { ProgramModal } from "@/components/admin/programs/ProgramModal";
import { CourseModal } from "@/components/admin/programs/CourseModal";
import { useAdminStore } from "@/store/admin-store";
import { supabase } from "@/lib/supabase-client";
import { Program, Course } from "@/lib/types";
import { toast } from "sonner";

export default function ProgramsPage() {
	const { programs, courses, isLoading, fetchPrograms, fetchCourses } = useAdminStore();

	const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
	const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [editingProgram, setEditingProgram] = useState<Program | null>(null);
	const [editingCourse, setEditingCourse] = useState<Course | null>(null);
	const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

	useEffect(() => {
		fetchPrograms();
		fetchCourses();
	}, [fetchPrograms, fetchCourses]);

	// Program Handlers
	const handleOpenProgramModal = (program?: Program) => {
		setEditingProgram(program || null);
		setIsProgramModalOpen(true);
	};

	const handleProgramSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingProgram) {
				const { error } = await supabase.from("programs").update(data).eq("id", editingProgram.id);
				if (error) throw error;
				toast.success("Đã cập nhật chương trình");
			} else {
				const { error } = await supabase.from("programs").insert([data]);
				if (error) throw error;
				toast.success("Đã thêm chương trình mới");
			}
			fetchPrograms();
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
				const { error } = await supabase.from("programs").delete().eq("id", id);
				if (error) throw error;
				toast.success("Đã xóa chương trình");
				fetchPrograms();
				fetchCourses();
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
				const { error } = await supabase.from("courses").update(data).eq("id", editingCourse.id);
				if (error) throw error;
				toast.success("Đã cập nhật khóa học");
			} else {
				const { error } = await supabase.from("courses").insert([data]);
				if (error) throw error;
				toast.success("Đã thêm khóa học mới");
			}
			fetchCourses();
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
				const { error } = await supabase.from("courses").delete().eq("id", id);
				if (error) throw error;
				toast.success("Đã xóa khóa học");
				fetchCourses();
			} catch (error) {
				console.error("Error deleting course:", error);
				toast.error("Lỗi khi xóa khóa học");
			}
		}
	};

	return (
		<AdminLayout>
			<AdminPageHeader
				title="Chương trình học"
				description="Quản lý các chương trình đào tạo và lộ trình học tập."
				actionLabel="Thêm chương trình mới"
				onAction={() => handleOpenProgramModal()}
			/>

			<ProgramList
				programs={programs}
				courses={courses}
				isLoading={isLoading}
				onEditProgram={handleOpenProgramModal}
				onDeleteProgram={handleProgramDelete}
				onAddCourse={handleOpenCourseModal}
				onEditCourse={handleOpenCourseModal}
				onDeleteCourse={handleCourseDelete}
			/>

			<ProgramModal
				isOpen={isProgramModalOpen}
				onClose={() => setIsProgramModalOpen(false)}
				editingProgram={editingProgram}
				onSubmit={handleProgramSubmit}
				isSubmitting={isSubmitting}
			/>

			<CourseModal
				isOpen={isCourseModalOpen}
				onClose={() => setIsCourseModalOpen(false)}
				editingCourse={editingCourse}
				selectedProgramId={selectedProgramId}
				programs={programs}
				onSubmit={handleCourseSubmit}
				isSubmitting={isSubmitting}
			/>
		</AdminLayout>
	);
}
