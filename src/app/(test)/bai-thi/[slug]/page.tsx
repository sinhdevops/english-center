import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PageContent from "./_page-content";

export default async function QuizPage({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect("/dang-nhap");

	const { data: quizSet } = await supabase
		.from("quiz_sets")
		.select("*, questions:quiz_questions(*)")
		.eq("id", slug)
		.eq("is_active", true)
		.maybeSingle();

	if (!quizSet || !quizSet.questions?.length) notFound();

	// Sort questions by order
	quizSet.questions = quizSet.questions.sort(
		(a: { question_order: number }, b: { question_order: number }) =>
			a.question_order - b.question_order,
	);

	const { data: initialRecord } = await supabase
		.from("quiz_results")
		.select("id, status, score, answers, current_question_index, time_left, parent_phone")
		.eq("user_id", user.id)
		.eq("quiz_slug", slug)
		.maybeSingle();

	async function createQuizRecord(
		userId: string,
		userEmail: string | null,
		phone: string,
		quizSlug: string,
		totalQuestions: number,
		defaultTime: number,
	) {
		"use server";
		const sb = await createClient();
		const { data, error } = await sb
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
		"use server";
		const sb = await createClient();
		await sb
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
			userId={user.id}
			userEmail={user.email ?? null}
			quizSet={quizSet}
			initialRecord={initialRecord}
			createQuizRecord={createQuizRecord}
			updateQuizRecord={updateQuizRecord}
		/>
	);
}
