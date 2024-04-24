<?php

namespace App\Broadcasting;

use App\Enums\RoleEnum;
use App\Models\Conversation;
use App\Models\User;

class MessageChannel
{
    /**
     * Create a new channel instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user, $id): array|bool
    {
        $conversation = Conversation::findOrFail($id);
        return (int) $user->id === (int) $conversation->user_id || $user->hasRole(RoleEnum::ADMIN);
    }
}
