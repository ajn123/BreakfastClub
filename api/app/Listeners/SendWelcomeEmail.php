<?php

namespace App\Listeners;

use App\Models\User;
use App\Mail\WelcomeMail;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

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
        try {
            Log::info('Sending welcome email');
            Mail::to($event->user->email)->queue(new WelcomeMail($event->user));
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
        Log::warning('Failed to send welcome email', [
            'user_id' => $event->user->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
