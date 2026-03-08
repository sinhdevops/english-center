import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { programSchema } from "@/lib/validations/admin";
import { Program } from "@/lib/types";
import { Upload, X } from "lucide-react";
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
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		control,
		formState: { errors },
	} = useForm<ProgramFormData>({
		resolver: zodResolver(programSchema) as any,
		defaultValues: {
			name: "",
			description: "",
			image_url: "",
		},
	});

	const imageUrl = useWatch({ control, name: "image_url" });

	useEffect(() => {
		if (editingProgram) {
			reset({
				name: editingProgram.name,
				description: editingProgram.description || "",
				image_url: editingProgram.image_url || "",
			});
		} else {
			reset({
				name: "",
				description: "",
				image_url: "",
			});
		}
	}, [editingProgram, reset, isOpen]);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				try {
					const response = await fetch("/api/upload", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ image: reader.result as string, folder: "programs" }),
					});
					const data = await response.json();
					if (data.url) setValue("image_url", data.url);
				} catch (error) {
					console.error("Upload error:", error);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingProgram ? "Chỉnh sửa chương trình" : "Thêm chương trình mới"}
			maxWidth="max-w-md"
		>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<AdminFormField label="Tên chương trình" error={errors.name?.message} required>
					<input
						type="text"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("name")}
					/>
				</AdminFormField>

				<AdminFormField label="Mô tả ngắn" error={errors.description?.message}>
					<textarea
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						rows={3}
						{...register("description")}
					/>
				</AdminFormField>

				<AdminFormField label="Ảnh đại diện" error={errors.image_url?.message}>
					<div className="mt-2 flex items-center gap-4">
						<div className="hover:border-stem-blue relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-blue-50/30">
							{imageUrl ? (
								<>
									<Image src={imageUrl} alt="Preview" fill className="object-cover" />
									<button
										type="button"
										onClick={() => setValue("image_url", "")}
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
							/>
						</div>
						<div className="flex-1">
							<p className="text-xs text-slate-500">Tải lên ảnh hoặc dán URL ảnh bên dưới.</p>
							<input
								type="text"
								placeholder="URL ảnh"
								className="mt-2 block w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-1.5 text-xs"
								{...register("image_url")}
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
