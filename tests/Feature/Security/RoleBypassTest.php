<?php

namespace Tests\Feature\Security;

use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\UserActiveRole;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoleBypassTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login()
    {
        $response = $this->get('/dashboard/seller');
        $response->assertRedirect('/login');
    }

    public function test_user_without_active_role_is_redirected_to_select_role()
    {
        $user = clone(User::factory()->create());
        $user->roles()->create(['name' => Role::SELLER, 'display_name' => 'Seller']);
        $user->roles()->create(['name' => Role::DRIVER, 'display_name' => 'Driver']);

        $response = $this->actingAs($user)->get('/dashboard/seller');
        $response->assertRedirect(route('select-role'));
    }

    public function test_buyer_cannot_access_seller_dashboard()
    {
        $user = User::factory()->create();
        $user->roles()->create(['name' => Role::BUYER, 'display_name' => 'Buyer']);
        $user->roles()->create(['name' => Role::SELLER, 'display_name' => 'Seller']);
        
        UserActiveRole::updateOrCreate(
            ['user_id' => $user->id],
            ['active_role' => Role::BUYER]
        );

        $response = $this->actingAs($user)->get('/dashboard/seller');
        
        $response->assertRedirect(route('select-role'));
    }
}
