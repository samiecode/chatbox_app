<?php

namespace App\Providers;

use App\Listeners\BroadcastMessage;
use Illuminate\Queue\Listener;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Laravel\Reverb\Connection;
use Laravel\Reverb\Events\MessageReceived;

class AppServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     */
    public function register(): void
    {
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(MessageReceived::class, BroadcastMessage::class);
    }
}
