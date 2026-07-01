<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Role;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService)
    {
    }

    public function showLogin(Request $request)
    {
        if (Auth::check()) {
            return redirect()->route($this->authService->determinePostLoginRedirect(Auth::user()));
        }
        
        return Inertia::render('auth/login', [
            'status' => session('status'),
        ]);
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            $request->session()->regenerate();
            
            $user = Auth::user();
            
            if (!$user->isAdmin()) {
                if (!$user->hasMultipleNonAdminRoles()) {
                    $singleRole = $user->roles->where('name', '!=', Role::ADMIN)->first();
                    if ($singleRole) {
                        $this->authService->setActiveRole($user, $singleRole->name);
                    }
                }
            }

            return redirect()->intended(route($this->authService->determinePostLoginRedirect($user)));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            $this->authService->clearActiveRole($user);
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function showRegister()
    {
        $availableRoles = Role::where('name', '!=', Role::ADMIN)->get();
        
        return Inertia::render('auth/register', [
            'availableRoles' => $availableRoles,
        ]);
    }

    public function register(RegisterRequest $request)
    {
        $user = $this->authService->register($request->validated());

        Auth::login($user);
        $request->session()->regenerate();
        
        return redirect()->route($this->authService->determinePostLoginRedirect($user));
    }
}
