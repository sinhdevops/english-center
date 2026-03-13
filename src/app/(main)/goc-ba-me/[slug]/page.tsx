"use client";

import ContentDetailPage from "@/components/pages/shared/content-detail-page";
import { useParams } from "next/navigation";

export default function ParentsCornerDetailPage() {
	const { slug } = useParams();

	const breadcrumbItems = [
		{ label: "Trang chủ", href: "/" },
		{ label: "Góc ba mẹ", href: "/goc-ba-me" },
		{ label: decodeURIComponent(slug as string), active: true },
	];

	return (
		<ContentDetailPage
			article={{ title: decodeURIComponent(slug as string), date: new Date().toLocaleDateString("vi-VN") }}
			typeLabel="chia sẻ"
			breadcrumbItems={breadcrumbItems}
		/>
	);
}
