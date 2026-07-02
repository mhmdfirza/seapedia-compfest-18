<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SafeUrl implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $parsedUrl = parse_url($value);
        
        if (!$parsedUrl || !isset($parsedUrl['scheme'])) {
            $fail("Format {$attribute} URL tidak valid.");
            return;
        }

        $scheme = strtolower($parsedUrl['scheme']);
        
        $bannedSchemes = ['javascript', 'data', 'vbscript', 'file'];
        if (in_array($scheme, $bannedSchemes) || !in_array($scheme, ['http', 'https'])) {
            $fail("Skema URL pada {$attribute} tidak diizinkan demi keamanan.");
        }
    }
}
