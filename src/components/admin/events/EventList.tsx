import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Calendar, MapPin, Edit, Trash, ExternalLink, ImageIcon, MoreVertical } from "lucide-react";
import { Event } from "@/lib/types";

interface EventListProps {
	events: Event[];
	isLoading: boolean;
	onEdit: (event: Event) => void;
	onDelete: (id: string) => void;
}

export const EventList = ({ events, isLoading, onEdit, onDelete }: EventListProps) => {
	if (isLoading) {
		return (
			<div className="col-span-full flex h-64 items-center justify-center">
				<div className="border-stem-blue h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
			</div>
		);
	}

	if (events.length === 0) {
		return (
			<div className="col-span-full flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
				<p className="font-medium">Chưa có sự kiện nào</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{events.map((event, idx) => (
				<motion.div
					key={event.id}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: idx * 0.05 }}
					className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-100 hover:shadow-md"
				>
					<div className="relative h-48 w-full bg-slate-100">
						{event.image_url ? (
							<Image
								src={event.image_url}
								alt={event.title}
								fill
								className="object-cover"
								referrerPolicy="no-referrer"
							/>
						) : (
							<div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
								<ImageIcon size={48} strokeWidth={1} />
								<span className="mt-2 text-xs font-medium">Chưa có ảnh bìa</span>
							</div>
						)}
						<div className="absolute top-3 right-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
							<button
								onClick={() => onEdit(event)}
								className="hover:text-stem-blue rounded-full bg-white/90 p-2 text-slate-600 shadow-sm backdrop-blur-sm hover:bg-white"
							>
								<Edit size={16} />
							</button>
							<button
								onClick={() => onDelete(event.id)}
								className="rounded-full bg-white/90 p-2 text-rose-600 shadow-sm backdrop-blur-sm hover:bg-white"
							>
								<Trash size={16} />
							</button>
						</div>
					</div>

					<div className="flex flex-1 flex-col p-5">
						<div className="mb-2 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="text-stem-blue rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
									Sự kiện
								</span>
								{event.author_image_url && (
									<div className="relative h-6 w-6 overflow-hidden rounded-full border border-slate-200">
										<Image
											src={event.author_image_url}
											alt="Author"
											fill
											className="object-cover"
										/>
									</div>
								)}
							</div>
							<button className="text-slate-400 hover:text-slate-600">
								<MoreVertical size={18} />
							</button>
						</div>
						<h3 className="line-clamp-1 text-lg font-bold text-slate-900">{event.title}</h3>
						<p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600">{event.description}</p>

						<div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
							<div className="flex items-center text-xs text-slate-500">
								<Calendar size={14} className="text-stem-blue mr-2" />
								{new Date(event.date).toLocaleDateString("vi-VN", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</div>
							<div className="flex items-center text-xs text-slate-500">
								<MapPin size={14} className="text-stem-blue mr-2" />
								{event.location}
							</div>
						</div>

						<button className="mt-5 flex items-center justify-center rounded-xl border border-slate-100 py-2.5 text-sm font-bold text-slate-700 transition-all hover:border-slate-200 hover:bg-slate-50">
							Xem chi tiết
							<ExternalLink size={14} className="ml-2" />
						</button>
					</div>
				</motion.div>
			))}
		</div>
	);
};
