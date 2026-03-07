import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/pages/home/hero";
import AboutSection from "@/components/pages/home/about-section";
import Programs from "@/components/pages/home/programs";
import ExclusiveModel from "@/components/pages/home/exclusive-model";
import FlexibleLearning from "@/components/pages/home/flexible-learning";

const Teachers = dynamic(() => import("@/components/pages/home/teachers"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/pages/home/testimonials"), { ssr: true });
const News = dynamic(() => import("@/components/pages/home/news"), { ssr: true });
const Partners = dynamic(() => import("@/components/pages/home/partners"), { ssr: true });
const RegistrationSection = dynamic(() => import("@/components/pages/home/registration-section"), { ssr: true });

export const metadata: Metadata = {
	title: "STEMKey - Tư duy – Ngôn ngữ – Công nghệ",
	description:
		"Hệ thống giáo dục STEMKey dành cho trẻ 4-10 tuổi, phát triển toàn diện Tư duy – Ngôn ngữ – Công nghệ với phương pháp R.I.P.L độc quyền.",
	keywords: ["STEMKey", "English Center", "Robotics", "Toán tư duy", "Tiếng Anh cho bé"],
	openGraph: {
		title: "STEMKey - Phát triển toàn diện cho trẻ",
		description: "Khám phá lộ trình học tập hiện đại tại STEMKey.",
		images: ["/statics/images/hero-student.png"],
	},
};

export default function HomePage() {
	return (
		<main className="overflow-x-hidden">
			<Hero />
			<AboutSection />
			<Programs />
			<ExclusiveModel />
			<FlexibleLearning />
			<Teachers />
			<Testimonials />
			<News />
			<Partners />
			<RegistrationSection />
		</main>
	);
}
