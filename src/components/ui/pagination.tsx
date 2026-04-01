"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	if (totalPages <= 1) return null;

	const renderPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "...", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
			}
		}

		return pages.map((page, index) => {
			if (page === "...") {
				return (
					<span key={`dots-${index}`} className="flex h-10 w-10 items-center justify-center text-slate-400">
						...
					</span>
				);
			}

			const isCurrent = page === currentPage;

			return (
				<Link
					key={page}
					href={createPageURL(page)}
					className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all ${isCurrent
							? "bg-stem-blue text-white"
							: " text-slate-600 hover:bg-slate-100 hover:text-slate-900"
						}`}
				>
					{page}
				</Link>
			);
		});
	};

	return (
		<nav className="mt-12 flex items-center justify-center gap-2">
			<Link
				href={createPageURL(Math.max(1, currentPage - 1))}
				className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 transition-all hover: ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""
					}`}
			>
				<ChevronLeft size={18} />
			</Link>

			<div className="flex items-center gap-2">{renderPageNumbers()}</div>

			<Link
				href={createPageURL(Math.min(totalPages, currentPage + 1))}
				className={`flex h-10 items-center justify-center rounded-xl border border-slate-100 bg-white px-4 text-sm font-bold text-slate-600 transition-all hover: ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
					}`}
			>
				<span>Trang sau</span>
				<ChevronRight size={18} className="ml-1" />
			</Link>
		</nav>
	);
};
