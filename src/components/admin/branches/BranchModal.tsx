import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<BranchFormData>({
		resolver: zodResolver(branchSchema) as any,
		defaultValues: {
			name: "",
			address: "",
		},
	});

	useEffect(() => {
		if (editingBranch) {
			reset({
				name: editingBranch.name,
				address: editingBranch.address,
			});
		} else {
			reset({
				name: "",
				address: "",
			});
		}
	}, [editingBranch, reset, isOpen]);

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingBranch ? "Chỉnh sửa cơ sở" : "Thêm cơ sở mới"}
			maxWidth="max-w-md"
		>
			<form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">
				<AdminFormField label="Tên cơ sở" error={errors.name?.message} required>
					<input
						type="text"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("name")}
					/>
				</AdminFormField>

				<AdminFormField label="Địa chỉ" error={errors.address?.message} required>
					<input
						type="text"
						className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
						{...register("address")}
					/>
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
