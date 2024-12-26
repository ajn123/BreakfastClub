<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Support\Facades\Log;

class QuestionsController extends Controller
{
    public function index()
    {
        try {
            $questions = Question::all();
            Log::info('Questions loaded:', ['count' => $questions->count()]);

            return response()->json([
                'questions' => $questions,
                'success' => true,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to load questions:', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'Failed to load questions',
                'success' => false,
            ], 500);
        }
    }
}
