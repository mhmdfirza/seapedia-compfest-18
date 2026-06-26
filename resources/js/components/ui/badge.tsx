import React from 'react';
import { cn } from 'res/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'neutral';
}

export default function Badge({ children, className, variant = 'primary', ...props }: BadgeProps) {
    const variants = {
        primary: "bg-primary-light text-primary-dark font-medium",
        secondary: "bg-orange-100 text-secondary font-medium",
        danger: "bg-red-100 text-danger font-medium",
        neutral: "bg-neutral-light text-neutral-medium font-medium",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs transition-colors",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}