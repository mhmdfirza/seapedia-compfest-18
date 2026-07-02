<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\UserActiveRole;

class EnsureActiveRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $allowedRoles = explode('|', str_replace(',', '|', $role));

        // Langkah 1: Cek Autentikasi
        if (!Auth::check()) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['error' => 'Unauthenticated.'], 401);
            }
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Langkah 2: Ambil active_role dari database
        $activeRoleRecord = UserActiveRole::where('user_id', $user->id)->first();
        $activeRole = $activeRoleRecord ? $activeRoleRecord->active_role : null;

        if (!$activeRole) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'error' => 'User belum memilih peran aktif',
                    'action_required' => 'select_role'
                ], 403);
            }
            return redirect()->route('select-role')->with('error', 'Silakan pilih peran terlebih dahulu.');
        }

        // Langkah 3: Cek active_role terhadap role yang diizinkan
        if (!in_array($activeRole, $allowedRoles)) {
            \App\Services\SecurityLogService::logUnauthorizedAccess($user->id, $request->fullUrl(), implode('|', $allowedRoles), $activeRole);
            $message = "Akses ditolak. Anda membutuhkan peran: " . implode(' atau ', $allowedRoles) . ", tetapi peran yang aktif adalah {$activeRole}.";
            
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'required_role' => $allowedRoles,
                    'active_role' => $activeRole,
                    'message' => $message
                ], 403);
            }
            return redirect()->route('select-role')->with('error', $message);
        }

        // Langkah 4: Verifikasi silang kepemilikan role
        $hasRole = $user->roles()->where('name', $activeRole)->exists();
        if (!$hasRole) {
            $activeRoleRecord->delete(); // Hapus inkonsistensi
            $message = 'Inkonsistensi data peran terdeteksi. Silakan pilih ulang peran.';
            
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                     'error' => $message,
                     'action_required' => 'select_role'
                ], 403);
            }
            return redirect()->route('select-role')->with('error', $message);
        }

        return $next($request);
    }
}
