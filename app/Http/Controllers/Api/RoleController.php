<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Switch the active role of the authenticated user.
     */
    public function switchRole(Request $request): JsonResponse
    {
        $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        $user = $request->user();

        if (! $user->roles()->where('name', $request->role)->exists()) {
            return response()->json([
                'message' => 'You do not have permission to switch to this role.',
            ], 403);
        }

        $user->activeRole()->updateOrCreate(
            ['user_id' => $user->id],
            ['active_role' => $request->role]
        );

        return response()->json([
            'message' => 'Active role switched successfully.',
            'active_role' => $request->role,
        ]);
    }
}
