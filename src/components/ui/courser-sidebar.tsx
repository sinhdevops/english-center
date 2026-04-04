import { createClient } from "@/lib/supabase/server";
import CourserSidebarContent from "./courser-sidebar-content";

export const CourserSidebar = async () => {
	const supabase = await createClient();
	const { data: programs } = await supabase
		.from("programs")
		.select("id, name, image_url")
		.order("created_at", { ascending: true });

	return <CourserSidebarContent programs={programs || []} />;
};

export default CourserSidebar;
