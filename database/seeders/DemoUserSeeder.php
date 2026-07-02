<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Store;
use App\Models\UserActiveRole;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password123');

        $roles = Role::query()->whereIn('name', [
            Role::SELLER,
            Role::BUYER,
            Role::DRIVER,
        ])->get()->keyBy('name');

        // 1. Multi-role: Seller + Buyer
        $user1 = User::firstOrCreate(
            ['email' => 'sellerbuyer@demo.com'],
            ['name' => 'Demo Seller & Buyer', 'password' => $password, 'phone' => '081234567890']
        );
        $user1->roles()->syncWithoutDetaching([$roles[Role::SELLER]->id, $roles[Role::BUYER]->id]);
        Store::firstOrCreate(
            ['user_id' => $user1->id],
            ['name' => 'Toko Serba Ada', 'description' => 'Demo Store']
        );

        // 2. Multi-role: Buyer + Driver
        $user2 = User::firstOrCreate(
            ['email' => 'buyerdriver@demo.com'],
            ['name' => 'Demo Buyer & Driver', 'password' => $password, 'phone' => '082234567890']
        );
        $user2->roles()->syncWithoutDetaching([$roles[Role::BUYER]->id, $roles[Role::DRIVER]->id]);

        // 3. Single-role: Seller
        $user3 = User::firstOrCreate(
            ['email' => 'seller@demo.com'],
            ['name' => 'Demo Seller', 'password' => $password, 'phone' => '083234567890']
        );
        $user3->roles()->syncWithoutDetaching([$roles[Role::SELLER]->id]);
        Store::firstOrCreate(
            ['user_id' => $user3->id],
            ['name' => 'Toko Makanan', 'description' => 'Demo Toko Makanan']
        );
        UserActiveRole::firstOrCreate(['user_id' => $user3->id], ['active_role' => Role::SELLER]);

        // 4. Single-role: Buyer
        $user4 = User::firstOrCreate(
            ['email' => 'buyer@demo.com'],
            ['name' => 'Demo Buyer', 'password' => $password, 'phone' => '084234567890']
        );
        $user4->roles()->syncWithoutDetaching([$roles[Role::BUYER]->id]);
        UserActiveRole::firstOrCreate(['user_id' => $user4->id], ['active_role' => Role::BUYER]);

        // 5. Single-role: Driver
        $user5 = User::firstOrCreate(
            ['email' => 'driver@demo.com'],
            ['name' => 'Demo Driver', 'password' => $password, 'phone' => '085234567890']
        );
        $user5->roles()->syncWithoutDetaching([$roles[Role::DRIVER]->id]);
        UserActiveRole::firstOrCreate(['user_id' => $user5->id], ['active_role' => Role::DRIVER]);
    }
}
