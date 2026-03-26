import { createClient } from "@/utils/supabase/server";
import PageContent from "./_page-content";

const AGE_GROUP_MAP: Record<string, string> = {
	"3-4-tuoi": "3-4 tuổi",
	"4-5-tuoi": "4-5 tuổi",
	"5-6-tuoi": "5-6 tuổi",
	"tieu-hoc": "Tiểu học",
};

export default async function TestOnlineDetailPage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ nhom?: string }>;
}) {
	const { slug } = await params;
	const { nhom } = await searchParams;
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Resolve age_group from nhom param, fallback to first group
	const ageGroup = AGE_GROUP_MAP[nhom ?? ""] ?? "3-4 tuổi";

	const { data: quizSets } = await supabase
		.from("quiz_sets")
		.select("id, title, age_group, duration_seconds, is_active, quiz_questions(id)")
		.eq("age_group", ageGroup)
		.eq("is_active", true)
		.order("created_at", { ascending: true });

	// Chỉ hiển thị quiz sets có ít nhất 1 câu hỏi
	const sets = (quizSets || []).filter((s: any) => s.quiz_questions?.length > 0);

	// Pre-fetch quiz results for all quiz sets in this group
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
