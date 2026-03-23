"use client";

import React from "react";
import Image from "next/image";
import { Edit, Trash, ImageIcon, Link } from "lucide-react";
import { Banner } from "@/lib/types";
import { AdminTable } from "@/components/admin/AdminTable";

interface BannerListProps {
	banners: Banner[];
	isLoading: boolean;
	onEdit: (banner: Banner) => void;
	onDelete: (id: string) => void;
}

export const BannerList = ({ banners, isLoading, onEdit, onDelete }: BannerListProps) => {
	const columns = [
		{
			header: "Thứ tự",
			accessor: (banner: Banner) => (
				<span className="font-semibold text-slate-700">#{banner.display_order}</span>
			),
			className: "w-20 text-center",
			align: "center" as const,
		},
		{
			header: "Hình ảnh",
			accessor: (banner: Banner) => (
				<div className="relative h-14 w-32 overflow-hidden rounded-lg bg-slate-100">
					{banner.image_url ? (
						<Image
							src={banner.image_url}
							alt={banner.title || "Banner"}
							fill
							className="object-cover"
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center text-slate-300">
							<ImageIcon size={20} />
						</div>
					)}
				</div>
			),
			className: "w-40",
		},
		{
			header: "Tiêu đề",
			accessor: (banner: Banner) => (
				<span className="font-medium text-slate-900">
					{banner.title || <span className="italic text-slate-400">Không có tiêu đề</span>}
				</span>
			),
		},
		{
			header: "Đường dẫn",
			accessor: (banner: Banner) =>
				banner.link_url ? (
					<span className="flex items-center gap-1 text-xs text-slate-500">
						<Link size={12} />
						<span className="max-w-[200px] truncate">{banner.link_url}</span>
					</span>
				) : (
					<span className="text-xs italic text-slate-400">Không có</span>
				),
		},
		{
			header: "Trạng thái",
			accessor: (banner: Banner) => (
				<span
					className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
						banner.is_active
							? "bg-green-50 text-green-600"
							: "bg-slate-100 text-slate-500"
					}`}
				>
					{banner.is_active ? "Đang hiện" : "Ẩn"}
				</span>
			),
			className: "w-28",
			align: "center" as const,
		},
		{
			header: "Ngày tạo",
			accessor: (banner: Banner) =>
				banner.created_at
					? new Date(banner.created_at).toLocaleDateString("vi-VN", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
					  })
					: "—",
			className: "w-32 text-slate-500",
		},
	];

	return (
		<AdminTable
			columns={columns}
			data={banners}
			isLoading={isLoading}
			emptyMessage="Chưa có banner nào. Bấm 'Thêm banner' để bắt đầu."
			rowActions={(banner) => (
				<>
					<button
						onClick={() => onEdit(banner)}
						className="hover:text-stem-blue rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-blue-50"
					>
						<Edit size={16} />
					</button>
					<button
						onClick={() => onDelete(banner.id)}
						className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
					>
						<Trash size={16} />
					</button>
				</>
			)}
		/>
	);
};
