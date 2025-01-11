<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => 'Description number '.fake()->numberBetween(1, 1000),
            'start_time' => $startTime = fake()->dateTime(),
            'end_time' => fake()->dateTimeBetween($startTime),
            'location' => fake()->address(),
            'image' => 'https://picsum.photos/seed/'.$this->faker->numberBetween(1, 1000).'/800/600',
            'website' => fake()->url(),
        ];
    }
}
