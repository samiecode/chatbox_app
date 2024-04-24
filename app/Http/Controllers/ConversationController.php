<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreConversationRequest;
use App\Http\Requests\UpdateConversationRequest;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conversations = Conversation::latest()
            ->whereHas('user', function ($query) {
                $query->whereNotNull('last_seen');
            })
            ->with('user')
            ->get();

        return Inertia::render('Support', ['conversations' => json_encode($conversations)]);
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
    public function store(StoreConversationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Conversation $support)
    {
        if(empty($support)){
            abort(404, 'Conversation not found');
        }
        $messages      = Message::where('conversation_id', $support->id)->get();

        return response()->json($messages);
        // $conversations = Conversation::latest()->with('user')->get();
        // return Inertia::render('SupportChat', ['messages' => json_encode($messages), 'conversations' => json_encode($conversations)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Conversation $conversation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConversationRequest $request, Conversation $conversation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        //
    }
}
