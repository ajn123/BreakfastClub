<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            [
                'title' => 'Where do you prefer to meet?',
                'subtitle' => 'Select your preferred area for breakfast meetups',
                'type' => 'multiSelect',
                'field' => 'location_preferences',
                'options' => [
                    'North West DC',
                    'North East DC',
                    'South West DC',
                    'South East DC',
                    'Northern Virginia',
                    'Maryland',
                ],
            ],
            [
                'title' => 'What are your favorite breakfast foods?',
                'subtitle' => 'Select all that apply',
                'type' => 'multiSelect',
                'field' => 'food_preferences',
                'options' => [
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
            ],
            [
                'title' => 'What topics interest you most?',
                'subtitle' => 'Select your favorite conversation topics',
                'type' => 'multiSelect',
                'field' => 'conversation_topics',
                'options' => [
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
            ],
            [
                'title' => 'When do you prefer to have breakfast?',
                'subtitle' => 'Select your ideal breakfast time',
                'type' => 'time',
                'field' => 'preferred_breakfast_time',
                'options' => [],
            ],
            [
                'title' => 'What are your hobbies?',
                'subtitle' => 'Select your favorite hobbies',
                'type' => 'multiSelect',
                'field' => 'hobbies',
                'options' => [
                    'Reading',
                    'Traveling',
                    'Cooking',
                    'Hiking',
                    'Gaming',
                    'Running',
                    'Yoga',
                    'Meditation',
                ],
            ],
            [
                'title' => 'Tell us about yourself',
                'subtitle' => 'Share a brief bio with potential breakfast companions',
                'type' => 'text',
                'field' => 'bio',
                'options' => [],
            ],
        ];

        foreach ($questions as $question) {
            Question::create($question);
        }
    }
}
