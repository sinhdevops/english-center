import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronDown, Layers, Edit2, Trash2, Plus, GraduationCap, Clock, Users } from "lucide-react";
import { Program, Course } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProgramListProps {
	programs: Program[];
	courses: Course[];
	isLoading: boolean;
	onEditProgram: (program: Program) => void;
	onDeleteProgram: (id: string, e: React.MouseEvent) => void;
	onAddCourse: (programId: string) => void;
	onEditCourse: (programId: string, course: Course) => void;
	onDeleteCourse: (id: string) => void;
}

export const ProgramList = ({
	programs,
	courses,
	isLoading,
	onEditProgram,
	onDeleteProgram,
	onAddCourse,
	onEditCourse,
	onDeleteCourse,
}: ProgramListProps) => {
	const [expandedProgram, setExpandedProgram] = useState<string | null>(programs.length > 0 ? programs[0].id : null);

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="border-stem-blue h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
			</div>
		);
	}

	if (programs.length === 0) {
		return (
			<div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
				<p className="font-medium">Chưa có chương trình nào</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{programs.map((program) => (
				<div
					key={program.id}
					className={cn(
						"overflow-hidden rounded-2xl border transition-all duration-300",
						expandedProgram === program.id
							? "border-stem-blue bg-white shadow-md shadow-blue-50"
							: "border-slate-200 bg-white hover:border-blue-100",
					)}
				>
					<div
						className="flex cursor-pointer items-center justify-between p-5"
						onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
					>
						<div className="flex items-center">
							{program.image_url ? (
								<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200">
									<Image
										src={program.image_url}
										alt={program.name}
										fill
										className="object-cover"
										referrerPolicy="no-referrer"
									/>
								</div>
							) : (
								<div
									className={cn(
										"flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
										expandedProgram === program.id
											? "bg-stem-blue text-white"
											: "bg-slate-100 text-slate-500",
									)}
								>
									<Layers size={24} />
								</div>
							)}
							<div className="ml-4">
								<h3 className="text-lg font-bold text-slate-900">{program.name}</h3>
								<p className="text-sm text-slate-500">{program.description}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex gap-2">
								<button
									onClick={(e) => {
										e.stopPropagation();
										onEditProgram(program);
									}}
									className="hover:text-stem-blue rounded-lg p-2 text-slate-400 hover:bg-slate-100"
								>
									<Edit2 size={18} />
								</button>
								<button
									onClick={(e) => onDeleteProgram(program.id, e)}
									className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
								>
									<Trash2 size={18} />
								</button>
							</div>
							<div className="text-slate-400">
								{expandedProgram === program.id ? (
									<ChevronDown size={20} />
								) : (
									<ChevronRight size={20} />
								)}
							</div>
						</div>
					</div>

					<AnimatePresence>
						{expandedProgram === program.id && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
							>
								<div className="p-5">
									<div className="mb-4 flex items-center justify-between">
										<h4 className="text-sm font-bold tracking-wider text-slate-500 uppercase">
											Danh sách khóa học
										</h4>
										<button
											onClick={() => onAddCourse(program.id)}
											className="text-stem-blue flex items-center text-xs font-bold hover:text-blue-700"
										>
											<Plus size={14} className="mr-1" />
											Thêm khóa học mới
										</button>
									</div>

									<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
										{courses
											.filter((c) => c.program_id === program.id)
											.map((course) => (
												<div
													key={course.id}
													className="group hover:border-stem-blue relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
												>
													<div className="flex items-start justify-between">
														<div className="text-stem-blue flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
															<GraduationCap size={16} />
														</div>
														<div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
															<button
																onClick={() => onEditCourse(program.id, course)}
																className="hover:text-stem-blue rounded-md p-1 text-slate-400 hover:bg-slate-100"
															>
																<Edit2 size={14} />
															</button>
															<button
																onClick={() => onDeleteCourse(course.id)}
																className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
															>
																<Trash2 size={14} />
															</button>
														</div>
													</div>
													<h5 className="mt-3 font-bold text-slate-900">{course.name}</h5>
													<div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
														<div className="flex items-center">
															<Clock size={12} className="mr-1" />
															{course.duration || "N/A"}
														</div>
														<div className="flex items-center">
															<Users size={12} className="mr-1" />
															{course.level || "N/A"}
														</div>
													</div>
												</div>
											))}
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			))}
		</div>
	);
};
