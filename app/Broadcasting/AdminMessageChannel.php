<?php

namespace App\Broadcasting;

use App\Enums\RoleEnum;
use App\Models\User;

class AdminMessageChannel
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
    public function join(User $user): array|bool
    {
        return $user->hasRole(RoleEnum::ADMIN);
    }
}
