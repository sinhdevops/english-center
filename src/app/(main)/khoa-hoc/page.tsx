import React from "react";
import { createClient } from "@/utils/supabase/server";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage() {
	const supabase = await createClient();

	const { data } = await supabase
		.from("courses")
		.select("*")
		.order("created_at", { ascending: true });

	const mappedCourses = (data || []).map((p, index) => ({
		id: p.id,
		stt: index + 1,
		title: p.name,
		description: p.description || "Khóa học chất lượng cao, giúp con khơi dậy niềm đam mê sáng tạo và tư duy toàn diện.",
		duration: p.duration || "6 tháng",
		schedule: p.schedule || "Đang cập nhật",
	}));

	return <CoursesClient initialCourses={mappedCourses} />;
}
