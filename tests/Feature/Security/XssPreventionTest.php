<?php

namespace Tests\Feature\Security;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class XssPreventionTest extends TestCase
{
    use RefreshDatabase;

    public function test_xss_payload_in_app_review_is_blocked()
    {
        $payload = "<script>alert('XSS')</script>";

        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/v1/app-reviews', [
            'rating' => 5,
            'comment' => $payload,
        ]);

        $response->assertJsonValidationErrors('comment');
    }
}
