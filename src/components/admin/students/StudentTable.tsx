import React from "react";
import { Edit2, Trash2, User, Phone, Mail, MapPin, GraduationCap } from "lucide-react";
import { AdminTable } from "../AdminTable";
import { Student, Branch, Course } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StudentTableProps {
	students: Student[];
	branches: Branch[];
	courses: Course[];
	isLoading: boolean;
	onEdit: (student: Student) => void;
	onDelete: (id: string) => void;
}

export const StudentTable = ({ students, branches, courses, isLoading, onEdit, onDelete }: StudentTableProps) => {
	const columns = [
		{
			header: "Học viên",
			accessor: (item: Student) => (
				<div className="flex items-center">
					<div className="text-stem-blue flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
						<User size={20} />
					</div>
					<div className="ml-4">
						<div className="font-semibold text-slate-900">{item.name}</div>
						<div className="text-xs text-slate-500">
							Lớp: {item.grade} • {item.age} tuổi
						</div>
					</div>
				</div>
			),
		},
		{
			header: "Liên hệ",
			accessor: (item: Student) => (
				<div className="space-y-1">
					<div className="flex items-center text-xs text-slate-600">
						<Phone size={12} className="mr-1.5 text-slate-400" />
						{item.phone}
					</div>
					<div className="flex items-center text-xs text-slate-600">
						<Mail size={12} className="mr-1.5 text-slate-400" />
						{item.email}
					</div>
				</div>
			),
		},
		{
			header: "Khóa học & Cơ sở",
			accessor: (item: Student) => {
				const course = courses.find((c) => c.id === item.course_id);
				const branch = branches.find((b) => b.id === item.branch_id);
				return (
					<div className="space-y-1">
						<div className="flex items-center text-xs font-medium text-slate-700">
							<GraduationCap size={12} className="mr-1.5 text-slate-400" />
							{course?.name || "N/A"}
						</div>
						<div className="flex items-center text-xs text-slate-500">
							<MapPin size={12} className="mr-1.5 text-slate-400" />
							{branch?.name || "N/A"}
						</div>
					</div>
				);
			},
		},
		{
			header: "Trạng thái",
			accessor: (item: Student) => (
				<span
					className={cn(
						"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
						item.status === "active"
							? "bg-emerald-100 text-emerald-700"
							: item.status === "inactive"
								? "bg-slate-100 text-slate-700"
								: "bg-blue-100 text-blue-700",
					)}
				>
					{item.status === "active" ? "Đang học" : item.status === "inactive" ? "Nghỉ học" : "Tốt nghiệp"}
				</span>
			),
		},
	];

	return (
		<AdminTable
			columns={columns}
			data={students}
			isLoading={isLoading}
			emptyMessage="Chưa có học viên nào"
			rowActions={(item) => (
				<>
					<button
						onClick={() => onEdit(item)}
						className="hover:text-stem-blue rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
					>
						<Edit2 size={16} />
					</button>
					<button
						onClick={() => onDelete(item.id)}
						className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
					>
						<Trash2 size={16} />
					</button>
				</>
			)}
		/>
	);
};
