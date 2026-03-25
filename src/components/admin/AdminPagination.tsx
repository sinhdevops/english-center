"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface AdminPaginationProps {
	currentPage: number;
	totalPages: number;
}

export function AdminPagination({ currentPage, totalPages }: AdminPaginationProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	if (totalPages <= 1) return null;

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`${pathname}?${params.toString()}`);
	};

	const pages: (number | "...")[] = [];
	const maxVisible = 5;

	if (totalPages <= maxVisible) {
		for (let i = 1; i <= totalPages; i++) pages.push(i);
	} else if (currentPage <= 3) {
		pages.push(1, 2, 3, 4, "...", totalPages);
	} else if (currentPage >= totalPages - 2) {
		pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
	} else {
		pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
	}

	return (
		<nav className="mt-6 flex items-center justify-center gap-2">
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage <= 1}
				className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 transition-all hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
			>
				<ChevronLeft size={18} />
			</button>

			<div className="flex items-center gap-1">
				{pages.map((page, index) =>
					page === "..." ? (
						<span key={`dots-${index}`} className="flex h-10 w-10 items-center justify-center text-slate-400">
							...
						</span>
					) : (
						<button
							key={page}
							onClick={() => handlePageChange(page as number)}
							className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all ${
								page === currentPage
									? "bg-stem-blue text-white"
									: "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
							}`}
						>
							{page}
						</button>
					),
				)}
			</div>

			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage >= totalPages}
				className="flex h-10 items-center justify-center rounded-xl border border-slate-100 bg-white px-4 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
			>
				<span>Trang sau</span>
				<ChevronRight size={18} className="ml-1" />
			</button>
		</nav>
	);
}
