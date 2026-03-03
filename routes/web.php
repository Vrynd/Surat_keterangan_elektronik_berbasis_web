<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
   'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
   Route::inertia('dashboard', 'client/dashboard')->name('dashboard');
   Route::inertia('submission-letter', 'client/submission-letter')->name('submission.letter');
});


require __DIR__ . '/settings.php';
