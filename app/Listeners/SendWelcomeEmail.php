<?php

namespace App\Listeners;

use App\Mail\WelcomeMail;
use Illuminate\Support\Facades\Mail;
use App\Events\UserRegistered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class SendWelcomeEmail implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    public User $user;

    /**
     * Handle the event.
     */
    public function handle(UserRegistered $event): void
    {
        $this->user = $event->user;

        Log::info('event', ['event' => $event]);

        Log::error('user', ['user' => $event->user]);

        Log::warning('user email', ['user email' => $event->user['email']]);

        Log::warning('other email', ['user email' => $this->user->email]);

        try {
            Mail::to($event->user->email)
                ->queue(new WelcomeMail($event->user));
        } catch (\Exception $e) {
            Log::error('Failed to send welcome email', [
                'user_id' => $this->user->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(UserRegistered $event, \Throwable $exception): void
    {
        // Log the failure
        Log::error('Failed to send welcome email', [
            'user_id' => $event->user->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
