<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Option 1: Disable CSRF for all tests
        $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

        // Option 2: Or set up session and CSRF token
        $this->withSession(['_token' => 'test-token']);
        $this->withHeader('X-CSRF-TOKEN', 'test-token');
    }

    /**
     * Helper method to make authenticated requests with CSRF
     */
    protected function makeAuthenticatedRequest($method, $uri, $data = [], ?User $user = null)
    {
        if (! $user) {
            $user = User::factory()->create();
        }

        return $this->actingAs($user)
            ->withSession(['_token' => 'test-token'])
            ->withHeader('X-CSRF-TOKEN', 'test-token')
            ->json($method, $uri, $data);
    }

    /**
     * Helper method for password confirmation tests
     */
    protected function confirmPassword($password = 'password', ?User $user = null)
    {
        if (! $user) {
            $user = User::factory()->create([
                'password' => bcrypt($password),
            ]);
        }

        return $this->makeAuthenticatedRequest('POST', '/confirm-password', [
            'password' => $password,
        ], $user);
    }
}
