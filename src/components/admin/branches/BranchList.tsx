import React from "react";
import { MapPin, Phone, Mail, Clock, Edit2, Trash2 } from "lucide-react";
import { Branch } from "@/lib/types";

interface BranchListProps {
	branches: Branch[];
	isLoading: boolean;
	onEdit: (branch: Branch) => void;
	onDelete: (id: string) => void;
}

export const BranchList = ({ branches, isLoading, onEdit, onDelete }: BranchListProps) => {
	if (isLoading) {
		return (
			<div className="col-span-full flex h-64 items-center justify-center">
				<div className="border-stem-blue h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
			</div>
		);
	}

	if (branches.length === 0) {
		return (
			<div className="col-span-full flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
				<p className="font-medium">Chưa có cơ sở nào</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{branches.map((branch) => (
				<div
					key={branch.id}
					className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-100 hover:shadow-md"
				>
					<div className="flex items-start justify-between">
						<div className="flex items-center">
							<div className="text-stem-blue flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
								<MapPin size={24} />
							</div>
							<div className="ml-4">
								<h3 className="text-lg font-bold text-slate-900">{branch.name}</h3>
								<p className="text-sm text-slate-500">{branch.address}</p>
							</div>
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => onEdit(branch)}
								className="hover:text-stem-blue rounded-lg p-2 text-slate-400 hover:bg-slate-100"
							>
								<Edit2 size={18} />
							</button>
							<button
								onClick={() => onDelete(branch.id)}
								className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
							>
								<Trash2 size={18} />
							</button>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
						<div className="flex items-center text-sm text-slate-600">
							<Phone size={16} className="mr-2 text-slate-400" />
							028.1234.5678
						</div>
						<div className="flex items-center text-sm text-slate-600">
							<Mail size={16} className="mr-2 text-slate-400" />
							contact@beeenglish.edu.vn
						</div>
						<div className="col-span-2 flex items-center text-sm text-slate-600">
							<Clock size={16} className="mr-2 text-slate-400" />
							Thứ 2 - Chủ Nhật: 08:00 - 21:00
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
