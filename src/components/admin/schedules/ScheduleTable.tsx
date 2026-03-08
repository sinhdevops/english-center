import React from "react";
import { Edit2, Trash2, MapPin, Calendar } from "lucide-react";
import { AdminTable } from "../AdminTable";
import { ClassSchedule, Branch, Course } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScheduleTableProps {
	schedules: ClassSchedule[];
	branches: Branch[];
	courses: Course[];
	isLoading: boolean;
	onEdit: (schedule: ClassSchedule) => void;
	onDelete: (id: string) => void;
}

export const ScheduleTable = ({ schedules, branches, courses, isLoading, onEdit, onDelete }: ScheduleTableProps) => {
	const columns = [
		{
			header: "Chương trình & Khóa học",
			accessor: (item: ClassSchedule) => {
				const course = courses.find((c) => c.id === item.course_id);
				const branch = branches.find((b) => b.id === item.branch_id);
				return (
					<div>
						<div className="text-stem-blue cursor-pointer font-medium hover:underline">
							{course?.name || "N/A"}
						</div>
						<div className="mt-1 flex items-center text-xs text-slate-500">
							<MapPin size={12} className="mr-1" />
							{branch?.name || "N/A"}
						</div>
					</div>
				);
			},
		},
		{
			header: "Lớp",
			accessor: "class_code" as keyof ClassSchedule,
			className: "font-mono text-xs font-semibold text-slate-700",
		},
		{
			header: "Lịch học",
			accessor: "schedule" as keyof ClassSchedule,
			className: "max-w-[250px] text-slate-600",
		},
		{
			header: "Học sinh",
			align: "center" as const,
			accessor: (item: ClassSchedule) => (
				<div className="text-stem-blue inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold">
					{item.student_count || 0}
				</div>
			),
		},
		{
			header: "Khai giảng",
			accessor: (item: ClassSchedule) => (
				<div className="flex items-center text-slate-700">
					<Calendar size={14} className="mr-2 text-slate-400" />
					{new Date(item.start_date).toLocaleDateString("vi-VN")}
				</div>
			),
		},
		{
			header: "Trạng thái",
			accessor: (item: ClassSchedule) => (
				<span
					className={cn(
						"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
						item.status === "open" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
					)}
				>
					{item.status === "open" ? "Đang mở" : "Đã đóng"}
				</span>
			),
		},
	];

	return (
		<AdminTable
			columns={columns}
			data={schedules}
			isLoading={isLoading}
			emptyMessage="Chưa có lịch khai giảng nào"
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
