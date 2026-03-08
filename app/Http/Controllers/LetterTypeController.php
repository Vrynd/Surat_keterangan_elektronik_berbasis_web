<?php

namespace App\Http\Controllers;

use App\Models\LetterType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LetterTypeController extends Controller
{
   /**
    * Display a listing of the resource.
    */
   public function index()
   {
      $services = LetterType::all();
      /** @var \App\Models\User $user */
      $user = \Illuminate\Support\Facades\Auth::user();

      if ($user->role === 'admin') {
         return Inertia::render('admin/dashboard', [
            'services' => $services
         ]);
      }

      return Inertia::render('client/dashboard', [
         'services' => $services
      ]);
   }

   /**
    * Show the form for creating a new resource.
    */
   public function create()
   {
      $lastLetter = LetterType::latest()->first();

      return Inertia::render('admin/add-letter', [
         'lastAddedDate' => $lastLetter ? $lastLetter->created_at : null
      ]);
   }

   /**
    * Show the form for editing the specified resource.
    */
   public function edit()
   {
      return Inertia::render('admin/edit-letter', [
         'services' => LetterType::all()
      ]);
   }

   /**
    * Store a newly created resource in storage.
    */
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

   /**
    * Update the specified resource in storage.
    */
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

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(LetterType $letterType)
   {
      $letterType->delete();

      return redirect()->route('admin.dashboard')->with('success', 'Surat keterangan berhasil dihapus.');
   }

   /**
    * Display the submission form for a specific letter type for clients.
    */
   public function submissionForm(Request $request)
   {
      $type = $request->query('type');
      $id = $request->query('id');

      if ($id) {
         $letterType = LetterType::with('fields')->findOrFail($id);
      } else {
         // Fallback to searching by slugified name if ID is not provided
         $letterType = LetterType::with('fields')->get()->first(function ($item) use ($type) {
            return \Illuminate\Support\Str::slug($item->name) === $type;
         });

         if (!$letterType) {
            abort(404);
         }
      }

      return Inertia::render('client/submission-letter', [
         'letterType' => $letterType,
         'fields' => $letterType->fields
      ]);
   }
}
