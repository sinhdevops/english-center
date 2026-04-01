import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
const buttonVariants = cva(
	"inline-flex items-center justify-center font-medium transition-all rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer",
	{
		variants: {
			variant: {
				primary:
					"bg-gradient-to-b from-[#1890FF] to-[#096DD9] text-white hover:brightness-110 active:scale-95",
				secondary:
					"bg-white text-slate-800 hover: active:scale-95",
				outline: "bg-transparent border border-stem-blue text-stem-blue hover:bg-stem-blue hover:text-white active:scale-95",
				ghost: "text-slate-700 hover:",
			},
			size: {
				sm: "px-4 py-1.5 text-base h-[40px]",
				md: "px-6 py-2.5 text-[17px] h-[48px]",
				lg: "px-10 py-4 text-[18px] h-[56px]",
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
