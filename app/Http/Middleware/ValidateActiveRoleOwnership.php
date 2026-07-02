<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\UserActiveRole;
use App\Models\Store;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ValidateActiveRoleOwnership
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if (!$user) return $next($request);

        $activeRoleRecord = UserActiveRole::query()->where('user_id', $user->id)->first();
        $activeRole = $activeRoleRecord ? $activeRoleRecord->active_role : null;

        if ($activeRole === 'seller') {
            if (!Store::query()->where('user_id', $user->id)->exists()) {
                if ($request->expectsJson() || $request->is('api/*')) {
                    return response()->json(['error' => 'Akun Seller belum memiliki toko terdaftar.'], 403);
                }
                abort(403, 'Akun Seller belum memiliki toko terdaftar.');
            }
        } elseif ($activeRole === 'driver') {
            if (Schema::hasTable('driver_profiles')) {
                if (!DB::table('driver_profiles')->where('user_id', $user->id)->exists()) {
                    if ($request->expectsJson() || $request->is('api/*')) {
                        return response()->json(['error' => 'Profil driver belum lengkap.'], 403);
                    }
                    abort(403, 'Profil driver belum lengkap.');
                }
            }
        } elseif ($activeRole === 'admin') {
            if (!$user->roles()->where('name', 'admin')->exists()) {
                if ($request->expectsJson() || $request->is('api/*')) {
                    return response()->json(['error' => 'Akses Admin Ditolak.'], 403);
                }
                abort(403, 'Akses Admin Ditolak.');
            }
        }

        return $next($request);
    }
}
