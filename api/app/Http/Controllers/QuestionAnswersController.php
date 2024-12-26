<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestionAnswer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class QuestionAnswersController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.answer' => 'required|string',
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
