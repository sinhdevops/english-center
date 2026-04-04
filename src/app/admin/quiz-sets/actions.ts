"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

type ActionResult<T = void> = { success: true; data?: T } | { success: false; error: string };

const createQuizSetSchema = z.object({
	id: z.string().min(1, "ID không được để trống"),
	title: z.string().min(1, "Tiêu đề không được để trống"),
	age_group: z.string().min(1, "Nhóm tuổi không được để trống"),
	duration_seconds: z.number().positive("Thời gian không hợp lệ"),
});

const updateQuizSetSchema = z.object({
	title: z.string().optional(),
	age_group: z.string().optional(),
	duration_seconds: z.number().positive().optional(),
	is_active: z.boolean().optional(),
});

const createQuizQuestionSchema = z.object({
	quiz_set_id: z.string().min(1, "ID bài thi không được để trống"),
	question_order: z.number().positive("Thứ tự không hợp lệ"),
	text: z.string().min(1, "Câu hỏi không được để trống"),
	options: z.array(z.string()).min(2, "Ít nhất 2 đáp án"),
	correct_answer: z.number().min(0, "Đáp án đúng không hợp lệ"),
	option_type: z.enum(["text", "image"]).optional(),
	option_images: z.array(z.string()).nullable().optional(),
});

const updateQuizQuestionSchema = z.object({
	question_order: z.number().positive().optional(),
	text: z.string().optional(),
	options: z.array(z.string()).min(2).optional(),
	correct_answer: z.number().min(0).optional(),
	option_type: z.enum(["text", "image"]).optional(),
	option_images: z.array(z.string()).nullable().optional(),
});

// --- Quiz Set actions ---

export async function createQuizSet(data: {
	id: string;
	title: string;
	age_group: string;
	duration_seconds: number;
}): Promise<ActionResult> {
	try {
		const parsed = createQuizSetSchema.safeParse(data);
		if (!parsed.success) return { success: false, error: "Dữ liệu không hợp lệ" };

		const supabase = await createClient();
		const { error } = await supabase.from("quiz_sets").insert(parsed.data);
		if (error) {
			console.error("[createQuizSet]", error);
			return { success: false, error: "Không thể tạo bộ đề thi" };
		}
		revalidatePath("/admin/quiz-sets");
		return { success: true };
	} catch (err) {
		return { success: false, error: "Lỗi hệ thống" };
	}
}

export async function updateQuizSet(
	id: string,
	data: { title?: string; age_group?: string; duration_seconds?: number; is_active?: boolean },
): Promise<ActionResult> {
	try {
		if (!id) return { success: false, error: "ID không hợp lệ" };
		const parsed = updateQuizSetSchema.safeParse(data);
		if (!parsed.success) return { success: false, error: "Dữ liệu không hợp lệ" };

		const supabase = await createClient();
		const { error } = await supabase.from("quiz_sets").update(parsed.data).eq("id", id);
		if (error) {
			console.error("[updateQuizSet]", error);
			return { success: false, error: "Cập nhật bộ đề thất bại" };
		}
		revalidatePath("/admin/quiz-sets");
		return { success: true };
	} catch (err) {
		return { success: false, error: "Lỗi hệ thống" };
	}
}

export async function deleteQuizSet(id: string): Promise<ActionResult> {
	try {
		if (!id) return { success: false, error: "ID không hợp lệ" };
		const supabase = await createClient();
		const { error } = await supabase.from("quiz_sets").delete().eq("id", id);
		if (error) {
			console.error("[deleteQuizSet]", error);
			return { success: false, error: "Xóa bộ đề thất bại" };
		}
		revalidatePath("/admin/quiz-sets");
		return { success: true };
	} catch (err) {
		return { success: false, error: "Lỗi hệ thống" };
	}
}

// --- Quiz Question actions ---

export async function createQuizQuestion(data: {
	quiz_set_id: string;
	question_order: number;
	text: string;
	options: string[];
	correct_answer: number;
	option_type?: "text" | "image";
	option_images?: string[] | null;
}): Promise<ActionResult> {
	try {
		const parsed = createQuizQuestionSchema.safeParse(data);
		if (!parsed.success) return { success: false, error: "Dữ liệu không hợp lệ" };

		const supabase = await createClient();
		const { error } = await supabase.from("quiz_questions").insert(parsed.data);
		if (error) {
			console.error("[createQuizQuestion]", error);
			return { success: false, error: "Thêm câu hỏi thất bại" };
		}
		revalidatePath("/admin/quiz-sets");
		return { success: true };
	} catch (err) {
		return { success: false, error: "Lỗi hệ thống" };
	}
}

export async function updateQuizQuestion(
	id: number,
	data: {
		question_order?: number;
		text?: string;
		options?: string[];
		correct_answer?: number;
		option_type?: "text" | "image";
		option_images?: string[] | null;
	},
): Promise<ActionResult> {
	try {
		if (!id) return { success: false, error: "ID không hợp lệ" };
		const parsed = updateQuizQuestionSchema.safeParse(data);
		if (!parsed.success) return { success: false, error: "Dữ liệu không hợp lệ" };

		const supabase = await createClient();
		const { error } = await supabase.from("quiz_questions").update(parsed.data).eq("id", id);
		if (error) {
			console.error("[updateQuizQuestion]", error);
			return { success: false, error: "Cập nhật câu hỏi thất bại" };
		}
		revalidatePath("/admin/quiz-sets");
		return { success: true };
	} catch (err) {
		return { success: false, error: "Lỗi hệ thống" };
	}
}

export async function uploadQuizImage(formData: FormData): Promise<string> {
	const file = formData.get("file") as File;
	if (!file || file.size === 0) throw new Error("No file provided");

	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	const arrayBuffer = await file.arrayBuffer();
	const base64 = Buffer.from(arrayBuffer).toString("base64");
	const dataUri = `data:${file.type};base64,${base64}`;

	const result = await cloudinary.uploader.upload(dataUri, {
		folder: "quiz-images",
	});

	return result.secure_url;
}

export async function deleteQuizQuestion(id: number): Promise<ActionResult> {
	try {
		if (!id) return { success: false, error: "ID không hợp lệ" };
		const supabase = await createClient();
		const { error } = await supabase.from("quiz_questions").delete().eq("id", id);
		if (error) {
			console.error("[deleteQuizQuestion]", error);
			return { success: false, error: "Xóa câu hỏi thất bại" };
		}
		revalidatePath("/admin/quiz-sets");
		return { success: true };
	} catch (err) {
		return { success: false, error: "Lỗi hệ thống" };
	}
}
