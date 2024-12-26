<?php

use App\Models\User;
use App\Models\Question;

test('can store question answers', function () {
    $user = User::factory()->create();
    $questions = Question::factory(3)->create();

    $response = $this
        ->actingAs($user)
        ->post(route('question-answers.store'), [
            'answers' => [
                [
                    'question_id' => $questions[0]->id,
                    'answer' => 'Test answer 1',
                    'options' => [],
                ],
                [
                    'question_id' => $questions[1]->id,
                    'answer' => 'Test answer 2',
                    'options' => [],
                ],
                [
                    'question_id' => $questions[2]->id,
                    'answer' => 'Test answer 3',
                    'options' => [],
                ],
            ],
        ]);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Answers saved successfully!');

    // Verify answers were stored in database
    foreach ($questions as $index => $question) {
        $this->assertDatabaseHas('question_answers', [
            'user_id' => $user->id,
            'question_id' => $question->id,
            'answer' => 'Test answer '.($index + 1),
        ]);
    }
});

test('can view questionnaire index page', function () {
    $user = User::factory()->create();
    $questions = Question::factory(3)->create();

    $response = $this
        ->actingAs($user)
        ->get(route('question-answers.index'));

    $response->assertInertia(
        fn ($page) => $page
            ->component('Questionnaire/Index')
            ->has('initialQuestions', 3)
    );
});
