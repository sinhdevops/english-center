import type { Metadata } from "next";
import dynamic from "next/dynamic";
import BannerSwiper from "@/components/pages/home/banner-swiper";
import ThinkingSection from "@/components/pages/home/thinking-section";
import AboutSection from "@/components/pages/home/about-section";
import Programs from "@/components/pages/home/programs";
import ExclusiveModel from "@/components/pages/home/exclusive-model";
import FlexibleLearning from "@/components/pages/home/flexible-learning";
import { createClient } from "@/utils/supabase/server";

const Teachers = dynamic(() => import("@/components/pages/home/teachers"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/pages/home/testimonials"), { ssr: true });
const News = dynamic(() => import("@/components/pages/home/news"), { ssr: true });
const Partners = dynamic(() => import("@/components/pages/home/partners"), { ssr: true });
const RegistrationSection = dynamic(() => import("@/components/pages/home/registration-section"), { ssr: true });

export const metadata: Metadata = {
	title: "STEMKey - Tư duy – Ngôn ngữ – Công nghệ",
	description:
		"Hệ thống giáo dục STEMKey phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ với phương pháp R.I.P.L độc quyền.",
	keywords: ["STEMKey", "English Center", "Robotics", "Toán tư duy", "Tiếng Anh cho bé"],
	openGraph: {
		title: "STEMKey - Phát triển toàn diện cho trẻ",
		description: "Khám phá lộ trình học tập hiện đại tại STEMKey.",
		images: ["/statics/images/hero-student.png"],
	},
};

export default async function HomePage() {
	const supabase = await createClient();

	const { data: newsItems } = await supabase
		.from("events")
		.select("*")
		.eq("category", "Tin tức")
		.order("date", { ascending: false })
		.limit(6);

	const { data: testimonialItems } = await supabase
		.from("events")
		.select("*")
		.eq("category", "Góc ba mẹ")
		.order("date", { ascending: false })
		.limit(9);

	const { data: banners } = await supabase
		.from("banners")
		.select("*")
		.eq("is_active", true)
		.order("display_order", { ascending: true });

	return (
		<main className="overflow-x-hidden">
			<BannerSwiper banners={banners || []} />
			<ThinkingSection />
			<div className="my-15 lg:my-20 flex flex-col gap-15 lg:gap-20">
				<AboutSection />
				<Programs />
				<FlexibleLearning />
				<Teachers />
				<Testimonials items={testimonialItems || []} />
				<News initialNews={newsItems || []} />
				<Partners />
			</div>
		</main>
	);
}
