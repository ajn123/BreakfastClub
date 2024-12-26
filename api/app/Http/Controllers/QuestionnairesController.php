<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Question;
use App\Models\Questionnaire;

class QuestionnairesController extends Controller
{
    /**
     * Show the questionnaire form.
     */
    public function index()
    {
        return Inertia::render('Questionnaire/Index', [
            'initialQuestions' => Question::all(),
        ]);
    }
}
