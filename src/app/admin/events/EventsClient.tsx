"use client";

import { useSearchParams } from "next/navigation";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventList } from "@/components/admin/events/EventList";
import { EventModal } from "@/components/admin/events/EventModal";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Event } from "@/lib/types";
import { toast } from "sonner";
import { createEvent, updateEvent, deleteEvent } from "./actions";

interface EventsClientProps {
	initialEvents: Event[];
}

const ITEMS_PER_PAGE = 10;

export default function EventsClient({ initialEvents }: EventsClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | null>(null);
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

	const handleOpenModal = (event?: Event) => {
		setEditingEvent(event || null);
		setIsModalOpen(true);
	};

	const handleSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingEvent) {
				await updateEvent(editingEvent.id, data);
				toast.success("Đã cập nhật sự kiện");
			} else {
				await createEvent(data);
				toast.success("Đã tạo sự kiện mới");
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error saving event:", error);
			toast.error("Lỗi khi lưu sự kiện");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
			try {
				await deleteEvent(id);
				toast.success("Đã xóa sự kiện");
			} catch (error) {
				console.error("Error deleting event:", error);
				toast.error("Lỗi khi xóa sự kiện");
			}
		}
	};

	const totalPages = Math.ceil(initialEvents.length / ITEMS_PER_PAGE);
	const paginatedEvents = initialEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	return (
		<>
			<AdminPageHeader
				title="Quản lý sự kiện"
				description="Tạo và quản lý các hoạt động ngoại khóa, workshop, ngày hội cho học viên Bee English."
				actionLabel="Tạo sự kiện mới"
				onAction={() => handleOpenModal()}
			/>

			<EventList events={paginatedEvents} isLoading={false} onEdit={handleOpenModal} onDelete={handleDelete} />

			<AdminPagination currentPage={currentPage} totalPages={totalPages} />

			<EventModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingEvent={editingEvent}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</>
	);
}
