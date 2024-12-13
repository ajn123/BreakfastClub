<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user
    ) {}

    public function build()
    {
        return $this->subject('Welcome to The Breakfast Club!')
            ->view('emails.welcome')
            ->with([
                'user' => $this->user,
            ]);
    }
}
