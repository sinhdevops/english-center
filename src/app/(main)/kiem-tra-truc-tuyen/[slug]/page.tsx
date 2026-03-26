import { createClient } from "@/utils/supabase/server";
import PageContent from "./_page-content";

export default async function TestOnlineDetailPage({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { nhom?: string };
}) {
	const { slug } = await params;
	const { nhom } = await searchParams;
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: quizSets } = await supabase
		.from("quiz_sets")
		.select("id, title, age_group, duration_seconds, is_active")
		.eq("is_active", true)
		.order("created_at", { ascending: true });

	const sets = quizSets || [];

	// Pre-fetch quiz results for all quiz sets
	let quizResults: Record<string, { status: string; score: number | null }> = {};
	if (user && sets.length > 0) {
		const slugs = sets.map((s) => s.id);
		const { data } = await supabase
			.from("quiz_results")
			.select("quiz_slug, status, score")
			.eq("user_id", user.id)
			.in("quiz_slug", slugs);

		if (data) {
			quizResults = Object.fromEntries(data.map((r) => [r.quiz_slug, { status: r.status, score: r.score }]));
		}
	}

	return <PageContent slug={slug} initialTab={nhom} quizSets={sets} quizResults={quizResults} />;
}
