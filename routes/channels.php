<?php

use App\Broadcasting\AdminMessageChannel;
use App\Broadcasting\MessageChannel;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{id}', MessageChannel::class);
Broadcast::channel('message.admin', AdminMessageChannel::class);
