<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestionAnswer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Question;

class QuestionAnswersController extends Controller
{
    public function index()
    {
        return Inertia::render('Questionnaire/Index', [
            'initialQuestions' => Question::active()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.answer' => 'nullable|string',
            'answers.*.options' => 'nullable|array',
        ]);

        DB::transaction(function () use ($validated) {
            foreach ($validated['answers'] as $answer) {
                QuestionAnswer::create([
                    'user_id' => Auth::id(),
                    'question_id' => $answer['question_id'],
                    'answer' => $answer['answer'],
                ]);
            }
        });

        return redirect()->back()->with('success', 'Answers saved successfully!');
    }
}
