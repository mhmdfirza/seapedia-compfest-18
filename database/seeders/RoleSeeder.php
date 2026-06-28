<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Super user with full access.',
            ],
            [
                'name' => 'seller',
                'display_name' => 'Penjual',
                'description' => 'User who sells products.',
            ],
            [
                'name' => 'buyer',
                'display_name' => 'Pembeli',
                'description' => 'User who buys products.',
            ],
            [
                'name' => 'driver',
                'display_name' => 'Pengirim',
                'description' => 'User who delivers products.',
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}
