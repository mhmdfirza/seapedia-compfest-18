<?php

namespace App\Http\Controllers;

/**
 * @OA\Schema(
 *     schema="RoleResource",
 *     title="RoleResource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="display_name", type="string"),
 *     @OA\Property(property="description", type="string")
 * )
 *
 * @OA\Schema(
 *     schema="UserResource",
 *     title="UserResource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string"),
 *     @OA\Property(property="phone", type="string", nullable=true),
 *     @OA\Property(property="avatar", type="string", nullable=true),
 *     @OA\Property(property="roles", type="array", @OA\Items(ref="#/components/schemas/RoleResource")),
 *     @OA\Property(property="active_role", type="string", nullable=true),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 *
 * @OA\Schema(
 *     schema="AppReviewResource",
 *     title="AppReviewResource",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="reviewer_name", type="string"),
 *     @OA\Property(property="rating", type="integer"),
 *     @OA\Property(property="comment", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 *
 * @OA\Schema(
 *     schema="TokenResponse",
 *     title="TokenResponse",
 *     @OA\Property(property="access_token", type="string"),
 *     @OA\Property(property="token_type", type="string"),
 *     @OA\Property(property="user", ref="#/components/schemas/UserResource")
 * )
 */
abstract class Controller
{
    //
}
