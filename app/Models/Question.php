<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    use HasFactory;

    protected $fillable = ['title', 'subtitle', 'type', 'field', 'options'];

    public $casts = [
        'options' => 'array',
    ];

    public function questionAnswers()
    {
        return $this->hasMany(QuestionAnswer::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
