import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { eventSchema } from "@/lib/validations/admin";
import { Event } from "@/lib/types";
import { Upload, X, Tag } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import * as z from "zod";
import { useAuthStore } from "@/store/useAuthStore";

const ReactQuill = dynamic(() => import("react-quill-new"), {
	ssr: false,
	loading: () => <div className="h-48 w-full animate-pulse rounded-xl bg-slate-100" />,
}) as any;

import "react-quill-new/dist/quill.snow.css";

type EventFormData = z.infer<typeof eventSchema>;

interface EventModalProps {
	isOpen: boolean;
	onClose: () => void;
	editingEvent: Event | null;
	onSubmit: (data: EventFormData) => Promise<void>;
	isSubmitting: boolean;
}

const CATEGORIES = ["Góc ba mẹ", "Góc học tập", "Tin tức"];

export const EventModal = ({ isOpen, onClose, editingEvent, onSubmit, isSubmitting }: EventModalProps) => {
	const { profile } = useAuthStore();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		control,
		formState: { errors },
	} = useForm<EventFormData>({
		resolver: zodResolver(eventSchema) as any,
		defaultValues: {
			title: "",
			category: "Tin tức",
			description: "",
			content: "",
			date: "",
			location: "",
			image_url: "",
			author_image_url: "",
		},
	});

	const quillRef = useRef<any>(null);
	const imageUrl = useWatch({ control, name: "image_url" as any });

	useEffect(() => {
		if (editingEvent) {
			reset({
				title: editingEvent.title,
				category: editingEvent.category || "Tin tức",
				description: editingEvent.description,
				content: editingEvent.content || "",
				date: editingEvent.date,
				location: editingEvent.location,
				image_url: editingEvent.image_url || "",
				author_image_url: editingEvent.author_image_url || "",
			});
		} else {
			reset({
				title: "",
				category: "Tin tức",
				description: "",
				content: "",
				date: "",
				location: "",
				image_url: "",
				author_image_url: profile?.avatar_url || "",
			});
		}
	}, [editingEvent, reset, isOpen, profile]);

	const uploadImage = async (base64: string, folder: string) => {
		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ image: base64, folder }),
			});
			const data = await response.json();
			if (data.error) throw new Error(data.error);
			return data.url;
		} catch (error) {
			console.error("Upload error:", error);
			return null;
		}
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				const url = await uploadImage(reader.result as string, "events");
				if (url) setValue("image_url", url);
			};
			reader.readAsDataURL(file);
		}
	};

	const imageHandler = useCallback(() => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = async () => {
					const url = await uploadImage(reader.result as string, "content");
					if (url && quillRef.current) {
						const quill = quillRef.current.getEditor();
						const range = quill.getSelection();
						quill.insertEmbed(range.index, "image", url);
					}
				};
				reader.readAsDataURL(file);
			}
		};
	}, []);

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [1, 2, 3, false] }],
					["bold", "italic", "underline", "strike"],
					[{ list: "ordered" }, { list: "bullet" }],
					["link", "image"],
					["clean"],
				],
				handlers: {
					image: imageHandler,
				},
			},
		}),
		[imageHandler],
	);

	const formats = ["header", "bold", "italic", "underline", "strike", "list", "link", "image"];

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
			maxWidth="max-w-4xl"
		>
			<form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="space-y-4">
						<AdminFormField label="Tiêu đề sự kiện" error={errors.title?.message} required>
							<input
								type="text"
								className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
								{...register("title")}
							/>
						</AdminFormField>

						<div className="grid grid-cols-2 gap-4">
							<AdminFormField label="Danh mục" error={errors.category?.message} required>
								<div className="relative mt-1">
									<select
										className="focus:border-stem-blue focus:ring-stem-blue block w-full appearance-none rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm"
										{...register("category")}
									>
										{CATEGORIES.map((cat) => (
											<option key={cat} value={cat}>
												{cat}
											</option>
										))}
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
										<Tag size={14} />
									</div>
								</div>
							</AdminFormField>
							<AdminFormField label="Ngày diễn ra" error={errors.date?.message} required>
								<input
									type="date"
									className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
									{...register("date")}
								/>
							</AdminFormField>
						</div>

						<AdminFormField label="Mô tả ngắn" error={errors.description?.message} required>
							<textarea
								className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
								rows={3}
								{...register("description")}
							/>
						</AdminFormField>

						<AdminFormField label="Địa điểm" error={errors.location?.message} required>
							<input
								type="text"
								className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
								{...register("location")}
							/>
						</AdminFormField>
					</div>

					<div className="space-y-4">
						<AdminFormField label="Ảnh bìa sự kiện">
							<div className="mt-2 flex items-center gap-4">
								<div className="hover:border-stem-blue relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-blue-50/30">
									{imageUrl ? (
										<>
											<Image src={imageUrl} alt="Preview" fill className="object-cover" />
											<button
												type="button"
												onClick={() => setValue("image_url", "")}
												className="absolute top-4 right-4 rounded-full bg-rose-500 p-2 text-white shadow-xl shadow-rose-200 transition-colors hover:bg-rose-600"
											>
												<X size={16} />
											</button>
										</>
									) : (
										<div className="flex flex-col items-center gap-2">
											<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
												<Upload size={24} className="text-stem-blue" />
											</div>
											<span className="text-xs font-black tracking-widest uppercase">
												Tải lên ảnh bìa
											</span>
										</div>
									)}
									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 cursor-pointer opacity-0"
										onChange={handleImageUpload}
									/>
								</div>
							</div>
						</AdminFormField>

						<div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
							<p className="mb-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
								Thông tin người đăng
							</p>
							<div className="flex items-center gap-3">
								<div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
									<Image
										src={
											profile?.avatar_url ||
											"https://images.unsplash.com/photo-1543269865-cbf427effbad"
										}
										alt="Author"
										fill
										className="object-cover"
									/>
								</div>
								<div>
									<p className="text-sm font-bold text-slate-900">{profile?.full_name || "Admin"}</p>
									<p className="text-[10px] font-medium text-slate-500 capitalize">
										{profile?.role || "Administrator"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<AdminFormField label="Nội dung chi tiết" error={errors.content?.message}>
					<div className="quill-editor-container">
						<ReactQuill
							ref={quillRef}
							theme="snow"
							value={useWatch({ control, name: "content" })}
							onChange={(content: string) => setValue("content", content)}
							modules={modules}
							formats={formats}
							className="mb-12 h-64"
						/>
					</div>
				</AdminFormField>

				<div className="mt-8 flex gap-3 border-t border-slate-100 pt-4">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50"
					>
						Hủy
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-stem-blue hover:bg-opacity-90 flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
					>
						{isSubmitting ? "Đang lưu..." : "Lưu sự kiện"}
					</button>
				</div>
			</form>
		</AdminModal>
	);
};
