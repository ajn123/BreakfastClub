<?php

use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questionnaires', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            // Personality traits (1-5 scale)
            $table->integer('extroversion')->nullable();
            $table->integer('openness')->nullable();
            $table->integer('conscientiousness')->nullable();
            // Preferences
            $table->json('food_preferences')->nullable();
            $table->json('conversation_topics')->nullable();
            $table->time('preferred_breakfast_time')->nullable();
            $table->json('location_preferences')->nullable();
            // Additional info
            $table->text('bio')->nullable();
            $table->json('hobbies')->nullable();
            $table->json('personality_scores')->nullable();
            $table->json('preferences')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questionnaires');
    }
};
