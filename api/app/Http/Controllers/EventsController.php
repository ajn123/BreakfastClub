<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Filters\EventFilter;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class EventsController extends Controller
{

    public function index()
    {
        return Event::all();
    }

    public function search(Request $request)
    {
        $filter = new EventFilter();

        return $filter->filter($request);
    }
}
