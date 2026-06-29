<?php

namespace App\Services;

use App\Models\AppReview;

class AppReviewService
{
    public function getReviews($perPage = 10)
    {
        $reviews = AppReview::latest()->paginate($perPage);
        $averageRating = AppReview::avg('rating') ?? 0;
        $totalCount = AppReview::count();

        return [
            'reviews' => $reviews,
            'average_rating' => round((float)$averageRating, 1),
            'total_count' => $totalCount,
        ];
    }

    public function createReview(array $data, string $ip): AppReview
    {
        $data['ip_address'] = $ip;
        
        if (auth()->check()) {
            $data['user_id'] = auth()->id();
        }

        return AppReview::create($data);
    }
}
