import React, { forwardRef } from 'react';
import { cn } from 'res/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", error, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-neutral-medium focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-light disabled:opacity-50 transition-colors",
                    error ? "border-danger focus:ring-danger/50" : "focus:border-primary focus:ring-primary/50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export default Input;