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

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<nav className="flex" aria-label="Breadcrumb">
				<ol className="flex items-center space-x-2 md:space-x-4">
					<li>
						<div>
							<Link
								href="/"
								className={`${
									variant === "light"
										? "text-white/60 hover:text-white"
										: "text-slate-400 hover:text-slate-600"
								} transition-colors`}
							>
								<Home size={18} />
								<span className="sr-only">Trang chủ</span>
							</Link>
						</div>
					</li>
					{items.map((item, index) => (
						<li key={index}>
							<div className="flex items-center">
								<ChevronRight
									size={16}
									className={`${variant === "light" ? "text-white/40" : "text-slate-300"} shrink-0`}
								/>
								{item.href && !item.active ? (
									<Link
										href={item.href}
										className={`ml-2 text-sm font-medium md:ml-4 ${
											variant === "light"
												? "text-white/60 hover:text-white"
												: "text-slate-400 hover:text-slate-600"
										} transition-colors`}
									>
										{item.label}
									</Link>
								) : (
									<span
										className={`ml-2 text-sm font-bold md:ml-4 ${
											variant === "light" ? "text-white" : "text-slate-900"
										}`}
										aria-current={item.active ? "page" : undefined}
									>
										{item.label}
									</span>
								)}
							</div>
						</li>
					))}
				</ol>
			</nav>
		</>
	);
};
