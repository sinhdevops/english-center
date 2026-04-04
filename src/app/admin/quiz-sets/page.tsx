import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Quản lý bài test | Admin",
  description: "Trang quản trị QuizSets",
};

export default async function QuizSetsPage() {
	const supabase = await createClient();

	const { data: quizSets } = await supabase
		.from("quiz_sets")
		.select("*, questions:quiz_questions(*)")
		.order("created_at", { ascending: true });

	return <PageContent initialQuizSets={quizSets || []} />;
}
