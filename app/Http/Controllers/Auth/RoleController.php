<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SelectRoleRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Role;

class RoleController extends Controller
{
    public function __construct(protected AuthService $authService)
    {
    }

    public function showSelectRole(Request $request)
    {
        $user = Auth::user();
        
        if ($user->activeRoleRecord || !$user->hasMultipleNonAdminRoles()) {
            return redirect()->route($this->authService->determinePostLoginRedirect($user));
        }

        $roles = collect();
        foreach ($user->roles as $role) {
            if ($role->name !== Role::ADMIN) {
                $roles->push($role);
            }
        }
        
        return Inertia::render('auth/roleselection', [
            'userRoles' => $roles,
            'userName' => $user->name,
        ]);
    }

    public function selectRole(SelectRoleRequest $request)
    {
        $role = $request->validated('role');
        $this->authService->setActiveRole(Auth::user(), $role);
        
        return redirect()->route('dashboard.' . $role . '.index');
    }

    public function switchRole(SelectRoleRequest $request)
    {
        $role = $request->validated('role');
        $this->authService->setActiveRole(Auth::user(), $role);
        
        return redirect()->route('dashboard.' . $role . '.index');
    }
}
