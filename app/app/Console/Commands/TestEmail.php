<?php

namespace App\Console\Commands;

use Exception;
use Illuminate\Mail\Message;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmail extends Command
{
    protected $signature = 'mail:test';

    protected $description = 'Send a test email';

    public function handle()
    {
        try {
            Mail::raw('Test email from Laravel', function (Message $message) {
                $message->to('test@example.com')
                    ->from(config('mail.from.address'), config('mail.from.name'))
                    ->subject('Test Email');
            });

            $this->info('Test email sent successfully!');
            $this->info('Check MailHog at http://localhost:8025');
        } catch (Exception $e) {
            $this->error('Failed to send email: '.$e->getMessage());
            $this->info('Current mail configuration:');
            $this->table(
                ['Setting', 'Value'],
                [
                    ['MAIL_MAILER', config('mail.default')],
                    ['MAIL_HOST', config('mail.mailers.smtp.host')],
                    ['MAIL_PORT', config('mail.mailers.smtp.port')],
                    ['MAIL_ENCRYPTION', config('mail.mailers.smtp.encryption') ?: 'none'],
                    ['MAIL_FROM_ADDRESS', config('mail.from.address')],
                ]
            );
        }
    }
}
