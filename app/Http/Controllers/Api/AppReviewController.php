<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AppReviewRequest;
use App\Services\AppReviewService;
use Illuminate\Http\Request;

class AppReviewController extends Controller
{
    public function __construct(protected AppReviewService $appReviewService)
    {
    }

    /**
     * @OA\Get(
     *     path="/api/v1/app-reviews",
     *     summary="Get app reviews",
     *     @OA\Response(response=200, description="App reviews lists")
     * )
     */
    public function index(Request $request)
    {
        return response()->json($this->appReviewService->getReviews($request->get('limit', 10)));
    }

    /**
     * @OA\Post(
     *     path="/api/v1/app-reviews",
     *     summary="Create an app review",
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="reviewer_name", type="string"),
     *             @OA\Property(property="rating", type="integer"),
     *             @OA\Property(property="comment", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Review created")
     * )
     */
    public function store(AppReviewRequest $request)
    {
        $review = $this->appReviewService->createReview($request->validated(), $request->ip());

        return response()->json([
            'success' => true,
            'data' => $review
        ], 201);
    }
}
