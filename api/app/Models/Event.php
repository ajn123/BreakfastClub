<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory, Searchable;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'start_time',
        'end_time',
    ];

    public $casts = [
        'recurrence_days' => 'array',
    ];

    public function toSearchableArray(): array
    {
        // All fields are searchable
        return $this->toArray();
    }
}
