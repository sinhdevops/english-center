import React from "react";
import { createClient } from "@/utils/supabase/server";
import LichKhaiGiangClient from "./LichKhaiGiangClient";

export default async function LichKhaiGiangPage() {
	const supabase = await createClient();

	const { data: branches } = await supabase.from("branches").select("*");
	const { data: schedules } = await supabase
		.from("schedules")
		.select(
			`
			*,
			course:courses(
				name,
				program:programs(name)
			)
		`,
		)
		.eq("status", "open")
		.order("start_date", { ascending: true });

	return <LichKhaiGiangClient initialBranches={branches || []} initialSchedules={(schedules as any) || []} />;
}
