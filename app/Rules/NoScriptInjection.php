<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Log;

class NoScriptInjection implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) return;
        
        // Regex to identify script tags or event handlers like onclick=, javascript:
        if (preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $value) ||
            preg_match('/on\w+\s*=/is', $value) ||
            preg_match('/javascript:/is', $value)) {
            
            Log::warning('Suspicious script injection blocked', [
                'field' => $attribute,
                'input_value' => mb_substr($value, 0, 100),
            ]);
            
            $fail("Input {$attribute} mengandung konten (script) yang tidak diizinkan.");
        }
    }
}
