"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
}) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_questions").insert(data);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
}

export async function updateQuizQuestion(
	id: number,
	data: { question_order?: number; text?: string; options?: string[]; correct_answer?: number },
) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_questions").update(data).eq("id", id);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
}

export async function deleteQuizQuestion(id: number) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_questions").delete().eq("id", id);
	if (error) throw error;
	revalidatePath("/admin/quiz-sets");
}
