"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// --- Quiz Set actions ---

export async function createQuizSet(data: {
	id: string;
	title: string;
	age_group: string;
	duration_seconds: number;
}) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_sets").insert(data);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
}

export async function updateQuizSet(
	id: string,
	data: { title?: string; age_group?: string; duration_seconds?: number; is_active?: boolean },
) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_sets").update(data).eq("id", id);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
}

export async function deleteQuizSet(id: string) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_sets").delete().eq("id", id);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
}

// --- Quiz Question actions ---

export async function createQuizQuestion(data: {
	quiz_set_id: string;
	question_order: number;
	text: string;
	options: string[];
	correct_answer: number;
	option_type?: 'text' | 'image';
	option_images?: string[] | null;
}) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_questions").insert(data);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
}

export async function updateQuizQuestion(
	id: number,
	data: {
		question_order?: number;
		text?: string;
		options?: string[];
		correct_answer?: number;
		option_type?: 'text' | 'image';
		option_images?: string[] | null;
	},
) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_questions").update(data).eq("id", id);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
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

export async function deleteQuizQuestion(id: number) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_questions").delete().eq("id", id);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
}
