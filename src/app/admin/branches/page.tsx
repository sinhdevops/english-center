import React from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import { createClient } from "@/utils/supabase/server";
import BranchesClient from "./BranchesClient";

export default async function BranchesPage() {
	const supabase = await createClient();

	const { data: branches } = await supabase.from("branches").select("*").order("name");

	return (
		<AdminLayout>
			<BranchesClient initialBranches={branches || []} />
		</AdminLayout>
	);
}
