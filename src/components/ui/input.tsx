import { LucideIcon } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
	"w-full border bg-white px-4 rounded-xl transition-all focus:ring-4 focus:outline-none text-slate-900 placeholder:text-slate-400",
	{
		variants: {
			size: {
				sm: "h-[40px] py-1.5 text-sm",
				lg: "h-[48px] py-3 text-base",
			},
			status: {
				default: "border-slate-200 focus:border-blue-500 focus:ring-blue-50/50",
				error: "border-red-500 focus:ring-red-100 ring-red-100",
			},
		},
		defaultVariants: {
			size: "lg",
			status: "default",
		},
	},
);

interface InputValidationProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	name: string;
	label?: string;
	icon?: LucideIcon;
}
export const InputValidation: React.FC<InputValidationProps> = ({ name, label, icon: Icon, size = "lg", ...props }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const error = errors[name];

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="flex w-full flex-col gap-1.5">
					{label && (
						<label htmlFor={name} className="ml-1 text-sm font-medium text-slate-700">
							{label}
						</label>
					)}
					<div className="group relative">
						{Icon && (
							<div className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500">
								<Icon size={18} />
							</div>
						)}
						<input
							{...field}
							{...props}
							id={name}
							className={inputVariants({
								size,
								status: error ? "error" : "default",
								className: Icon ? "pl-11" : "pl-4",
							})}
						/>
					</div>
					{error && (
						<p className="animate-in fade-in slide-in-from-top-1 ml-1 text-xs font-medium text-red-500">
							{error.message as string}
						</p>
					)}
				</div>
			)}
		/>
	);
};
