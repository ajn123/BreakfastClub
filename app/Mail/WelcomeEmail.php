<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(private string $name)
    {
    }

    public function build()
    {
        return $this->view('emails.welcome')
                    ->subject('Welcome to Touch Grass DC!')
                    ->with([
                        'name' => $this->name
                    ]);
    }
} 