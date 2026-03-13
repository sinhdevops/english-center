"use client";

import ContentDetailPage from "@/components/pages/shared/content-detail-page";
import { useParams } from "next/navigation";

export default function LearningCornerDetailPage() {
	const { slug } = useParams();

	const breadcrumbItems = [
		{ label: "Trang chủ", href: "/" },
		{ label: "Góc học tập", href: "/goc-hoc-tap" },
		{ label: slug as string, active: true },
	];

	return (
		<ContentDetailPage
			article={{ title: slug as string, date: new Date().toLocaleDateString("vi-VN") }}
			typeLabel="tài liệu"
			breadcrumbItems={breadcrumbItems}
		/>
	);
}
