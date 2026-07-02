<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SelectRoleRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct(protected AuthService $authService)
    {
    }

    /**
     * @OA\Post(
     *     path="/api/v1/roles/select",
     *     summary="Select an active role",
     *     security={{"BearerAuth":{}}},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="role", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Role activated")
     * )
     */
    public function selectRole(SelectRoleRequest $request)
    {
        $role = $request->validated('role');
        $user = $request->user();
        $previousRoleRecord = $user->activeRoleRecord ? clone $user->activeRoleRecord : null;
        
        $this->authService->setActiveRole($user, $role);
        
        \App\Services\SecurityLogService::logSuccessfulRoleSwitch($user->id, $previousRoleRecord->active_role ?? null, $role);

        return response()->json([
            'success' => true,
            'active_role' => $role,
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/roles",
     *     summary="Get user roles",
     *     security={{"BearerAuth":{}}},
     *     @OA\Response(response=200, description="User roles")
     * )
     */
    public function getRoles(Request $request)
    {
        return response()->json([
            'roles' => $request->user()->roles
        ]);
    }
}
