import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-gradient-to-b from-[#1890FF] to-[#096DD9] text-white shadow-[0_4px_14px_0_rgba(24,144,255,0.39)] hover:brightness-110 active:scale-95',
    secondary: 'bg-white text-slate-800 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-slate-50 active:scale-95',
    outline: 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 active:scale-95',
    ghost: 'text-slate-700 hover:bg-slate-50'
  };
  
  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
