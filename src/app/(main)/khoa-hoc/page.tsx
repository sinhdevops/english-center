import React from "react";
import { createClient } from "@/utils/supabase/server";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage() {
	const supabase = await createClient();

	const { data } = await supabase
		.from("programs")
		.select("*")
		.order("created_at", { ascending: true });

	const mappedCourses = (data || []).map((p, index) => ({
		id: p.id,
		stt: index + 1,
		title: p.name,
		description: p.description || "Làm quen với lập trình và robot, khơi gợi tư duy công nghệ, sáng tạo và kỹ năng.",
		duration: p.duration || "6 tháng",
		schedule: p.schedule || "Thứ 2, 4, 6",
	}));

	return <CoursesClient initialCourses={mappedCourses} />;
}
