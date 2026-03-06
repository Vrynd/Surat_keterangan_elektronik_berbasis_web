<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Features;

use App\Http\Controllers\LetterTypeController;

Route::inertia('/', 'welcome', [
   'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('dashboard', function () {
   if (Auth::user()->role === 'admin') {
      return redirect()->route('admin.dashboard');
   }
   return redirect()->route('dashboard');
})->middleware(['auth', 'verified']);

Route::middleware(['auth', 'verified', 'role:user'])->prefix('client')->group(function () {
   Route::get('dashboard', [LetterTypeController::class, 'index'])->name('dashboard');
   Route::inertia('submission-letter', 'client/submission-letter')->name('submission.letter');
   Route::inertia('my-letters', 'client/my-letter')->name('my-letters');
   Route::inertia('reviews', 'client/review')->name('reviews');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
   Route::get('dashboard', [LetterTypeController::class, 'index'])->name('admin.dashboard');
   Route::get('add-letter', [LetterTypeController::class, 'create'])->name('admin.add.letter');
   Route::get('edit-letter', [LetterTypeController::class, 'edit'])->name('admin.edit.letter');

   Route::post('letter-types', [LetterTypeController::class, 'store'])->name('admin.letter-types.store');
   Route::put('letter-types/{letterType}', [LetterTypeController::class, 'update'])->name('admin.letter-types.update');
   Route::delete('letter-types/{letterType}', [LetterTypeController::class, 'destroy'])->name('admin.letter-types.destroy');
});


require __DIR__ . '/settings.php';
