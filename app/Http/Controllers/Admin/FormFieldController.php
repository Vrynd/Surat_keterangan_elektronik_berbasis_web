<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LetterType;
use App\Models\FormField;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormFieldController extends Controller
{
    /**
     * Display the form builder for a specific letter type.
     */
    public function index(Request $request)
    {
        $id = $request->query('id');
        $letterType = LetterType::with('fields')->findOrFail($id);

        return Inertia::render('admin/manage-forms', [
            'letterType' => $letterType,
            'fields' => $letterType->fields
        ]);
    }

    /**
     * Store form fields for a specific letter type.
     */
    public function store(Request $request, LetterType $letterType)
    {
        $validated = $request->validate([
            'fields' => 'required|array',
            'fields.*.label' => 'required|string',
            'fields.*.name' => 'required|string',
            'fields.*.type' => 'required|string',
            'fields.*.placeholder' => 'nullable|string',
            'fields.*.data_type' => 'required|string',
            'fields.*.options' => 'nullable|array',
            'fields.*.validation_rules' => 'nullable|array',
            'fields.*.order_position' => 'required|integer',
            'fields.*.is_required' => 'required|boolean',
            'fields.*.is_full_width' => 'required|boolean',
        ]);

        // Delete existing and recreate
        $letterType->fields()->delete();

        foreach ($validated['fields'] as $fieldData) {
            $letterType->fields()->create($fieldData);
        }

        return back()->with('success', 'Formulir berhasil diperbarui.');
    }

    /**
     * Update an individual form field.
     */
    public function update(Request $request, FormField $formField)
    {
        $validated = $request->validate([
            'label' => 'required|string',
            'name' => 'required|string',
            'type' => 'required|string',
            'placeholder' => 'nullable|string',
            'data_type' => 'required|string',
            'options' => 'nullable|array',
            'validation_rules' => 'nullable|array',
            'order_position' => 'required|integer',
            'is_required' => 'required|boolean',
            'is_full_width' => 'required|boolean',
        ]);

        $formField->update($validated);

        return back()->with('success', 'Field berhasil diperbarui.');
    }

    /**
     * Delete an individual form field.
     */
    public function destroy(FormField $formField)
    {
        $formField->delete();

        return back()->with('success', 'Field berhasil dihapus.');
    }
}
