<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = Auth::user();
        $user->load('roles', 'activeRoleRecord');
        
        $activeRole = $user->activeRoleRecord ? $user->activeRoleRecord->active_role : null;
        
        $viewMap = [
            'driver' => 'driver/profile',
            'buyer' => 'buyer/profile',
            'seller' => 'seller/profile',
        ];
        
        return Inertia::render($viewMap[$activeRole] ?? 'Profile/Show', [
            'user' => $user->toArray(),
            'roles' => $user->roles,
            'active_role' => $activeRole,
            'wallet_balance' => null,
            'seller_income' => null,
            'driver_earnings' => null,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'nullable|string|regex:/^(08|\+62)/',
            'avatar' => 'nullable|url',
        ]);

        $request->user()->update($validated);
        
        return back();
    }
}
