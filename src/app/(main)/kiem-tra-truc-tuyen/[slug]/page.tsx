import { createClient } from "@/utils/supabase/server";
import { QUIZ_SETS } from "@/constants";
import PageContent from "./_page-content";

export default async function TestOnlineDetailPage({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { nhom?: string };
}) {
	const { slug } = params;
	const { nhom } = searchParams;
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Pre-fetch quiz results for all quiz sets
	let quizResults: Record<string, { status: string; score: number | null }> = {};
	if (user) {
		const slugs = QUIZ_SETS.map((s) => s.id);
		const { data } = await supabase
			.from("quiz_results")
			.select("quiz_slug, status, score")
			.eq("user_id", user.id)
			.in("quiz_slug", slugs);

		if (data) {
			quizResults = Object.fromEntries(data.map((r) => [r.quiz_slug, { status: r.status, score: r.score }]));
		}
	}

	return <PageContent slug={slug} initialTab={nhom} quizResults={quizResults} />;
}
