<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LetterType;
use App\Models\FormField;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;

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
    public function store(Request $request, $letterTypeId)
    {
        Log::info('FormFieldController@store hit', [
            'letter_type_id' => $letterTypeId,
            'has_fields' => $request->has('fields'),
            'field_count' => is_array($request->input('fields')) ? count($request->input('fields')) : 0
        ]);

        $letterType = LetterType::findOrFail($letterTypeId);

        $validated = $request->validate([
            'fields' => 'required|array',
            'fields.*.label' => 'required|string',
            'fields.*.name' => 'required|string',
            'fields.*.type' => 'required|string',
            'fields.*.placeholder' => 'nullable|string',
            'fields.*.data_type' => 'required|string',
            'fields.*.options' => 'nullable|array',
            'fields.*.validation_rules' => 'nullable|string',
            'fields.*.order_position' => 'required|integer',
            'fields.*.is_required' => 'nullable|boolean',
            'fields.*.is_full_width' => 'nullable|boolean',
        ]);

        try {
            // Delete existing and recreate
            $letterType->fields()->delete();

            foreach ($validated['fields'] as $fieldData) {
                // Ensure defaults for missing UI settings
                $is_required = $fieldData['is_required'] ?? false;
                $is_full_width = $fieldData['is_full_width'] ?? true;

                $letterType->fields()->create([
                    'label' => $fieldData['label'],
                    'name' => $fieldData['name'],
                    'type' => $fieldData['type'],
                    'placeholder' => $fieldData['placeholder'] ?? '',
                    'data_type' => $fieldData['data_type'],
                    'options' => $fieldData['options'] ?? null,
                    'validation_rules' => $fieldData['validation_rules'] ?? null,
                    'order_position' => $fieldData['order_position'],
                    'is_required' => $is_required,
                    'is_full_width' => $is_full_width,
                ]);
            }

            Log::info('Successfully stored fields for LetterType: ' . $letterType->id);
            return redirect()->back()->with('success', 'Formulir berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('Error storing fields: ' . $e->getMessage(), ['exception' => $e]);
            return back()->with('error', 'Gagal menyimpan: ' . $e->getMessage());
        }
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
            'validation_rules' => 'nullable|string',
            'order_position' => 'required|integer',
            'is_required' => 'nullable|boolean',
            'is_full_width' => 'nullable|boolean',
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
