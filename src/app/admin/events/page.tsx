"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventList } from "@/components/admin/events/EventList";
import { EventModal } from "@/components/admin/events/EventModal";
import { useAdminStore } from "@/store/admin-store";
import { supabase } from "@/lib/supabase-client";
import { Event } from "@/lib/types";
import { toast } from "sonner";

export default function EventsPage() {
	const { events, isLoading, fetchEvents } = useAdminStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | null>(null);

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	const handleOpenModal = (event?: Event) => {
		setEditingEvent(event || null);
		setIsModalOpen(true);
	};

	const handleSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			if (editingEvent) {
				const { error } = await supabase.from("events").update(data).eq("id", editingEvent.id);
				if (error) throw error;
				toast.success("Đã cập nhật sự kiện");
			} else {
				const { error } = await supabase.from("events").insert([data]);
				if (error) throw error;
				toast.success("Đã tạo sự kiện mới");
			}
			fetchEvents();
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
				const { error } = await supabase.from("events").delete().eq("id", id);
				if (error) throw error;
				toast.success("Đã xóa sự kiện");
				fetchEvents();
			} catch (error) {
				console.error("Error deleting event:", error);
				toast.error("Lỗi khi xóa sự kiện");
			}
		}
	};

	return (
		<AdminLayout>
			<AdminPageHeader
				title="Quản lý sự kiện"
				description="Tạo và quản lý các hoạt động ngoại khóa, workshop, ngày hội cho học viên Bee English."
				actionLabel="Tạo sự kiện mới"
				onAction={() => handleOpenModal()}
			/>

			<EventList events={events} isLoading={isLoading} onEdit={handleOpenModal} onDelete={handleDelete} />

			<EventModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				editingEvent={editingEvent}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		</AdminLayout>
	);
}
