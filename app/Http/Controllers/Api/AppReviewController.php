<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AppReview;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppReviewController extends Controller
{
    /**
     * Display a listing of the application reviews.
     */
    public function index(): JsonResponse
    {
        $reviews = AppReview::with('user:id,name,avatar,phone')
            ->latest()
            ->paginate(15);
            
        return response()->json($reviews);
    }

    /**
     * Store a newly created application review.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'reviewer_name' => ['required', 'string', 'max:255'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string'],
        ]);

        $review = AppReview::create([
            'reviewer_name' => $request->reviewer_name,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'user_id' => auth('sanctum')->id(), // Works for both authenticated API calls or null if guest
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Review submitted successfully',
            'review' => $review,
        ], 201);
    }
}
