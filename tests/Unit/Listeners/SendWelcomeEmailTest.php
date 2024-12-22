<?php

namespace Tests\Unit\Listeners;

use Tests\TestCase;
use App\Models\User;
use App\Mail\WelcomeMail;
use App\Listeners\SendWelcomeEmail;
use Illuminate\Support\Facades\Mail;
use App\Events\UserRegistered;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SendWelcomeEmailTest extends TestCase
{

    public function test_listener_sends_welcome_email(): void
    {
        Mail::fake();

        $user = User::factory()->create();
        $event = new UserRegistered($user);

        $listener = new SendWelcomeEmail;
        $listener->handle($event);
        Mail::assertQueued(WelcomeMail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email) &&
                $mail->user->id === $user->id;
        });
    }

    public function test_listener_implements_should_queue(): void
    {
        $this->assertTrue(
            in_array(
                'Illuminate\Contracts\Queue\ShouldQueue',
                class_implements(SendWelcomeEmail::class)
            )
        );
    }
}
