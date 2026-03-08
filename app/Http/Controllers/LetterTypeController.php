<?php

namespace App\Http\Controllers;

use App\Models\LetterType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LetterTypeController extends Controller
{
   public function index()
   {
      $services = LetterType::all();
      /** @var \App\Models\User $user */
      $user = Auth::user();

      if ($user->role === 'admin') {
         return Inertia::render('admin/dashboard', [
            'services' => $services
         ]);
      }

      return Inertia::render('client/dashboard', [
         'services' => $services
      ]);
   }

   public function create()
   {
      $lastLetter = LetterType::latest()->first();

      return Inertia::render('admin/add-letter', [
         'lastAddedDate' => $lastLetter ? $lastLetter->created_at : null
      ]);
   }

   public function edit()
   {
      return Inertia::render('admin/edit-letter', [
         'services' => LetterType::all()
      ]);
   }

   public function store(Request $request)
   {
      $validated = $request->validate([
         'code' => 'required|string|unique:letter_types,code',
         'name' => 'required|string',
         'category' => 'required|in:kependudukan,ekonomi,sosial',
         'description' => 'required|string',
         'processing_time' => 'required|string',
      ]);

      LetterType::create($validated);

      return redirect()->route('admin.dashboard')->with('success', 'Surat keterangan berhasil ditambahkan.');
   }

   public function update(Request $request, LetterType $letterType)
   {
      $validated = $request->validate([
         'code' => 'required|string|unique:letter_types,code,' . $letterType->id,
         'name' => 'required|string',
         'category' => 'required|in:kependudukan,ekonomi,sosial',
         'description' => 'required|string',
         'processing_time' => 'required|string',
      ]);

      $letterType->update($validated);

      return redirect()->route('admin.dashboard')->with('success', 'Surat keterangan berhasil diperbarui.');
   }

   public function destroy(LetterType $letterType)
   {
      $letterType->delete();

      return redirect()->route('admin.dashboard')->with('success', 'Surat keterangan berhasil dihapus.');
   }
}
