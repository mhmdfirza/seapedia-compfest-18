<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class SelectRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if (!auth()->check() || !auth()->user()->roles->contains('name', $value)) {
                        $fail('Peran yang dipilih tidak valid atau tidak Anda miliki.');
                    }
                },
            ],
        ];
    }
}
