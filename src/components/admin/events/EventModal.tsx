import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { eventSchema } from "@/lib/validations/admin";
import { Event } from "@/lib/types";
import { Upload, User, X } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import * as z from "zod";

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

export const EventModal = ({ isOpen, onClose, editingEvent, onSubmit, isSubmitting }: EventModalProps) => {
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
	const authorImageUrl = useWatch({ control, name: "author_image_url" as any });

	useEffect(() => {
		if (editingEvent) {
			reset({
				title: editingEvent.title,
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
				description: "",
				content: "",
				date: "",
				location: "",
				image_url: "",
				author_image_url: "",
			});
		}
	}, [editingEvent, reset, isOpen]);

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

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
		field: "image_url" | "author_image_url",
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				const url = await uploadImage(reader.result as string, field === "image_url" ? "events" : "authors");
				if (url) setValue(field, url);
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

						<AdminFormField label="Mô tả ngắn" error={errors.description?.message} required>
							<textarea
								className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
								rows={3}
								{...register("description")}
							/>
						</AdminFormField>

						<div className="grid grid-cols-2 gap-4">
							<AdminFormField label="Ngày diễn ra" error={errors.date?.message} required>
								<input
									type="date"
									className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
									{...register("date")}
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
					</div>

					<div className="space-y-4">
						<AdminFormField label="Ảnh bìa sự kiện">
							<div className="mt-2 flex items-center gap-4">
								<div className="hover:border-stem-blue relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-blue-50/30">
									{imageUrl ? (
										<>
											<Image src={imageUrl} alt="Preview" fill className="object-cover" />
											<button
												type="button"
												onClick={() => setValue("image_url", "")}
												className="absolute top-2 right-2 rounded-full bg-rose-500 p-1.5 text-white shadow-lg shadow-rose-200 transition-colors hover:bg-rose-600"
											>
												<X size={14} />
											</button>
										</>
									) : (
										<div className="flex flex-col items-center gap-1">
											<Upload size={24} />
											<span className="text-xs font-bold tracking-wider uppercase">
												Tải lên ảnh bìa
											</span>
										</div>
									)}
									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 cursor-pointer opacity-0"
										onChange={(e) => handleImageUpload(e, "image_url")}
									/>
								</div>
							</div>
						</AdminFormField>

						<AdminFormField label="Ảnh tác giả">
							<div className="mt-2 flex items-center gap-4">
								<div className="hover:border-stem-blue relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-blue-50/30">
									{authorImageUrl ? (
										<>
											<Image
												src={authorImageUrl}
												alt="Author Preview"
												fill
												className="object-cover"
											/>
											<button
												type="button"
												onClick={() => setValue("author_image_url", "")}
												className="absolute top-0 right-0 rounded-full bg-rose-500 p-1 text-white shadow-md transition-colors hover:bg-rose-600"
											>
												<X size={10} />
											</button>
										</>
									) : (
										<div className="flex flex-col items-center gap-1">
											<User size={20} />
											<span className="text-[8px] font-bold tracking-wider uppercase">
												Tác giả
											</span>
										</div>
									)}
									<input
										type="file"
										accept="image/*"
										className="absolute inset-0 cursor-pointer opacity-0"
										onChange={(e) => handleImageUpload(e, "author_image_url")}
									/>
								</div>
								<div className="flex-1">
									<p className="text-[10px] text-slate-500 italic">
										Ảnh đại diện của người đăng hoặc diễn giả chính của sự kiện.
									</p>
								</div>
							</div>
						</AdminFormField>
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
