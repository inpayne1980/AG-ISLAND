// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'neumorphic';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'neumorphic', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-turquoise text-white hover:brightness-110 shadow-neu-sm active:shadow-neu-pressed",
    secondary: "bg-coral text-white hover:brightness-110 shadow-neu-sm active:shadow-neu-pressed",
    outline: "border-2 border-turquoise text-turquoise bg-transparent hover:bg-turquoise/5",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-neu-sm",
    ghost: "bg-transparent hover:bg-sand/50 text-slate-500",
    neumorphic: "neu-button text-slate-700 hover:text-turquoise active:text-coral"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 mr-2 text-current" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
};