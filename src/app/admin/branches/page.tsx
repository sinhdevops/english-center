"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BranchList } from "@/components/admin/branches/BranchList";
import { BranchModal } from "@/components/admin/branches/BranchModal";
import { useAdminStore } from "@/store/admin-store";
import { supabase } from "@/lib/supabase-client";
import { Branch } from "@/lib/types";
import { toast } from "sonner";

export default function BranchesPage() {
	const { branches, isLoading, fetchBranches } = useAdminStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

	useEffect(() => {
		fetchBranches();
	}, [fetchBranches]);

	const handleOpenModal = (branch?: Branch) => {
		setEditingBranch(branch || null);
		setIsModalOpen(true);
	};

	const handleSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingBranch) {
				const { error } = await supabase.from("branches").update(data).eq("id", editingBranch.id);
				if (error) throw error;
				toast.success("Đã cập nhật thông tin cơ sở");
			} else {
				const { error } = await supabase.from("branches").insert([data]);
				if (error) throw error;
				toast.success("Đã thêm cơ sở mới");
			}
			fetchBranches();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error saving branch:", error);
			toast.error("Lỗi khi lưu thông tin cơ sở");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa cơ sở này?")) {
			try {
				const { error } = await supabase.from("branches").delete().eq("id", id);
				if (error) throw error;
				toast.success("Đã xóa cơ sở");
				fetchBranches();
			} catch (error) {
				console.error("Error deleting branch:", error);
				toast.error("Lỗi khi xóa cơ sở");
			}
		}
	};

	return (
		<AdminLayout>
			<AdminPageHeader
				title="Hệ thống cơ sở"
				description="Quản lý thông tin liên hệ và địa chỉ các chi nhánh Bee English."
				actionLabel="Thêm cơ sở mới"
				onAction={() => handleOpenModal()}
			/>

			<BranchList branches={branches} isLoading={isLoading} onEdit={handleOpenModal} onDelete={handleDelete} />

			<BranchModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingBranch={editingBranch}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</AdminLayout>
	);
}
