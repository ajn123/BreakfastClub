<?php

namespace Tests\Feature\Mail;

use Tests\TestCase;
use App\Models\User;
use App\Mail\WelcomeMail;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\Mail;
use App\Listeners\SendWelcomeEmail;

class WelcomeMailTest extends TestCase
{
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

    public function test_welcome_email_is_sent_when_user_registered_event_fires(): void
    {
        Mail::fake();

        $user = User::factory()->create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);

        // Fire the UserRegistered event
        event(new UserRegistered($user));

        // Assert the welcome email was queued
        Mail::assertQueued(WelcomeMail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email) &&
                $mail->user->id === $user->id &&
                $mail->user->name === $user->name;
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
