import React from 'react';
import { cn } from '@/lib/utils';

type SectionTitleProps = {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    className?: string;
    action?: React.ReactNode;
};

export default function SectionTitle({ title, subtitle, align = 'left', className, action }: SectionTitleProps) {
    return (
        <div className={cn("flex items-end justify-between mb-5", className)}>
            <div className={cn("space-y-1", align === 'center' && 'text-center w-full')}>
                <h2 className="font-display text-xl font-bold text-neutral-dark">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-sm text-neutral-medium">{subtitle}</p>
                )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    );
}