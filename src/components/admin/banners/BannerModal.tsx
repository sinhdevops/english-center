"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { Banner } from "@/lib/types";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface BannerFormData {
	title: string;
	image_url: string;
	link_url: string;
	is_active: boolean;
	display_order: number;
}

interface BannerModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingBanner: Banner | null;
	onSubmit: (data: BannerFormData) => Promise<void>;
	isSubmitting: boolean;
}

export const BannerModal = ({ isOpen, onClose, editingBanner, onSubmit, isSubmitting }: BannerModalProps) => {
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string>("");

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm<BannerFormData>({
		defaultValues: {
			title: "",
			image_url: "",
			link_url: "",
			is_active: true,
			display_order: 0,
		},
	});

	const imageUrl = watch("image_url");

	useEffect(() => {
		if (editingBanner) {
			reset({
				title: editingBanner.title || "",
				image_url: editingBanner.image_url || "",
				link_url: editingBanner.link_url || "",
				is_active: editingBanner.is_active,
				display_order: editingBanner.display_order,
			});
			setPreviewUrl(editingBanner.image_url || "");
		} else {
			reset({
				title: "",
				image_url: "",
				link_url: "",
				is_active: true,
				display_order: 0,
			});
			setPreviewUrl("");
		}
	}, [editingBanner, reset, isOpen]);

	useEffect(() => {
		setPreviewUrl(imageUrl || "");
	}, [imageUrl]);

	const uploadImage = async (base64: string) => {
		const response = await fetch("/api/upload", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ image: base64, folder: "banners" }),
		});
		const data = await response.json();
		if (data.error) throw new Error(data.error);
		return data.url as string;
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = async () => {
			setIsUploadingImage(true);
			try {
				const url = await uploadImage(reader.result as string);
				setValue("image_url", url);
			} catch {
				// silently fail — user will see empty preview
			} finally {
				setIsUploadingImage(false);
			}
		};
		reader.readAsDataURL(file);
	};

	const handleRemoveImage = () => {
		setValue("image_url", "");
		setPreviewUrl("");
	};

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingBanner ? "Chỉnh sửa banner" : "Thêm banner mới"}
			maxWidth="max-w-2xl"
		>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				{/* Image upload */}
				<AdminFormField label="Hình ảnh banner" required>
					<div className="mt-2">
						<div className="hover:border-stem-blue relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-blue-50/30">
							{isUploadingImage ? (
								<div className="flex flex-col items-center gap-2">
									<Loader2 size={32} className="text-stem-blue animate-spin" />
									<span className="text-xs font-bold text-slate-500">Đang tải ảnh lên...</span>
								</div>
							) : previewUrl ? (
								<>
									<Image src={previewUrl} alt="Banner preview" fill className="object-cover" />
									<button
										type="button"
										onClick={handleRemoveImage}
										className="absolute top-3 right-3 rounded-full bg-rose-500 p-2 text-white shadow-xl shadow-rose-200 transition-colors hover:bg-rose-600"
									>
										<X size={16} />
									</button>
								</>
							) : (
								<div className="flex flex-col items-center gap-2">
									<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
										<Upload size={24} className="text-stem-blue" />
									</div>
									<span className="text-xs font-black tracking-widest uppercase">
										Bấm để tải ảnh lên
									</span>
									<span className="text-[10px] text-slate-400">PNG, JPG, WebP — tỉ lệ 16:9 khuyến nghị</span>
								</div>
							)}
							<input
								type="file"
								accept="image/*"
								className="absolute inset-0 cursor-pointer opacity-0"
								onChange={handleImageUpload}
								disabled={isUploadingImage}
							/>
						</div>
					</div>
					<input type="hidden" {...register("image_url", { required: "Vui lòng tải lên hình ảnh" })} />
					{errors.image_url && (
						<p className="mt-1 text-xs text-rose-500">{errors.image_url.message}</p>
					)}
				</AdminFormField>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<AdminFormField label="Tiêu đề banner">
						<input
							type="text"
							placeholder="VD: Khai giảng hè 2025"
							className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-blue-400 focus:outline-none"
							{...register("title")}
						/>
					</AdminFormField>

					<AdminFormField label="Thứ tự hiển thị">
						<input
							type="number"
							min={0}
							className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-blue-400 focus:outline-none"
							{...register("display_order", { valueAsNumber: true })}
						/>
					</AdminFormField>
				</div>

				<AdminFormField label="Đường dẫn khi click (tùy chọn)">
					<input
						type="text"
						placeholder="VD: /chuong-trinh hoặc https://..."
						className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-blue-400 focus:outline-none"
						{...register("link_url")}
					/>
				</AdminFormField>

				<AdminFormField label="Trạng thái">
					<label className="mt-2 flex cursor-pointer items-center gap-3">
						<input
							type="checkbox"
							className="h-4 w-4 rounded accent-blue-500"
							{...register("is_active")}
						/>
						<span className="text-sm text-slate-700">Hiển thị banner này</span>
					</label>
				</AdminFormField>

				<div className="flex gap-3 border-t border-slate-100 pt-4">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50"
					>
						Hủy
					</button>
					<button
						type="submit"
						disabled={isSubmitting || isUploadingImage}
						className="bg-stem-blue hover:bg-opacity-90 flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
					>
						{isSubmitting ? "Đang lưu..." : editingBanner ? "Cập nhật" : "Thêm banner"}
					</button>
				</div>
			</form>
		</AdminModal>
	);
};
