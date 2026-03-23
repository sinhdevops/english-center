import { createClient } from "@/utils/supabase/server";
import BannersClient from "./BannersClient";

export default async function BannersPage() {
	const supabase = await createClient();

	const { data: banners } = await supabase
		.from("banners")
		.select("*")
		.order("display_order", { ascending: true });

	return (
		<>
			<BannersClient initialBanners={banners || []} />
		</>
	);
}
