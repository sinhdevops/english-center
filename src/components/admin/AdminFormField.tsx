import React from "react";
import { cn } from "@/lib/utils";

interface AdminFormFieldProps {
	label: string;
	error?: string;
	required?: boolean;
	children: React.ReactNode;
	className?: string;
}

export const AdminFormField = ({ label, error, required, children, className }: AdminFormFieldProps) => {
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<label className="flex items-center gap-1 text-sm font-semibold text-slate-700">
				{label}
				{required && <span className="text-rose-500">*</span>}
			</label>
			{children}
			{error && <span className="text-xs font-medium text-rose-500">{error}</span>}
		</div>
	);
};
