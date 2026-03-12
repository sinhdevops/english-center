import React from "react";
import { createClient } from "@/utils/supabase/server";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage() {
	const supabase = await createClient();

	const { data } = await supabase.from("programs").select("*").order("created_at", { ascending: true });

	const mappedCourses = (data || []).map((p) => ({
		id: p.id,
		title: p.name,
		image: p.image_url || "https://picsum.photos/seed/student1/600/450",
		description: p.description || "Lộ trình khóa học tại STEMKey",
		bullets: ["Khóa học chuẩn STEM", "Phương pháp R.I.P.L"],
		footer: "Phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ.",
	}));

	return <CoursesClient initialCourses={mappedCourses} />;
}
