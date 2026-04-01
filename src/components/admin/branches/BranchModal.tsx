import React, { useState } from "react";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { branchSchema } from "@/lib/validations/admin";
import { Branch } from "@/lib/types";
import * as z from "zod";

type BranchFormData = z.infer<typeof branchSchema>;

interface BranchModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingBranch: Branch | null;
	onSubmit: (data: BranchFormData) => Promise<void>;
	isSubmitting: boolean;
}

export const BranchModal = ({ isOpen, onClose, editingBranch, onSubmit, isSubmitting }: BranchModalProps) => {
	const [formData, setFormData] = useState<BranchFormData>(() => {
		if (editingBranch) {
			return {
				name: editingBranch.name,
				address: editingBranch.address,
			};
		}
		return {
			name: "",
			address: "",
		};
	});
	const [errors, setErrors] = useState<Partial<Record<keyof BranchFormData, string>>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name as keyof BranchFormData]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = branchSchema.safeParse(formData);

		if (!result.success) {
			const newErrors: Partial<Record<keyof BranchFormData, string>> = {};
			result.error.issues.forEach((issue) => {
				const path = issue.path[0] as string;
				if (path) {
					newErrors[path as keyof BranchFormData] = issue.message;
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
			title={editingBranch ? "Chỉnh sửa cơ sở" : "Thêm cơ sở mới"}
			maxWidth="max-w-md"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				<AdminFormField label="Tên cơ sở" error={errors.name} required>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<AdminFormField label="Địa chỉ" error={errors.address} required>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						className="mt-1 block w-full rounded-xl border-slate-200  px-4 py-2.5 text-sm"
					/>
				</AdminFormField>

				<div className="mt-8 flex gap-3 border-t border-slate-100 pt-4">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition-colors hover:"
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
