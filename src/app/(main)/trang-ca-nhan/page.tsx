import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProfilePageContent from "./_page-content";
import type { QuizResult } from "@/lib/types";

export default async function ProfilePage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/dang-nhap");
	}

	const { data: quizResults } = await supabase
		.from("quiz_results")
		.select("*")
		.eq("user_id", user.id)
		.eq("status", "completed")
		.order("completed_at", { ascending: false });

	return <ProfilePageContent quizResults={(quizResults as QuizResult[]) ?? []} />;
}
