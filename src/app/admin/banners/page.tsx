import { createClient } from "@/lib/supabase/server";
import PageContent from "./_page-content";

export const metadata = {
  title: "Quản lý Banner | Admin",
  description: "Trang quản trị banners",
};

export default async function BannersPage() {
	const supabase = await createClient();

	const { data: banners } = await supabase
		.from("banners")
		.select("*")
		.order("display_order", { ascending: true });

	return (
		<>
			<PageContent initialBanners={banners || []} />
		</>
	);
}
