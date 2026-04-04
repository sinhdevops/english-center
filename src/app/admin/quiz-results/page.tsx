import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Kết quả bài test | Admin",
  description: "Trang quản trị quiz-results",
};

export default async function QuizResultsPage() {
	const supabase = await createClient();

	const { data: results } = await supabase
		.from("quiz_results")
		.select("*")
		.eq("status", "completed")
		.order("completed_at", { ascending: false });

	return <PageContent initialResults={results || []} />;
}
