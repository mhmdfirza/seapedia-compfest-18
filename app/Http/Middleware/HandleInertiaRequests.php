<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
<<<<<<< HEAD
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
=======
    protected $rootView = 'app';

>>>>>>> dev-level6
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

<<<<<<< HEAD
    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            //
=======
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
>>>>>>> dev-level6
        ];
    }
}
