"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BannerList } from "@/components/admin/banners/BannerList";
import { BannerModal } from "@/components/admin/banners/BannerModal";
import { Banner } from "@/lib/types";
import { toast } from "sonner";
import { createBanner, updateBanner, deleteBanner } from "./actions";

interface BannersClientProps {
	initialBanners: Banner[];
}

export default function BannersClient({ initialBanners }: BannersClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

	const handleOpenModal = (banner?: Banner) => {
		setEditingBanner(banner || null);
		setIsModalOpen(true);
	};

	const handleSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingBanner) {
				await updateBanner(editingBanner.id, data);
				toast.success("Đã cập nhật banner");
			} else {
				await createBanner(data);
				toast.success("Đã thêm banner mới");
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error saving banner:", error);
			toast.error("Lỗi khi lưu banner");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa banner này?")) {
			try {
				await deleteBanner(id);
				toast.success("Đã xóa banner");
			} catch (error) {
				console.error("Error deleting banner:", error);
				toast.error("Lỗi khi xóa banner");
			}
		}
	};

	return (
		<>
			<AdminPageHeader
				title="Quản lý Banner"
				description="Thêm và quản lý các banner hiển thị trên trang chủ."
				actionLabel="Thêm banner"
				onAction={() => handleOpenModal()}
			/>

			<BannerList
				banners={initialBanners}
				isLoading={false}
				onEdit={handleOpenModal}
				onDelete={handleDelete}
			/>

			<BannerModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingBanner={editingBanner}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</>
	);
}
