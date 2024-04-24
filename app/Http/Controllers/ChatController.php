<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Enums\RoleEnum;
use App\Models\Message;
use App\Events\MessageSent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Events\MessageSentAdmin;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conversation = Conversation::where('user_id', auth()->user()->id)->first();
        $messages     = Message::where('conversation_id', $conversation->id)->get();
        Log::debug(json_encode($messages));

        return Inertia::render('Chat', ['messages' => $messages, 'conversation' => $conversation]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'message' => ['required', 'string'],
            'conversationId' => ['required', 'numeric', 'exists:conversations,id'],
            'userId' => ['required', 'numeric', 'exists:users,id']
        ]);

        $conversation = Conversation::where( 'id' ,$request->conversationId)->with('user')->first();
        $conversation->last_seen = now();
        $conversation->last_message = $request->message;
        $conversation->save();

        $message = $conversation->messages()->create([
            'user_id' => $request->userId,
            'type' => 'message',
            'content' => $request->message,
            'sent_at' => now()
        ]);


        MessageSent::dispatch($message, $conversation);

        if(!User::find(auth()->user()->id)->hasRole(RoleEnum::ADMIN)){
            MessageSentAdmin::dispatch($conversation);
        }

        return response()->json([
            'message' => 'Message sent successfully'
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
