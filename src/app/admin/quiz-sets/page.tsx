import { createClient } from "@/utils/supabase/server";
import QuizSetsClient from "./QuizSetsClient";

export default async function QuizSetsPage() {
	const supabase = await createClient();

	const { data: quizSets } = await supabase
		.from("quiz_sets")
		.select("*, questions:quiz_questions(*)")
		.order("created_at", { ascending: true });

	return <QuizSetsClient initialQuizSets={quizSets || []} />;
}
