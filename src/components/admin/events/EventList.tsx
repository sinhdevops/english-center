"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Edit, Trash, ImageIcon } from "lucide-react";
import { Event } from "@/lib/types";
import { AdminTable } from "@/components/admin/AdminTable";

interface EventListProps {
	events: Event[];
	isLoading: boolean;
	onEdit: (event: Event) => void;
	onDelete: (id: string) => void;
}

const CATEGORIES = ["Tất cả", "Góc ba mẹ", "Góc học tập", "Tin tức"];

const CATEGORY_COLORS: Record<string, string> = {
	"Góc ba mẹ": "bg-pink-50 text-pink-600",
	"Góc học tập": "bg-green-50 text-green-600",
	"Tin tức": "bg-blue-50 text-blue-600",
};

export const EventList = ({ events, isLoading, onEdit, onDelete }: EventListProps) => {
	const [activeCategory, setActiveCategory] = useState("Tất cả");

	const filtered = activeCategory === "Tất cả"
		? events
		: events.filter((e) => e.category === activeCategory);

	const columns = [
		{
			header: "Ảnh bìa",
			accessor: (event: Event) => (
				<div className="relative h-12 w-20 overflow-hidden rounded-lg bg-slate-100">
					{event.image_url || event.youtube_id ? (
						<Image
							src={event.image_url || `https://img.youtube.com/vi/${event.youtube_id}/hqdefault.jpg`}
							alt={event.title}
							fill
							className="object-cover"
							referrerPolicy="no-referrer"
							unoptimized={!event.image_url}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center text-slate-300">
							<ImageIcon size={18} />
						</div>
					)}
				</div>
			),
			className: "w-28",
		},
		{
			header: "Tiêu đề",
			accessor: (event: Event) => (
				<span className="line-clamp-2 font-medium text-slate-900">{event.title}</span>
			),
		},
		{
			header: "Danh mục",
			accessor: (event: Event) => {
				const color = CATEGORY_COLORS[event.category || ""] || "bg-slate-100 text-slate-600";
				return (
					<span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${color}`}>
						{event.category || "Hệ thống"}
					</span>
				);
			},
			className: "w-36",
			align: "center" as const,
		},
		{
			header: "Ngày",
			accessor: (event: Event) =>
				new Date(event.date).toLocaleDateString("vi-VN", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}),
			className: "w-32 text-slate-500",
		},
		{
			header: "Địa điểm",
			accessor: (event: Event) => (
				<span className="text-slate-500">{event.location}</span>
			),
		},
	];

	return (
		<div className="space-y-4">
			{/* Category filter */}
			<div className="flex flex-wrap gap-2">
				{CATEGORIES.map((cat) => (
					<button
						key={cat}
						onClick={() => setActiveCategory(cat)}
						className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
							activeCategory === cat
								? "bg-stem-blue text-white shadow-sm"
								: "bg-slate-100 text-slate-600 hover:bg-slate-200"
						}`}
					>
						{cat}
						{cat !== "Tất cả" && (
							<span className="ml-1.5 text-xs opacity-70">
								({events.filter((e) => e.category === cat).length})
							</span>
						)}
					</button>
				))}
			</div>

			<AdminTable
				columns={columns}
				data={filtered}
				isLoading={isLoading}
				emptyMessage="Chưa có sự kiện nào trong danh mục này"
				rowActions={(event) => (
					<>
						<button
							onClick={() => onEdit(event)}
							className="hover:text-stem-blue rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-blue-50"
						>
							<Edit size={16} />
						</button>
						<button
							onClick={() => onDelete(event.id)}
							className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
						>
							<Trash size={16} />
						</button>
					</>
				)}
			/>
		</div>
	);
};
