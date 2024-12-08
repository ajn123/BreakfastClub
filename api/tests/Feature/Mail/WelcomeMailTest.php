<?php

namespace Tests\Feature\Mail;

use Tests\TestCase;
use App\Models\User;
use App\Mail\WelcomeMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Testing\RefreshDatabase;

class WelcomeMailTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_email_is_sent_after_registration(): void
    {
        Mail::fake();

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // Attempt registration
        $response = $this->post('/register', $userData);

        // Assert email was sent
        Mail::assertSent(WelcomeMail::class, function ($mail) use ($userData) {
            return $mail->hasTo($userData['email']) &&
                $mail->user->name === $userData['name'];
        });

        // Assert redirect to questionnaire
        $response->assertRedirect(route('dashboard'));
    }

    public function test_welcome_email_contains_correct_content(): void
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        $mailable = new WelcomeMail($user);

        $mailable->assertSeeInHtml('Welcome to The Breakfast Club!');
        $mailable->assertSeeInHtml($user->name);
        $mailable->assertSeeInHtml('Start Your Journey');

        // Test email metadata
        $mailable->assertHasSubject('Welcome to The Breakfast Club!');

        // Test that the email uses our layout
        $mailable->assertSeeInHtml('The Breakfast Club DC');
        $mailable->assertSeeInHtml('Instagram');
        $mailable->assertSeeInHtml('Twitter');
        $mailable->assertSeeInHtml('Facebook');
    }

    public function test_welcome_email_is_queued(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        // Trigger the registered event
        event(new \Illuminate\Auth\Events\Registered($user));

        // Assert the email was queued
        Mail::assertQueued(WelcomeMail::class, function ($mail) use ($user) {
            return $mail->user->id === $user->id;
        });
    }

    public function test_welcome_email_has_valid_links(): void
    {
        $user = User::factory()->create();

        $mailable = new WelcomeMail($user);

        $html = $mailable->render();

        // Assert dashboard link exists and is correct
        $this->assertStringContainsString(
            route('dashboard'),
            $html
        );
    }
}
