<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questionnaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
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
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questionnaires');
    }
};
