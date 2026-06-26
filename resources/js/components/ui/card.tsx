import React from 'react';
import { cn } from '@/lib/utils';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export default function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow duration-200",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
