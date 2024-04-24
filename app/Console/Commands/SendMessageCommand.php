<?php

namespace App\Console\Commands;

use App\Events\MessageSent;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\text;

class SendMessageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:message';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Message to support';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = text(
            label: 'What is your name?',
            required: true
        );

        $text = text(
            label: 'What is your message?',
            required: true
        );


        MessageSent::dispatch($name, $text, Auth::user());
    }
}
