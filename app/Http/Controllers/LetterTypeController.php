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

      return Inertia::render('client/dashboard', [
         'services' => $services
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

      return redirect()->route('dashboard')->with('success', 'Surat keterangan berhasil ditambahkan.');
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

      return redirect()->route('dashboard')->with('success', 'Surat keterangan berhasil diperbarui.');
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(LetterType $letterType)
   {
      $letterType->delete();

      return redirect()->route('dashboard')->with('success', 'Surat keterangan berhasil dihapus.');
   }
}
