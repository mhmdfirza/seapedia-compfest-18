<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Role;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="SEAPEDIA API"
 * )
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_HOST,
 * )
 * @OA\SecurityScheme(
 *     type="http",
 *     scheme="bearer",
 *     securityScheme="BearerAuth",
 *     bearerFormat="JWT"
 * )
 */
class AuthController extends Controller
{
    public function __construct(protected AuthService $authService)
    {
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/register",
     *     summary="Register a new user",
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string"),
     *             @OA\Property(property="password_confirmation", type="string"),
     *             @OA\Property(property="phone", type="string"),
     *             @OA\Property(property="roles", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="store_name", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Successful registration")
     * )
     */
    public function register(RegisterRequest $request)
    {
        $user = $this->authService->register($request->validated());
        
        $token = $user->createToken('seapedia-api-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user->load('roles', 'activeRoleRecord')
            ]
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/login",
     *     summary="Login user",
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Successful login")
     * )
     */
    public function login(LoginRequest $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            
            if (!$user->isAdmin() && !$user->hasMultipleNonAdminRoles()) {
                $singleRole = $user->roles->where('name', '!=', Role::ADMIN)->first();
                if ($singleRole) {
                    $this->authService->setActiveRole($user, $singleRole->name);
                }
            }

            $token = $user->createToken('seapedia-api-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'data' => [
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user' => $user->load('roles', 'activeRoleRecord')
                ]
            ]);
        }

        \App\Services\SecurityLogService::logFailedAuthentication($request->input('email'), $request->ip());

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/logout",
     *     summary="Logout user",
     *     security={{"BearerAuth":{}}},
     *     @OA\Response(response=200, description="Successful logout")
     * )
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        /** @var \Laravel\Sanctum\PersonalAccessToken|null $token */
        $token = $user->currentAccessToken();
        
        if ($token && method_exists($token, 'delete')) {
            $token->delete();
        } else {
            $user->tokens()->delete();
        }

        $this->authService->clearActiveRole($user);

        return response()->json(['success' => true]);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/auth/me",
     *     summary="Get current user profile",
     *     security={{"BearerAuth":{}}},
     *     @OA\Response(response=200, description="User profile data")
     * )
     */
    public function me(Request $request)
    {
        $user = $request->user()->load('roles', 'activeRoleRecord', 'store');
        
        return response()->json($user);
    }
}
