<?php

namespace App\Filters;

use App\Models\Event;
use Illuminate\Database\Eloquent\Builder;

class EventFilter extends Filter
{
    public function __construct()
    {
        parent::__construct(new Event);
    }

    public function search(Builder $query, $value)
    {
        return $query->where('title', 'like', '%'.$value.'%')
            ->orWhere('description', 'like', '%'.$value.'%');
    }

    public function limit(Builder $query, $value)
    {
        return $query->limit($value);
    }

    public function page(Builder $query, $value)
    {
        return $query->offset($value * 5);
    }
}
