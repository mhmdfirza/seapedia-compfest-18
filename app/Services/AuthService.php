<?php

namespace App\Services;

use App\Models\User;
use App\Models\Role;
use App\Models\Store;
use App\Models\UserActiveRole;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'password' => Hash::make($data['password']),
            ]);

            $roles = Role::whereIn('name', $data['roles'])->get();
            $user->roles()->attach($roles->pluck('id'));

            if (in_array(Role::SELLER, $data['roles']) && !empty($data['store_name'])) {
                Store::create([
                    'user_id' => $user->id,
                    'name' => $data['store_name'],
                ]);
            }

            return $user;
        });
    }

    public function determinePostLoginRedirect(User $user): string
    {
        if ($user->isAdmin()) {
            return 'dashboard.admin.index';
        }

        if (!$user->hasMultipleNonAdminRoles()) {
            $role = $user->roles->where('name', '!=', Role::ADMIN)->first();
            if ($role) {
                return 'dashboard.' . $role->name . '.index';
            }
        }

        return 'select-role';
    }

    public function setActiveRole(User $user, string $role): bool
    {
        if (!$user->hasRole($role)) {
            return false;
        }

        UserActiveRole::updateOrCreate(
            ['user_id' => $user->id],
            ['active_role' => $role]
        );

        return true;
    }

    public function clearActiveRole(User $user): void
    {
        $activeRole = $user->activeRoleRecord;
        if ($activeRole) {
            $activeRole->update(['active_role' => null]);
        }
    }
}
