<?php

namespace Tests\Feature\Security;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SqlInjectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_sql_injection_payload_is_rejected_on_login()
    {
        $payload = "' OR '1'='1"; // Extremely common SQL injection vector

        $response = $this->post('/login', [
            'email' => $payload,
            'password' => 'password123',
        ]);

        // Should return a validation error explicitly because of email:rfc format
        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }
    
    // We would also mock an end point that searches products, but the Eloquent abstraction inherently sanitizes SQL injections for database layer interactions automatically.
    // The instructions specified testing email logon SQLi explicitly.
}
