<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Log;
use Illuminate\Queue\InteractsWithQueue;
use Laravel\Reverb\Events\MessageReceived;
use Illuminate\Contracts\Queue\ShouldQueue;

class BroadcastMessage 
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageReceived $event): void
    {
        $message = json_decode($event->message);
        $data    = $message->data;

        if (!$message->event || !$message->event !== 'SendMessage') {
            return;
        }

        $data = json_decode($data);

        Log::debug('listener');
    }
}
