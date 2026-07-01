<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => Role::ADMIN,
                'display_name' => 'Administrator',
                'description' => 'pengelola sistem',
            ],
            [
                'name' => Role::SELLER,
                'display_name' => 'Penjual',
                'description' => 'pengelola toko dan produk',
            ],
            [
                'name' => Role::BUYER,
                'display_name' => 'Pembeli',
                'description' => 'pelanggan marketplace',
            ],
            [
                'name' => Role::DRIVER,
                'display_name' => 'Pengirim',
                'description' => 'mitra pengiriman',
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}
