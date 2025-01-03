<?php

namespace App\Filters;

use App\Models\Event;
use Illuminate\Http\Request;

class EventFilter
{
    public function filter(Request $request)
    {
        $query = $request->input('search');

        if (! $query) {
            return Event::all();
        }

        $results = Event::where('title', 'like', '%'.$query.'%')
            ->orWhere('description', 'like', '%'.$query.'%')
            ->get();

        return $results;
    }
}
