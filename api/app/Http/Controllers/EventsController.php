<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Filters\EventFilter;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function index(Request $request)
    {
        $filter = new EventFilter;

        return $filter->filter($request)->get();
    }

    public function search(Request $request) {}

    public function store(Request $request)
    {
        $event = new Event;
        $event->title = $request->title;
        $event->description = $request->description;
        $event->start_time = $request->start_time;
        $event->end_time = $request->end_time;

        if ($event->save()) {
            return response()->json(['message' => 'Event created successfully'], 201);
        } else {
            return response()->json(['message' => 'Event creation failed'], 500);
        }
    }

    public function likedEvents(Request $request)
    {
        // TODO: Implement likedEvents method.
    }
}
