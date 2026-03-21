import React, { useState } from "react";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { programSchema } from "@/lib/validations/admin";
import { Program } from "@/lib/types";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import * as z from "zod";

type ProgramFormData = z.infer<typeof programSchema>;

interface ProgramModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingProgram: Program | null;
	onSubmit: (data: ProgramFormData) => Promise<void>;
	isSubmitting: boolean;
}

export const ProgramModal = ({ isOpen, onClose, editingProgram, onSubmit, isSubmitting }: ProgramModalProps) => {
	const [formData, setFormData] = useState<ProgramFormData>(() => {
		if (editingProgram) {
			return {
				name: editingProgram.name,
				description: editingProgram.description || "",
				image_url: editingProgram.image_url || "",
			};
		}
		return {
			name: "",
			description: "",
			image_url: "",
		};
	});
	const [errors, setErrors] = useState<Partial<Record<keyof ProgramFormData, string>>>({});
	const [isUploadingImage, setIsUploadingImage] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name as keyof ProgramFormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				setIsUploadingImage(true);
				try {
					const response = await fetch("/api/upload", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ image: reader.result as string, folder: "programs" }),
					});
					const data = await response.json();
					if (data.url) {
						setFormData((prev) => ({ ...prev, image_url: data.url }));
						if (errors.image_url) {
							setErrors((prev) => ({ ...prev, image_url: undefined }));
						}
					}
				} catch (error) {
					console.error("Upload error:", error);
				} finally {
					setIsUploadingImage(false);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = programSchema.safeParse(formData);

		if (!result.success) {
			const newErrors: Partial<Record<keyof ProgramFormData, string>> = {};
			result.error.issues.forEach((issue) => {
				const path = issue.path[0] as string;
				if (path) {
					newErrors[path as keyof ProgramFormData] = issue.message;
				}
			});
			setErrors(newErrors);
			return;
		}

		await onSubmit(formData);
	};

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingProgram ? "Chỉnh sửa chương trình" : "Thêm chương trình mới"}
			maxWidth="max-w-md"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				<AdminFormField label="Tên chương trình" error={errors.name} required>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<AdminFormField label="Mô tả ngắn" error={errors.description}>
					<textarea
						name="description"
						value={formData.description || ""}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						rows={3}
					/>
				</AdminFormField>

				<AdminFormField label="Ảnh đại diện" error={errors.image_url}>
					<div className="mt-2 flex items-center gap-4">
						<div className="hover:border-stem-blue relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-blue-50/30">
							{isUploadingImage ? (
								<div className="flex flex-col items-center gap-1">
									<Loader2 size={20} className="text-stem-blue animate-spin" />
									<span className="text-[10px] font-bold tracking-wider uppercase">Đang tải...</span>
								</div>
							) : formData.image_url ? (
								<>
									<Image src={formData.image_url} alt="Preview" fill className="object-cover" />
									<button
										type="button"
										onClick={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
										className="absolute top-1 right-1 rounded-full bg-rose-500 p-1 text-white shadow-lg hover:bg-rose-600"
									>
										<X size={12} />
									</button>
								</>
							) : (
								<div className="flex flex-col items-center gap-1">
									<Upload size={20} />
									<span className="text-[10px] font-bold tracking-wider uppercase">Tải lên</span>
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
						<div className="flex-1">
							<p className="text-xs text-slate-500">Tải lên ảnh hoặc dán URL ảnh bên dưới.</p>
							<input
								type="text"
								name="image_url"
								value={formData.image_url || ""}
								onChange={handleChange}
								placeholder="URL ảnh"
								className="mt-2 block w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-1.5 text-xs"
							/>
						</div>
					</div>
				</AdminFormField>

				<div className="mt-8 flex gap-3 border-t border-slate-100 pt-4">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50"
					>
						Hủy
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-stem-blue hover:bg-opacity-90 flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
					>
						{isSubmitting ? "Đang lưu..." : "Lưu"}
					</button>
				</div>
			</form>
		</AdminModal>
	);
};
