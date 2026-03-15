import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Search, LucideIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";

const selectVariants = cva(
	"flex w-full items-center justify-between rounded-xl border bg-white px-4 transition-all duration-200 focus:outline-none",
	{
		variants: {
			size: {
				sm: "h-[40px] py-1.5 text-sm",
				lg: "h-[48px] py-3 text-base",
			},
			status: {
				default: "border-slate-200 hover:border-slate-300",
				open: "border-blue-500 ring-4 ring-blue-50",
				error: "border-red-500 ring-red-50",
			},
		},
		defaultVariants: {
			size: "lg",
			status: "default",
		},
	},
);

interface SelectOption {
	label: string;
	value: string | number;
}

interface SelectValidationProps extends VariantProps<typeof selectVariants> {
	name: string;
	options: SelectOption[];
	placeholder?: string;
	label?: string;
	icon?: LucideIcon;
}

export const SelectValidation: React.FC<SelectValidationProps> = ({
	name,
	options,
	placeholder = "Chọn một mục...",
	label,
	icon: Icon,
	size = "lg",
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const containerRef = useRef<HTMLDivElement>(null);
	const error = errors[name];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange, onBlur } }) => {
				const selectedOption = options.find((opt) => String(opt.value) === String(value));
				const status = error ? "error" : isOpen ? "open" : "default";
				return (
					<div className="flex w-full flex-col gap-1.5" ref={containerRef}>
						{label && <label className="ml-1 text-sm font-medium text-slate-700">{label}</label>}

						<div className="relative">
							<button
								type="button"
								onBlur={onBlur}
								onClick={() => setIsOpen(!isOpen)}
								className={selectVariants({ size, status })}
							>
								<div className="flex items-center gap-3 truncate">
									{Icon && <Icon size={18} className={isOpen ? "text-blue-500" : "text-slate-400"} />}
									<span
										className={`truncate ${selectedOption ? "font-medium text-slate-900" : "text-slate-400"}`}
									>
										{selectedOption ? selectedOption.label : placeholder}
									</span>
								</div>
								<ChevronDown
									className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
										isOpen ? "rotate-180 text-blue-500" : ""
									}`}
								/>
							</button>

							{isOpen && (
								<div className="animate-in fade-in zoom-in-95 absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl duration-150">
									<div className="flex items-center gap-2 border-b border-slate-50 bg-slate-50/50 p-2">
										<Search className="h-4 w-4 text-slate-400" />
										<input
											className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
											placeholder="Tìm kiếm..."
											value={searchTerm}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												setSearchTerm(e.target.value)
											}
											autoFocus
										/>
									</div>

									<ul className="max-h-60 overflow-y-auto p-1 text-left">
										{filteredOptions.length > 0 ? (
											filteredOptions.map((option) => (
												<li
													key={option.value}
													onClick={() => {
														onChange(option.value);
														setIsOpen(false);
														setSearchTerm("");
													}}
													className={`group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
														String(value) === String(option.value)
															? "bg-blue-50 font-medium text-blue-700"
															: "text-slate-600 hover:bg-slate-50"
													}`}
												>
													<span>{option.label}</span>
													{String(value) === String(option.value) && (
														<Check className="h-4 w-4" />
													)}
												</li>
											))
										) : (
											<li className="px-3 py-4 text-center text-sm text-slate-400 italic">
												Không tìm thấy kết quả
											</li>
										)}
									</ul>
								</div>
							)}
						</div>
						{error && (
							<p className="animate-in fade-in slide-in-from-top-1 ml-1 text-xs font-medium text-red-500">
								{error.message as string}
							</p>
						)}
					</div>
				);
			}}
		/>
	);
};
