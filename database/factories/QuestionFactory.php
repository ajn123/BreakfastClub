<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    protected $model = Question::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'subtitle' => $this->faker->sentence(),
            'type' => $this->faker->randomElement(['multiSelect', 'text', 'time']),
            'field' => $this->faker->randomElement([
                'location_preferences',
                'food_preferences',
                'conversation_topics',
                'hobbies',
                'preferred_breakfast_time',
                'bio',
            ]),
            'options' => $this->getOptionsForField('location_preferences'),
        ];
    }

    private function getOptionsForField(string $field): array
    {
        return match ($field) {
            'location_preferences' => [
                'North West DC',
                'North East DC',
                'South West DC',
                'South East DC',
                'Northern Virginia',
                'Maryland',
            ],
            'food_preferences' => [
                'Pancakes',
                'Waffles',
                'Eggs Benedict',
                'Avocado Toast',
                'Omelette',
                'Breakfast Burrito',
                'Acai Bowl',
                'French Toast',
                'Bagels',
                'Croissants',
            ],
            'conversation_topics' => [
                'Technology',
                'Arts & Culture',
                'Business',
                'Sports',
                'Travel',
                'Food',
                'Politics',
                'Science',
                'Books',
                'Movies & TV',
            ],
            'hobbies' => [
                'Reading',
                'Traveling',
                'Cooking',
                'Hiking',
                'Gaming',
                'Running',
                'Yoga',
                'Meditation',
            ],
            default => []
        };
    }
}
