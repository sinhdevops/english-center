import { createClient } from "@/utils/supabase/server";
import QuizResultsClient from "./QuizResultsClient";

export default async function QuizResultsPage() {
	const supabase = await createClient();

	const { data: results } = await supabase
		.from("quiz_results")
		.select("*")
		.eq("status", "completed")
		.order("completed_at", { ascending: false });

	return <QuizResultsClient initialResults={results || []} />;
}
