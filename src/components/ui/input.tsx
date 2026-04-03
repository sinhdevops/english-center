import React, { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
	"w-full border bg-white px-4 rounded-xl transition-all focus:ring-4 focus:outline-none text-slate-900 placeholder:text-slate-400",
	{
		variants: {
			size: {
				sm: "h-[40px] py-1.5 text-sm",
				lg: "h-[40px] md:h-[48px] py-2 md:py-3 text-base",
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

// Props dùng chung cho cả Input thuần và InputValidation
export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	label?: string;
	icon?: LucideIcon;
	error?: string;
}

// UI thuần — không phụ thuộc react-hook-form, dùng được ở bất kỳ đâu
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ label, name, required, icon: Icon, size, error, ...props }, ref) => {
		return (
			<div className="flex w-full flex-col gap-1.5">
				{label && (
					<label htmlFor={name} className="ml-1 text-sm font-medium text-slate-700">
						{label}
						{required && <span className="ml-1 text-rose-500">*</span>}
					</label>
				)}
				<div className="group relative">
					{Icon && (
						<div className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500">
							<Icon size={18} />
						</div>
					)}
					<input
						ref={ref}
						id={name}
						{...props}
						className={inputVariants({
							size,
							status: error ? "error" : "default",
							className: Icon ? "pl-11" : "pl-4",
						})}
					/>
				</div>
				{error && (
					<p className="animate-in fade-in slide-in-from-top-1 ml-1 text-xs font-medium text-red-500">
						{error}
					</p>
				)}
			</div>
		)
	},
)
Input.displayName = "Input"

// Dành riêng cho react-hook-form — bọc Input bằng Controller
interface InputValidationProps extends Omit<InputProps, "error"> {
	name: string;
}

export const InputValidation: React.FC<InputValidationProps> = ({
	name,
	...props
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	const error = errors[name]

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Input
					{...props}
					{...field}
					name={name}
					error={error?.message as string | undefined}
				/>
			)}
		/>
	)
}
