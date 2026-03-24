import { createClient } from "@/utils/supabase/server";
import PageContent from "./_page-content";

export default async function QuizPage({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	const supabase = await createClient();

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

	return <PageContent slug={slug} initialRecord={initialRecord} />;
}
