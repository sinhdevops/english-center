import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminModal } from "../AdminModal";
import { AdminFormField } from "../AdminFormField";
import { eventSchema } from "@/lib/validations/admin";
import { Event } from "@/lib/types";
import { Upload, X, Tag, Loader2, FileText, Youtube, Link } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import * as z from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

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

function parseYoutubeId(input: string): string {
	const trimmed = input.trim();
	// Full URL patterns
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
		/^([A-Za-z0-9_-]{11})$/,
	];
	for (const pattern of patterns) {
		const match = trimmed.match(pattern);
		if (match) return match[1];
	}
	return trimmed;
}

export const EventModal = ({ isOpen, onClose, editingEvent, onSubmit, isSubmitting }: EventModalProps) => {
	const { profile } = useAuthStore();
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [activeTab, setActiveTab] = useState<"article" | "video">("article");
	const [youtubeInput, setYoutubeInput] = useState("");
	const [youtubePreviewId, setYoutubePreviewId] = useState("");

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
			type: "article",
			title: "",
			category: "Tin tức",
			description: "",
			content: "",
			date: "",
			location: "",
			image_url: "",
			author_image_url: "",
			youtube_id: "",
		},
	});

	const quillRef = useRef<any>(null);
	const imageUrl = useWatch({ control, name: "image_url" as any });
	const contentValue = useWatch({ control, name: "content" as any });

	useEffect(() => {
		if (editingEvent) {
			const type = (editingEvent.type as "article" | "video") || "article";
			setActiveTab(type);
			if (type === "video" && editingEvent.youtube_id) {
				setYoutubeInput(editingEvent.youtube_id);
				setYoutubePreviewId(editingEvent.youtube_id);
			}
			reset({
				type,
				title: editingEvent.title,
				category: editingEvent.category || "Tin tức",
				description: editingEvent.description,
				content: editingEvent.content || "",
				date: editingEvent.date,
				location: editingEvent.location,
				image_url: editingEvent.image_url || "",
				author_image_url: editingEvent.author_image_url || "",
				youtube_id: editingEvent.youtube_id || "",
			});
		} else {
			setActiveTab("article");
			setYoutubeInput("");
			setYoutubePreviewId("");
			reset({
				type: "article",
				title: "",
				category: "Tin tức",
				description: "",
				content: "",
				date: "",
				location: "",
				image_url: "",
				author_image_url: profile?.avatar_url || "",
				youtube_id: "",
			});
		}
	}, [editingEvent, reset, isOpen, profile]);

	const handleTabChange = (tab: "article" | "video") => {
		setActiveTab(tab);
		setValue("type", tab);
	};

	const handleYoutubeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setYoutubeInput(val);
		const parsed = parseYoutubeId(val);
		setYoutubePreviewId(parsed);
		setValue("youtube_id", parsed);
	};

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
				setIsUploadingImage(true);
				const url = await uploadImage(reader.result as string, "events");
				if (url) setValue("image_url", url);
				setIsUploadingImage(false);
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
				handlers: { image: imageHandler },
			},
		}),
		[imageHandler],
	);

	const formats = ["header", "bold", "italic", "underline", "strike", "list", "link", "image"];

	const commonFields = (
		<div className="grid grid-cols-2 gap-4">
			<AdminFormField label="Danh mục" error={(errors as any).category?.message} required>
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
			<AdminFormField label="Ngày diễn ra" error={(errors as any).date?.message} required>
				<input
					type="date"
					className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
					{...register("date")}
				/>
			</AdminFormField>
		</div>
	);

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={editingEvent ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
			maxWidth="max-w-4xl"
		>
			{/* Tab switcher */}
			<div className="mb-6 flex gap-1 rounded-xl bg-slate-100 p-1">
				<button
					type="button"
					onClick={() => handleTabChange("article")}
					className={cn(
						"flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all",
						activeTab === "article"
							? "bg-white text-slate-900 shadow-sm"
							: "text-slate-500 hover:text-slate-700",
					)}
				>
					<FileText size={15} />
					Bài viết
				</button>
				<button
					type="button"
					onClick={() => handleTabChange("video")}
					className={cn(
						"flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all",
						activeTab === "video"
							? "bg-white text-slate-900 shadow-sm"
							: "text-slate-500 hover:text-slate-700",
					)}
				>
					<Youtube size={15} />
					Video YouTube
				</button>
			</div>

			<form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
				<input type="hidden" {...register("type")} />

				{/* ── TAB 1: BÀI VIẾT ── */}
				{activeTab === "article" && (
					<>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="space-y-4">
								<AdminFormField label="Tiêu đề" error={(errors as any).title?.message} required>
									<input
										type="text"
										className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
										{...register("title")}
									/>
								</AdminFormField>

								{commonFields}

								<AdminFormField label="Mô tả ngắn" error={(errors as any).description?.message} required>
									<textarea
										className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
										rows={3}
										{...register("description")}
									/>
								</AdminFormField>

								<AdminFormField label="Địa điểm" error={(errors as any).location?.message}>
									<input
										type="text"
										className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
										{...register("location")}
									/>
								</AdminFormField>
							</div>

							<div className="space-y-4">
								<AdminFormField label="Ảnh bìa">
									<div className="mt-2 flex items-center gap-4">
										<div className="hover:border-stem-blue relative flex h-70 w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:bg-blue-50/30">
											{isUploadingImage ? (
												<div className="flex flex-col items-center gap-2">
													<Loader2 size={32} className="text-stem-blue animate-spin" />
													<span className="text-xs font-bold text-slate-500">Đang tải ảnh...</span>
												</div>
											) : imageUrl ? (
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
												disabled={isUploadingImage}
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
												src={profile?.avatar_url || "https://images.unsplash.com/photo-1543269865-cbf427effbad"}
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

						<AdminFormField label="Nội dung chi tiết" error={(errors as any).content?.message}>
							<div className="quill-editor-container">
								<ReactQuill
									ref={quillRef}
									theme="snow"
									value={contentValue}
									onChange={(content: string) => setValue("content", content)}
									modules={modules}
									formats={formats}
									className="mb-12 h-64"
								/>
							</div>
						</AdminFormField>
					</>
				)}

				{/* ── TAB 2: VIDEO YOUTUBE ── */}
				{activeTab === "video" && (
					<div className="space-y-5">
						<AdminFormField
							label="Link hoặc ID YouTube"
							error={(errors as any).youtube_id?.message}
							required
						>
							<div className="relative mt-1">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
									<Link size={14} />
								</div>
								<input
									type="text"
									placeholder="https://youtu.be/... hoặc nhập thẳng ID"
									className="block w-full rounded-xl border-slate-200 bg-slate-50 py-2.5 pr-4 pl-9 text-sm"
									value={youtubeInput}
									onChange={handleYoutubeInputChange}
								/>
							</div>
							{youtubePreviewId && (
								<p className="mt-1 text-[11px] text-slate-400">
									ID đã nhận:{" "}
									<span className="font-mono font-bold text-slate-700">{youtubePreviewId}</span>
								</p>
							)}
						</AdminFormField>

						{/* YouTube preview */}
						{youtubePreviewId ? (
							<div className="overflow-hidden rounded-2xl border border-slate-200 bg-black">
								<div className="relative aspect-video w-full">
									<Image
										src={`https://img.youtube.com/vi/${youtubePreviewId}/hqdefault.jpg`}
										alt="YouTube thumbnail preview"
										fill
										className="object-cover opacity-80"
										unoptimized
									/>
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-xl">
											<svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white">
												<path d="M8 5v14l11-7z" />
											</svg>
										</div>
									</div>
									<div className="absolute right-3 bottom-3">
										<span className="rounded-md bg-black/70 px-2 py-0.5 text-xs font-bold text-white">
											Preview
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className="flex aspect-video w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
								<div className="flex flex-col items-center gap-2 text-slate-400">
									<Youtube size={32} />
									<span className="text-xs font-semibold">Nhập link để xem preview</span>
								</div>
							</div>
						)}

						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							<div className="space-y-4">
								<AdminFormField label="Tiêu đề video" error={(errors as any).title?.message} required>
									<input
										type="text"
										className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
										{...register("title")}
									/>
								</AdminFormField>

								{commonFields}
							</div>

							<div className="space-y-4">
								<AdminFormField label="Mô tả ngắn" error={(errors as any).description?.message}>
									<textarea
										className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
										rows={4}
										placeholder="Mô tả ngắn về video (không bắt buộc)"
										{...register("description")}
									/>
								</AdminFormField>

								<div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
									<p className="mb-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
										Thông tin người đăng
									</p>
									<div className="flex items-center gap-3">
										<div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
											<Image
												src={profile?.avatar_url || "https://images.unsplash.com/photo-1543269865-cbf427effbad"}
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
					</div>
				)}

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
						{isSubmitting ? "Đang lưu..." : "Lưu"}
					</button>
				</div>
			</form>
		</AdminModal>
	);
};
