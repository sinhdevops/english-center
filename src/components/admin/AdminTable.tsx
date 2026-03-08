import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Column<T> {
	header: string;
	accessor: keyof T | ((item: T) => React.ReactNode);
	className?: string;
	align?: "left" | "center" | "right";
}

interface AdminTableProps<T> {
	columns: Column<T>[];
	data: T[];
	isLoading?: boolean;
	emptyMessage?: string;
	onRowClick?: (item: T) => void;
	rowActions?: (item: T) => React.ReactNode;
}

export function AdminTable<T extends { id: string | number }>({
	columns,
	data,
	isLoading,
	emptyMessage = "Chưa có dữ liệu nào",
	onRowClick,
	rowActions,
}: AdminTableProps<T>) {
	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead className="bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase">
						<tr>
							{columns.map((col, idx) => (
								<th
									key={idx}
									className={cn(
										"px-6 py-4",
										col.align === "center" && "text-center",
										col.align === "right" && "text-right",
										col.className,
									)}
								>
									{col.header}
								</th>
							))}
							{rowActions && <th className="px-6 py-4 text-right">Thao tác</th>}
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{isLoading ? (
							<tr>
								<td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-12 text-center">
									<div className="border-stem-blue inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
								</td>
							</tr>
						) : data.length === 0 ? (
							<tr>
								<td
									colSpan={columns.length + (rowActions ? 1 : 0)}
									className="px-6 py-12 text-center text-slate-400"
								>
									{emptyMessage}
								</td>
							</tr>
						) : (
							data.map((item, idx) => (
								<motion.tr
									key={item.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: idx * 0.03 }}
									onClick={() => onRowClick?.(item)}
									className={cn("group hover:bg-slate-50/50", onRowClick && "cursor-pointer")}
								>
									{columns.map((col, cIdx) => (
										<td
											key={cIdx}
											className={cn(
												"px-6 py-4",
												col.align === "center" && "text-center",
												col.align === "right" && "text-right",
												col.className,
											)}
										>
											{typeof col.accessor === "function"
												? col.accessor(item)
												: (item[col.accessor] as React.ReactNode)}
										</td>
									))}
									{rowActions && (
										<td className="px-6 py-4 text-right">
											<div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
												{rowActions(item)}
											</div>
										</td>
									)}
								</motion.tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
