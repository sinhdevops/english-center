"use client";

import { User } from "lucide-react";

export function Header() {
	return (
		<header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
			<div className="flex items-center space-x-6">
				<div className="flex items-center space-x-3">
					<div className="hidden text-right sm:block">
						<p className="text-sm font-medium text-slate-900">Admin User</p>
						<p className="text-xs text-slate-500">Quản trị viên</p>
					</div>
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600">
						<User size={20} />
					</div>
				</div>
			</div>
		</header>
	);
}
