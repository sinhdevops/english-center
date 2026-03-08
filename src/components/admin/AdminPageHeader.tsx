import React from "react";
import { Plus } from "lucide-react";

interface AdminPageHeaderProps {
	title: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
	icon?: React.ReactNode;
}

export const AdminPageHeader = ({
	title,
	description,
	actionLabel,
	onAction,
	icon = <Plus size={18} className="mr-2" />,
}: AdminPageHeaderProps) => {
	return (
		<div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div>
				<h1 className="text-2xl font-bold text-slate-900">{title}</h1>
				{description && <p className="text-sm text-slate-500">{description}</p>}
			</div>
			{actionLabel && onAction && (
				<button
					onClick={onAction}
					className="bg-stem-blue hover:bg-opacity-90 flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all active:scale-95"
				>
					{icon}
					{actionLabel}
				</button>
			)}
		</div>
	);
};
