import React from 'react';
import { cn } from 'res/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button({
    children,
    className,
    variant = 'primary',
    size = 'md',
    ...props
}: ButtonProps) {
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-dark border border-transparent",
        outline: "bg-white text-primary border border-primary hover:bg-primary-light",
        ghost: "bg-transparent text-neutral-medium hover:bg-neutral-light hover:text-neutral-dark border-transparent",
        danger: "bg-danger text-white hover:bg-red-600 border border-transparent",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base font-semibold",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium w-max",
                sizes[size],
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}