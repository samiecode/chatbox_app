<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'user_id',
        'type',
        'content',
        'sent_at',
    ];

    protected $casts = [
        'sent_at' => 'datetime:g:i A'
    ];

    public function conversation(): BelongsTo{
        return $this->belongsTo(Conversation::class);
    }
}
