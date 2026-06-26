import React, { createContext, useContext, useState, ReactNode } from 'react';
import INITIAL_REVIEWS, { AppReview } from 'res/storage/dummy/review';

type ReviewContextType = {
    reviews: AppReview[];
    addReview: (review: Omit<AppReview, 'id' | 'date' | 'color'>) => void;
    averageRating: number;
};

const AVATAR_COLORS = [
    'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-cyan-500',
    'bg-violet-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500',
];

function randomColor() {
    return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

const ReviewContext = createContext<ReviewContextType | null>(null);

export function ReviewProvider({ children }: { children: ReactNode }) {
    const [reviews, setReviews] = useState<AppReview[]>(INITIAL_REVIEWS);

    const addReview = (review: Omit<AppReview, 'id' | 'date' | 'color'>) => {
        const newReview: AppReview = {
            ...review,
            id: Date.now(),
            date: 'Baru saja',
            color: randomColor(),
        };
        setReviews((prev) => [newReview, ...prev]);
    };

    const averageRating = reviews.length
        ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
        : 0;

    return (
        <ReviewContext.Provider value={{ reviews, addReview, averageRating }}>
            {children}
        </ReviewContext.Provider>
    );
}

export function useReviews() {
    const ctx = useContext(ReviewContext);
    if (!ctx) throw new Error('useReviews must be used within ReviewProvider');
    return ctx;
}
