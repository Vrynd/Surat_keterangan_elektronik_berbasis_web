<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

use App\Http\Controllers\LetterTypeController;

Route::inertia('/', 'welcome', [
   'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
   Route::get('dashboard', [LetterTypeController::class, 'index'])->name('dashboard');
   Route::inertia('submission-letter', 'client/submission-letter')->name('submission.letter');
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
   Route::get('admin/add-letter', [LetterTypeController::class, 'create'])->name('admin.add.letter');
   Route::get('admin/edit-letter', [LetterTypeController::class, 'edit'])->name('admin.edit.letter');

   Route::post('admin/letter-types', [LetterTypeController::class, 'store'])->name('admin.letter-types.store');
   Route::put('admin/letter-types/{letterType}', [LetterTypeController::class, 'update'])->name('admin.letter-types.update');
   Route::delete('admin/letter-types/{letterType}', [LetterTypeController::class, 'destroy'])->name('admin.letter-types.destroy');
});


require __DIR__ . '/settings.php';
