import React from "react";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
	label: string;
	href?: string;
	active?: boolean;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	variant?: "light" | "dark";
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, variant = "light" }) => {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.label,
			item: item.href ? `https://stemkey.vn${item.href}` : undefined,
		})),
	};

	const isLight = variant === "light";

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<nav aria-label="Breadcrumb">
				<ol
					className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm ${
						isLight
							? "border border-white/20 bg-white/10 backdrop-blur-sm"
							: "border border-slate-100 bg-white"
					}`}
				>
					{/* Home */}
					<li>
						<Link
							href="/"
							className={`flex items-center gap-1.5 font-medium transition-colors ${
								isLight ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-primary"
							}`}
						>
							<Home size={14} />
							<span className="sr-only">Trang chủ</span>
						</Link>
					</li>

					{/* Items */}
					{items.map((item, index) => (
						<li key={index} className="flex items-center gap-1">
							<ChevronRight
								size={13}
								className={`shrink-0 ${isLight ? "text-white/30" : "text-accent"}`}
							/>
							{item.href && !item.active ? (
								<Link
									href={item.href}
									className={`font-medium transition-colors ${
										isLight ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-primary"
									}`}
								>
									{item.label}
								</Link>
							) : (
								<span
									className={`font-bold ${isLight ? "text-white" : "text-primary"}`}
									aria-current={item.active ? "page" : undefined}
								>
									{item.label}
								</span>
							)}
						</li>
					))}
				</ol>
			</nav>
		</>
	);
};
