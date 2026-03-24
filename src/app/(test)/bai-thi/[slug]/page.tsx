import PageContent from "./_page-content";
import { supabase } from "@/lib/supabase-client";

export default async function QuizPage({ params }: { params: { slug: string } }) {
	const { slug } = await params;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	let initialRecord = null;
	if (user) {
		const { data } = await supabase
			.from("quiz_results")
			.select("id, status, score, answers, current_question_index, time_left, parent_phone")
			.eq("user_id", user.id)
			.eq("quiz_slug", slug)
			.maybeSingle();
		initialRecord = data;
	}

	async function createQuizRecord(
		userId: string,
		userEmail: string | null,
		phone: string,
		quizSlug: string,
		totalQuestions: number,
		defaultTime: number,
	) {
		const { data, error } = await supabase
			.from("quiz_results")
			.insert({
				user_id: userId,
				user_email: userEmail,
				parent_phone: phone,
				quiz_slug: quizSlug,
				total_questions: totalQuestions,
				status: "in_progress",
				time_left: defaultTime,
			})
			.select("id")
			.single();
		return { data, error };
	}

	async function updateQuizRecord(
		recordId: string,
		score: number,
		completedCount: number,
		answers: Record<number, number>,
	) {
		await supabase
			.from("quiz_results")
			.update({
				score,
				completed_count: completedCount,
				answers,
				status: "completed",
				completed_at: new Date().toISOString(),
			})
			.eq("id", recordId);
	}

	return (
		<PageContent
			slug={slug}
			initialRecord={initialRecord}
			createQuizRecord={createQuizRecord}
			updateQuizRecord={updateQuizRecord}
		/>
	);
}
