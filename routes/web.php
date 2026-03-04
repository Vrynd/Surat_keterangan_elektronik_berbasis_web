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

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
   Route::inertia('admin/add-letter', 'admin/add-letter')->name('admin.add.letter');
   Route::inertia('admin/edit-letter', 'admin/edit-letter')->name('admin.edit.letter');
});


require __DIR__ . '/settings.php';
