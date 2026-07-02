<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Role;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'name' => \App\Helpers\SanitizationHelper::sanitizeText($this->name),
            'store_name' => \App\Helpers\SanitizationHelper::sanitizeText($this->store_name),
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:100'],
            'email' => ['required', 'string', 'email:rfc,dns', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'regex:/^(\+62|62|0)8[1-9][0-9]{6,11}$/', 'max:15', 'unique:users,phone'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => [
                'required',
                'string',
                Rule::in(Role::nonAdmin()->pluck('name')->toArray())
            ],
            'store_name' => [Rule::requiredIf(fn () => in_array(Role::SELLER, $this->roles ?? [])), 'nullable', 'string', 'min:3', 'max:100', 'unique:stores,name'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'name.string' => 'Nama harus berupa teks.',
            'name.min' => 'Nama minimal terdiri dari 3 karakter.',
            'name.max' => 'Nama maksimal terdiri dari 100 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar.',
            'phone.regex' => 'Format nomor telepon tidak valid (harus diawali 08 atau +62).',
            'phone.unique' => 'Nomor telepon sudah terdaftar.',
            'password.required' => 'Password wajib diisi.',
            'password.string' => 'Password harus berupa teks.',
            'password.min' => 'Password minimal terdiri dari 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
            'roles.required' => 'Peran (role) wajib dipilih.',
            'roles.array' => 'Format peran tidak valid.',
            'roles.min' => 'Pilih minimal satu peran.',
            'roles.*.required' => 'Peran wajib diisi.',
            'roles.*.string' => 'Peran harus berupa teks.',
            'roles.*.in' => 'Peran yang dipilih tidak valid atau tidak diizinkan.',
            'store_name.required' => 'Nama toko wajib diisi jika Anda mendaftar sebagai penjual.',
            'store_name.string' => 'Nama toko harus berupa teks.',
            'store_name.min' => 'Nama toko minimal terdiri dari 3 karakter.',
            'store_name.max' => 'Nama toko maksimal terdiri dari 100 karakter.',
            'store_name.unique' => 'Nama toko sudah digunakan.',
        ];
    }
}
