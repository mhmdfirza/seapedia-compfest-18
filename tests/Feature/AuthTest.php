<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
    }

    public function test_registrasi_berhasil_dengan_satu_role()
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '08123456789',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'roles' => ['buyer'],
        ]);

        $response->assertRedirect(route('dashboard.buyer.index'));
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function test_registrasi_berhasil_dengan_multi_role_termasuk_seller()
    {
        $response = $this->post('/register', [
            'name' => 'Seller Buyer User',
            'email' => 'sellerbuyer@example.com',
            'phone' => '08123456780',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'roles' => ['buyer', 'seller'],
            'store_name' => 'Toko Laris',
        ]);

        $response->assertRedirect(route('select-role'));
        $this->assertDatabaseHas('users', ['email' => 'sellerbuyer@example.com']);
        $this->assertDatabaseHas('stores', ['name' => 'Toko Laris']);
    }

    public function test_registrasi_gagal_dengan_email_duplikat()
    {
        User::factory()->create([
            'email' => 'duplicate@example.com'
        ]);

        $response = $this->post('/register', [
            'name' => 'Duplicate User',
            'email' => 'duplicate@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'roles' => ['buyer'],
        ]);

        $response->assertSessionHasErrors('email');
    }

    public function test_registrasi_tidak_bisa_memilih_role_admin()
    {
        $response = $this->post('/register', [
            'name' => 'Hacker User',
            'email' => 'hacker@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'roles' => ['admin'],
        ]);

        $response->assertSessionHasErrors('roles.0');
    }

    public function test_login_berhasil_dengan_single_role_langsung_redirect_ke_dashboard()
    {
        $user = User::factory()->create(['password' => Hash::make('password123')]);
        $role = Role::where('name', Role::BUYER)->first();
        $user->roles()->attach($role->id);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertRedirect(route('dashboard.buyer.index'));
    }

    public function test_login_berhasil_dengan_multi_role_diarahkan_ke_select_role()
    {
        $user = User::factory()->create(['password' => Hash::make('password123')]);
        $buyer = Role::where('name', Role::BUYER)->first();
        $seller = Role::where('name', Role::SELLER)->first();
        $user->roles()->attach([$buyer->id, $seller->id]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertRedirect(route('select-role'));
    }

    public function test_login_gagal_dengan_password_salah()
    {
        $user = User::factory()->create(['password' => Hash::make('password123')]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrongpassword',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_logout_berhasil_menghapus_session()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/logout');

        $response->assertRedirect('/');
        $this->assertGuest();
    }
}
