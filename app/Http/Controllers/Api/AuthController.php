<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Role;
use App\Models\Store;
use App\Models\User;
use App\Models\UserActiveRole;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use OpenApi\Attributes as OA;

class AuthController extends Controller
{
    /**
     * Handle an incoming API registration request.
     */
    #[OA\Get(path: '/api/auth/me', description: 'Get authenticated user context', tags: ['Auth'])]
    #[OA\Response(response: 200, description: 'Success')]
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $role = Role::where('name', $request->role)->firstOrFail();
        $user->roles()->attach($role);

        UserActiveRole::create([
            'user_id' => $user->id,
            'active_role' => $role->name,
        ]);

        if ($role->name === 'seller' && $request->filled('store_name')) {
            Store::create([
                'user_id' => $user->id,
                'name' => $request->store_name,
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user->load(['roles', 'activeRole', 'store']),
            'token' => $token,
        ], 201);
    }

    /**
     * Handle an incoming API authentication request.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 401);
        }

        // Revoke existing tokens if you want single device login, or just create new one
        $user->tokens()->delete();

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user->load(['roles', 'activeRole', 'store']),
            'token' => $token,
        ]);
    }

    /**
     * Destroy an authenticated API session.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
