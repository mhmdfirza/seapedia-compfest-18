<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        
        $userData = null;
        $activeRole = null;
        $storeData = null;

        if ($user) {
            $user->loadMissing('roles', 'activeRoleRecord', 'store');
            $activeRole = $user->activeRoleRecord?->active_role;
            
            $userData = array_merge($user->toArray(), [
                'roles' => $user->roles,
            ]);
            
            if ($activeRole === \App\Models\Role::SELLER && $user->store) {
                $storeData = $user->store;
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $userData,
                'activeRole' => $activeRole,
                'store' => $storeData,
            ],
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                    'status' => $request->session()->get('status'),
                ];
            },
        ];
    }
}
