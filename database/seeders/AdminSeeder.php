<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\UserActiveRole;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $adminEmail = env('ADMIN_EMAIL', 'admin@seapedia.com');
        $adminPassword = env('ADMIN_PASSWORD', 'password123');

        $user = User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'System Administrator',
                'password' => Hash::make($adminPassword),
            ]
        );

        $adminRole = Role::where('name', Role::ADMIN)->first();
        if ($adminRole && !$user->roles->contains($adminRole->id)) {
            $user->roles()->attach($adminRole->id);
        }

        UserActiveRole::firstOrCreate(
            ['user_id' => $user->id],
            ['active_role' => Role::ADMIN]
        );
    }
}
