import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Quản lý Cơ sở | Admin",
  description: "Trang quản trị branches",
};

export default async function BranchesPage() {
	const supabase = await createClient();

	const { data: branches } = await supabase.from("branches").select("*").order("name");

	return (
		<>
			<PageContent initialBranches={branches || []} />
		</>
	);
}
