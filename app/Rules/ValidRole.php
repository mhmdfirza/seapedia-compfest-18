<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\User;

class ValidRole implements ValidationRule
{
    protected ?User $user;

    public function __construct(?User $user = null)
    {
        $this->user = $user ?? auth()->user();
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$this->user) {
            $fail("Autentikasi gagal untuk menentukan peran ini.");
            return;
        }
        
        $hasRole = $this->user->roles()->where('name', $value)->exists();
        
        if (!$hasRole) {
            $fail("Anda tidak memiliki izin (role) untuk pilihan ini.");
        }
    }
}
