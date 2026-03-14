"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BranchList } from "@/components/admin/branches/BranchList";
import { BranchModal } from "@/components/admin/branches/BranchModal";
import { Branch } from "@/lib/types";
import { toast } from "sonner";
import { createBranch, updateBranch, deleteBranch } from "./actions";

interface BranchesClientProps {
	initialBranches: Branch[];
}

export default function BranchesClient({ initialBranches }: BranchesClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

	const handleOpenModal = (branch?: Branch) => {
		setEditingBranch(branch || null);
		setIsModalOpen(true);
	};

	const handleSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingBranch) {
				await updateBranch(editingBranch.id, data);
				toast.success("Đã cập nhật thông tin cơ sở");
			} else {
				await createBranch(data);
				toast.success("Đã thêm cơ sở mới");
			}
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
				await deleteBranch(id);
				toast.success("Đã xóa cơ sở");
			} catch (error) {
				console.error("Error deleting branch:", error);
				toast.error("Lỗi khi xóa cơ sở");
			}
		}
	};

	return (
		<>
			<AdminPageHeader
				title="Hệ thống cơ sở"
				description="Quản lý thông tin liên hệ và địa chỉ các chi nhánh Bee English."
				actionLabel="Thêm cơ sở mới"
				onAction={() => handleOpenModal()}
			/>

			<BranchList branches={initialBranches} isLoading={false} onEdit={handleOpenModal} onDelete={handleDelete} />

			<BranchModal
				key={isModalOpen ? editingBranch?.id || "new" : "closed"}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingBranch={editingBranch}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</>
	);
}
