<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionsController;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Controllers\QuestionnairesController;
use App\Http\Controllers\QuestionAnswersController;

Route::middleware(RedirectIfAuthenticated::class)->group(function () {

    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/questionnaire', [QuestionnairesController::class, 'index'])->name('questionnaire.index');
});

Route::get('/questions', [QuestionsController::class, 'index'])->name('questions.index');

Route::post('/question-answers', [QuestionAnswersController::class, 'store'])->name('question-answers.store');

require __DIR__.'/auth.php';
