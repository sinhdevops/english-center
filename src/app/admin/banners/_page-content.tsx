"use client";

import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BannerList } from "@/components/admin/banners/BannerList";
import { BannerModal } from "@/components/admin/banners/BannerModal";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Banner } from "@/lib/types";
import { toast } from "sonner";
import { createBanner, updateBanner, deleteBanner } from "@/actions/banner.actions";

interface BannersClientProps {
	initialBanners: Banner[];
}

const ITEMS_PER_PAGE = 10;

export default function BannersClient({ initialBanners }: BannersClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

	const MAX_BANNERS = 10;
	const MAX_ACTIVE_BANNERS = 5;

	const handleOpenModal = (banner?: Banner) => {
		if (!banner && initialBanners.length >= MAX_BANNERS) {
			toast.error(`Đã đạt giới hạn ${MAX_BANNERS} banner. Vui lòng xóa bớt để tạo thêm.`);
			return;
		}
		setEditingBanner(banner || null);
		setIsModalOpen(true);
	};

	const handleSubmit = async (data: any) => {
		if (data.is_active) {
			const activeCount = initialBanners.filter(
				(b) => b.is_active && b.id !== editingBanner?.id
			).length;
			if (activeCount >= MAX_ACTIVE_BANNERS) {
				toast.error(`Chỉ được hiển thị tối đa ${MAX_ACTIVE_BANNERS} banner cùng lúc. Vui lòng ẩn bớt banner khác.`);
				return;
			}
		}

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

	const totalPages = Math.ceil(initialBanners.length / ITEMS_PER_PAGE);
	const paginatedBanners = initialBanners.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	return (
		<>
			<AdminPageHeader
				title="Quản lý Banner"
				description="Thêm và quản lý các banner hiển thị trên trang chủ."
				actionLabel="Thêm banner"
				onAction={() => handleOpenModal()}
			/>

			<BannerList
				banners={paginatedBanners}
				isLoading={false}
				onEdit={handleOpenModal}
				onDelete={handleDelete}
			/>

			<AdminPagination currentPage={currentPage} totalPages={totalPages} />

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
