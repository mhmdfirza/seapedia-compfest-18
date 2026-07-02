<?php

namespace Tests\Feature\Security;

use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\UserActiveRole;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SessionSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_logout_clears_active_role_and_invalidates_session()
    {
        $user = User::factory()->create();
        $user->roles()->create(['name' => Role::SELLER, 'display_name' => 'Seller']);

        UserActiveRole::create([
            'user_id' => $user->id,
            'active_role' => Role::SELLER
        ]);

        $response = $this->actingAs($user)->post('/logout');

        // Verify session redirected heavily
        $response->assertRedirect('/');

        // Verify active role is removed (set to null)
        $this->assertDatabaseHas('user_active_roles', [
            'user_id' => $user->id,
            'active_role' => null,
        ]);
        
        $this->assertGuest();
    }
}
