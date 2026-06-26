import React from 'react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
    rating: number;
    count?: number;
    className?: string;
};

export default function StarRating({ rating, count, className }: StarRatingProps) {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className="flex text-yellow-400 text-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
            </div>
            <span className="text-xs text-neutral-medium">{rating.toFixed(1)}</span>
            {count !== undefined && (
                <span className="text-xs text-neutral-medium">({count.toLocaleString()})</span>
            )}
        </div>
    );
}