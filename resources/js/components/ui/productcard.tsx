import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import StarRating from './starrating';

export type ProductCardProps = {
    id: string | number;
    image: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    sold?: number;
    location?: string;
    sellerName?: string;
    badge?: string;
    className?: string;
};

function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}

export default function ProductCard({
    id, image, title, price, originalPrice, rating = 0, sold, location, badge, className
}: ProductCardProps) {
    const discountPercent = originalPrice ? Math.round((1 - price / originalPrice) * 100) : null;

    return (
        <Link href={`/products/${id}`}>
            <div className={cn(
                "group rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer",
                className
            )}>
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-neutral-light">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/300x300/F3F4F6/6B7280?text=No+Image')}
                    />
                    {discountPercent && (
                        <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-1.5 py-0.5 rounded">
                            {discountPercent}%
                        </div>
                    )}
                    {badge && !discountPercent && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded">
                            {badge}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-3">
                    <h3 className="text-sm text-neutral-dark leading-snug line-clamp-2 mb-1.5">
                        {title}
                    </h3>
                    <p className="text-base font-bold text-neutral-dark mb-1">
                        {formatPrice(price)}
                    </p>
                    {originalPrice && (
                        <p className="text-xs text-neutral-medium line-through mb-1">
                            {formatPrice(originalPrice)}
                        </p>
                    )}
                    {rating > 0 && (
                        <div className="flex items-center justify-between mt-1.5">
                            <StarRating rating={rating} />
                            {sold !== undefined && (
                                <span className="text-xs text-neutral-medium">{sold.toLocaleString()} terjual</span>
                            )}
                        </div>
                    )}
                    {location && (
                        <p className="text-xs text-neutral-medium mt-1.5">📍 {location}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}