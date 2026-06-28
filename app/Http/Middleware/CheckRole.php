<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401, 'Unauthenticated.');
        }

        $activeRole = $user->activeRole?->active_role;

        if ($activeRole !== $role) {
            abort(403, 'Unauthorized access - Invalid active role.');
        }

        // Optional: Ensure the user actually owns this role in pivot table just for safety
        if (! $user->roles()->where('name', $role)->exists()) {
            abort(403, 'Unauthorized access - Role not assigned to user.');
        }

        return $next($request);
    }
}
