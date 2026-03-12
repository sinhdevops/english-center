"use client";

import React from "react";
import { User, Phone, BookOpen, MapPin, Calendar, Clock, Trash2, Check, MessageSquare } from "lucide-react";
import { Registration, Branch, Course } from "@/lib/types";
import { toast } from "sonner";
import { updateRegistrationStatus, deleteRegistration } from "./actions";

interface RegistrationsClientProps {
	initialRegistrations: Registration[];
	branches: Branch[];
	courses: Course[];
}

export default function RegistrationsClient({ initialRegistrations, branches, courses }: RegistrationsClientProps) {
	const handleUpdateStatus = async (id: string, status: Registration["status"]) => {
		try {
			await updateRegistrationStatus(id, status);
			toast.success("Đã cập nhật trạng thái");
		} catch (error) {
			console.error("Error updating status:", error);
			toast.error("Lỗi khi cập nhật trạng thái");
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa yêu cầu đăng ký này?")) {
			try {
				await deleteRegistration(id);
				toast.success("Đã xóa đăng ký");
			} catch (error) {
				console.error("Error deleting registration:", error);
				toast.error("Lỗi khi xóa đăng ký");
			}
		}
	};

	const getStatusBadge = (status: Registration["status"]) => {
		switch (status) {
			case "pending":
				return (
					<span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-amber-600 uppercase">
						Chờ xử lý
					</span>
				);
			case "contacted":
				return (
					<span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase">
						Đã liên hệ
					</span>
				);
			case "enrolled":
				return (
					<span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-600 uppercase">
						Đã nhập học
					</span>
				);
			case "cancelled":
				return (
					<span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
						Đã hủy
					</span>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-slate-900">Danh sách đăng ký mới</h1>
				<p className="text-sm text-slate-500">Thông tin khách hàng đăng ký tư vấn và khóa học từ Website.</p>
			</div>

			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-left text-sm">
						<thead>
							<tr className="border-b border-slate-100 bg-slate-50/50">
								<th className="px-6 py-4 font-bold text-slate-700">Thông tin học viên</th>
								<th className="px-6 py-4 font-bold text-slate-700">Thông tin liên hệ</th>
								<th className="px-6 py-4 font-bold text-slate-700">Khóa học & Cơ sở</th>
								<th className="px-6 py-4 font-bold text-slate-700">Ngày đăng ký</th>
								<th className="px-6 py-4 font-bold text-slate-700">Trạng thái</th>
								<th className="px-6 py-4 text-right font-bold text-slate-700">Thao tác</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{initialRegistrations.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-6 py-12 text-center text-slate-400">
										Chưa có đăng ký mới nào
									</td>
								</tr>
							) : (
								initialRegistrations.map((reg) => {
									const branch = branches.find((b) => b.id === reg.branch_id);
									const course = courses.find((c) => c.id === reg.course_id);

									return (
										<tr key={reg.id} className="group transition-colors hover:bg-slate-50/50">
											<td className="px-6 py-4">
												<div className="font-bold text-slate-900">{reg.student_name}</div>
												<div className="text-xs text-slate-500">{reg.grade}</div>
											</td>
											<td className="px-6 py-4">
												<div className="flex flex-col gap-1">
													<div className="flex items-center text-xs text-slate-600">
														<Phone size={12} className="mr-2 text-slate-400" />
														{reg.phone}
													</div>
													<div className="flex items-center text-xs text-slate-600">
														<User size={12} className="mr-2 text-slate-400" />
														PH: {reg.parent_name}
													</div>
												</div>
											</td>
											<td className="px-6 py-4">
												<div className="flex flex-col gap-1">
													<div className="flex items-center text-xs font-semibold text-indigo-600">
														<BookOpen size={12} className="mr-2" />
														{course?.name || "N/A"}
													</div>
													<div className="flex items-center text-xs text-slate-500">
														<MapPin size={12} className="mr-2" />
														{branch?.name || "N/A"}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 text-xs text-slate-500">
												<div className="flex items-center">
													<Calendar size={12} className="mr-2" />
													{new Date(reg.created_at).toLocaleDateString("vi-VN")}
												</div>
											</td>
											<td className="px-6 py-4">{getStatusBadge(reg.status)}</td>
											<td className="px-6 py-4 text-right">
												<div className="flex items-center justify-end gap-2">
													{reg.status === "pending" && (
														<button
															onClick={() => handleUpdateStatus(reg.id, "contacted")}
															className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
															title="Đã liên hệ"
														>
															<MessageSquare size={16} />
														</button>
													)}
													{reg.status !== "enrolled" && (
														<button
															onClick={() => handleUpdateStatus(reg.id, "enrolled")}
															className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
															title="Đã nhập học"
														>
															<Check size={16} />
														</button>
													)}
													<button
														onClick={() => handleDelete(reg.id)}
														className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
														title="Xóa"
													>
														<Trash2 size={16} />
													</button>
												</div>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
				{initialRegistrations.length === 0 && (
					<div className="flex flex-col items-center justify-center py-12 text-center">
						<Clock size={48} className="text-slate-200" />
						<h3 className="mt-4 text-lg font-bold text-slate-900">Không có đăng ký mới</h3>
						<p className="mt-1 text-sm text-slate-500">Tất cả yêu cầu đã được xử lý.</p>
					</div>
				)}
			</div>
		</>
	);
}
