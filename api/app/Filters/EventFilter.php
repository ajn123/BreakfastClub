<?php

namespace App\Filters;

use Laravel\Scout\Builder;
use App\Models\Event;
use Illuminate\Http\Request;

class EventFilter extends Filter
{
    public function filter(Request $request)
    {
        $builder = Event::query();
        $query = $request->input('search');

        if (!$query) {
            return Event::all();
        }

        $results = Event::where('title', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->get();


        return $results;
    }
}
