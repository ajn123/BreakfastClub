<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Questionnaire extends Model
{
    protected $fillable = [
        'user_id',
        'extroversion',
        'openness',
        'conscientiousness',
        'food_preferences',
        'conversation_topics',
        'preferred_breakfast_time',
        'location_preferences',
        'bio',
        'hobbies',
    ];

    protected $casts = [
        'food_preferences' => 'array',
        'conversation_topics' => 'array',
        'location_preferences' => 'array',
        'hobbies' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
