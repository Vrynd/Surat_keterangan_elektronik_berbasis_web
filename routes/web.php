<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Features;

use App\Http\Controllers\LetterTypeController;
use App\Http\Controllers\FormFieldController;


Route::inertia('/', 'welcome', [
   'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('dashboard', function () {
   /** @var \App\Models\User $user */
   $user = Auth::user();

   if ($user->role === 'admin') {
      return redirect()->route('admin.dashboard');
   }

   return redirect()->route('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard.redirect');

Route::middleware(['auth', 'verified', 'role:user'])->prefix('client')->group(function () {
   Route::controller(LetterTypeController::class)->group(function () {
      Route::get('dashboard', 'index')->name('dashboard');
   });

   Route::controller(FormFieldController::class)->group(function () {
      Route::get('submission-letter', 'create')->name('submission.letter');
   });
   Route::inertia('my-letters', 'client/my-letter')->name('my-letters');
   Route::inertia('reviews', 'client/review')->name('reviews');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
   Route::controller(LetterTypeController::class)->group(function () {
      Route::get('dashboard', 'index')->name('admin.dashboard');
      Route::get('add-letter', 'create')->name('admin.add.letter');
      Route::get('edit-letter', 'edit')->name('admin.edit.letter');
      Route::post('letter-types', 'store')->name('admin.letter-types.store');
      Route::put('letter-types/{letterType}', 'update')->name('admin.letter-types.update');
      Route::delete('letter-types/{letterType}', 'destroy')->name('admin.letter-types.destroy');
   });

   Route::controller(FormFieldController::class)->group(function () {
      Route::get('manage-forms', 'index')->name('admin.manage.forms');
      Route::post('manage-forms/{id}/fields', 'store')->name('admin.manage.forms.store');
      Route::put('manage-forms/fields/{formField}', 'update')->name('admin.manage.forms.update');
      Route::delete('manage-forms/fields/{formField}', 'destroy')->name('admin.manage.forms.destroy');
   });
});

require __DIR__ . '/settings.php';
