<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\UserActiveRole;

class EnsureRoleSelected
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return $next($request);
        }

        $user = Auth::user();
        
        $rolesCount = $user->roles()->where('name', '!=', 'admin')->count();
        $activeRoleRecord = UserActiveRole::query()->where('user_id', $user->id)->first();
        $activeRole = $activeRoleRecord ? $activeRoleRecord->active_role : null;
        
        if ($rolesCount > 1 && !$activeRole) {
            \App\Services\SecurityLogService::logUnauthorizedAccess($user->id, $request->fullUrl(), 'any_active_role', null);
            
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'error' => 'User belum memilih peran aktif',
                    'action_required' => 'select_role'
                ], 403);
            }
            return redirect()->route('select-role')->with('error', 'Silakan pilih peran terlebih dahulu.');
        }

        return $next($request);
    }
}
