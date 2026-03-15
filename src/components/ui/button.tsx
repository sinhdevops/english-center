import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
const buttonVariants = cva(
	"inline-flex items-center justify-center font-medium transition-all rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer",
	{
		variants: {
			variant: {
				primary:
					"bg-gradient-to-b from-[#1890FF] to-[#096DD9] text-white shadow-[0_4px_14px_0_rgba(24,144,255,0.39)] hover:brightness-110 active:scale-95",
				secondary:
					"bg-white text-slate-800 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-slate-50 active:scale-95",
				outline: "bg-slate-50/50 font-medium backdrop-blur-md border border-slate-200 active:scale-95",
				ghost: "text-slate-700 hover:bg-slate-50",
			},
			size: {
				sm: "px-4 py-1.5 text-xs h-[40px]",
				md: "px-6 py-2.5 text-sm h-[48px]",
				lg: "px-10 py-4 text-base h-[56px]",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, size, className, children, ...props }) => {
	return (
		<button className={buttonVariants({ variant, size, className })} {...props}>
			{children}
		</button>
	);
};
