<?php

namespace Tests\Feature\Api;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ApiAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
    }

    public function test_login_mengembalikan_token_dan_user_data()
    {
        $user = User::factory()->create(['password' => Hash::make('password123')]);
        $role = Role::where('name', Role::BUYER)->first();
        $user->roles()->attach($role->id);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'access_token',
                'token_type',
                'user' => [
                    'id',
                    'email',
                    'name',
                ]
            ]
        ]);
    }

    public function test_register_mengembalikan_token()
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Api User',
            'email' => 'api@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'roles' => ['buyer'],
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'access_token',
                'user'
            ]
        ]);
    }

    public function test_me_dengan_token_valid_mengembalikan_profil()
    {
        $user = User::factory()->create();
        
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v1/auth/me');

        $response->assertStatus(200);
        $response->assertJson([
            'email' => $user->email,
        ]);
    }

    public function test_me_tanpa_token_mengembalikan_401()
    {
        $response = $this->getJson('/api/v1/auth/me');

        $response->assertStatus(401);
    }

    public function test_logout_merevoke_token_sehingga_tidak_bisa_digunakan_lagi()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->postJson('/api/v1/auth/logout');

        $response->assertStatus(200);

        \Illuminate\Support\Facades\Auth::forgetGuards();

        $meResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->getJson('/api/v1/auth/me');

        if ($meResponse->status() !== 401) {
            dump($meResponse->json());
        }

        $meResponse->assertStatus(401);
    }
}
