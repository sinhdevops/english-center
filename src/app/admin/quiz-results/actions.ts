"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteQuizResult(id: string) {
	const supabase = await createClient();
	const { error } = await supabase.from("quiz_results").delete().eq("id", id);
	if (error) throw error;
	revalidatePath("/admin/quiz-results");
}
