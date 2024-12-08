<?php

namespace App\Http\Controllers;

use App\Models\Questionnaire;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class QuestionnaireController extends Controller
{
    /**
     * Show the questionnaire form.
     */
    public function index()
    {
        // Check if user has already completed the questionnaire
        $existingQuestionnaire = Auth::user()->questionnaire;

        return Inertia::render('Questionnaire/Index', [
            'existingData' => $existingQuestionnaire
        ]);
    }

    /**
     * Store the questionnaire responses.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'extroversion' => 'required|integer|between:1,5',
            'openness' => 'required|integer|between:1,5',
            'conscientiousness' => 'required|integer|between:1,5',
            'food_preferences' => 'required|array|min:1',
            'food_preferences.*' => 'string',
            'conversation_topics' => 'required|array|min:1',
            'conversation_topics.*' => 'string',
            'preferred_breakfast_time' => 'required|date_format:H:i',
            'location_preferences' => 'nullable|array',
            'location_preferences.*' => 'string',
            'bio' => 'required|string|max:500',
            'hobbies' => 'nullable|array',
            'hobbies.*' => 'string',
        ]);

        // Update or create the questionnaire
        $questionnaire = Questionnaire::updateOrCreate(
            ['user_id' => Auth::id()],
            $validated
        );

        return redirect()->route('dashboard')->with('success', 'Profile completed successfully!');
    }

    /**
     * Update the questionnaire responses.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'extroversion' => 'sometimes|integer|between:1,5',
            'openness' => 'sometimes|integer|between:1,5',
            'conscientiousness' => 'sometimes|integer|between:1,5',
            'food_preferences' => 'sometimes|array|min:1',
            'food_preferences.*' => 'string',
            'conversation_topics' => 'sometimes|array|min:1',
            'conversation_topics.*' => 'string',
            'preferred_breakfast_time' => 'sometimes|date_format:H:i',
            'location_preferences' => 'nullable|array',
            'location_preferences.*' => 'string',
            'bio' => 'sometimes|string|max:500',
            'hobbies' => 'nullable|array',
            'hobbies.*' => 'string',
        ]);

        $questionnaire = Auth::user()->questionnaire;

        if (!$questionnaire) {
            return response()->json([
                'message' => 'Questionnaire not found'
            ], 404);
        }

        $questionnaire->update($validated);

        return redirect()->route('dashboard')->with('success', 'Profile updated successfully!');
    }

    /**
     * Get the questionnaire data.
     */
    public function show()
    {
        $questionnaire = Auth::user()->questionnaire;

        if (!$questionnaire) {
            return response()->json([
                'message' => 'Questionnaire not found'
            ], 404);
        }

        return response()->json($questionnaire);
    }
}
