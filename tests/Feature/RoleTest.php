<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
    }

    public function test_pilih_role_yang_dimiliki_berhasil()
    {
        $user = User::factory()->create();
        $buyer = Role::where('name', 'buyer')->first();
        $seller = Role::where('name', 'seller')->first();
        $user->roles()->attach([$buyer->id, $seller->id]);

        $this->actingAs($user);

        $response = $this->post('/select-role', [
            'role' => 'buyer',
        ]);

        $response->assertRedirect(route('dashboard.buyer.index'));
    }

    public function test_pilih_role_yang_tidak_dimiliki_gagal_dengan_error()
    {
        $user = User::factory()->create();
        $buyer = Role::where('name', 'buyer')->first();
        $user->roles()->attach($buyer->id);

        $this->actingAs($user);

        $response = $this->post('/select-role', [
            'role' => 'seller',
        ]);

        $response->assertSessionHasErrors('role');
    }

    public function test_active_role_tersimpan_di_database()
    {
        $user = User::factory()->create();
        $buyer = Role::where('name', 'buyer')->first();
        $user->roles()->attach($buyer->id);

        $this->actingAs($user);

        $this->post('/select-role', [
            'role' => 'buyer',
        ]);

        $this->assertDatabaseHas('user_active_roles', [
            'user_id' => $user->id,
            'active_role' => 'buyer',
        ]);
    }

    public function test_akses_dashboard_dengan_role_yang_tidak_aktif_diblokir()
    {
        $user = User::factory()->create();
        $buyer = Role::where('name', 'buyer')->first();
        $seller = Role::where('name', 'seller')->first();
        $user->roles()->attach([$buyer->id, $seller->id]);

        $this->actingAs($user);
        
        $this->post('/select-role', [
            'role' => 'buyer',
        ]);

        $user->refresh();

        $response = $this->get(route('dashboard.seller.index'));

        $response->assertRedirect(route('select-role'));
        $response->assertSessionHas('error');
    }

    public function test_switch_role_berhasil_memperbarui_active_role()
    {
        $user = User::factory()->create();
        $buyer = Role::where('name', 'buyer')->first();
        $seller = Role::where('name', 'seller')->first();
        $user->roles()->attach([$buyer->id, $seller->id]);

        $this->actingAs($user);
        
        $this->post('/select-role', ['role' => 'buyer']);
        
        $this->post('/switch-role', ['role' => 'seller']);

        $this->assertDatabaseHas('user_active_roles', [
            'user_id' => $user->id,
            'active_role' => 'seller',
        ]);
    }
}
