<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureActiveRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = Auth::user();
        
        $activeRole = $user?->activeRoleRecord?->active_role;
        
        if ($activeRole !== $role) {
            $message = "Akses ditolak. Anda membutuhkan peran {$role}, tetapi peran yang aktif adalah " . ($activeRole ?? 'tidak ada') . ".";
            
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['error' => $message], 403);
            }
            
            return redirect()->route('select-role')->with('error', $message);
        }

        return $next($request);
    }
}
