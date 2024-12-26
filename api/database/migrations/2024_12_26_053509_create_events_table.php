<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable()->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('location');

            // Recurrence fields
            $table->string('recurrence_type')->nullable(); // daily, weekly, monthly, custom
            $table->json('recurrence_days')->nullable();   // [1,3,5] for Mon,Wed,Fri
            $table->integer('recurrence_interval')->nullable(); // every X days/weeks/months
            $table->date('recurrence_until')->nullable();  // end date for recurring
            $table->integer('max_occurrences')->nullable(); // limit number of occurrences

            // Additional fields
            $table->integer('max_participants')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
