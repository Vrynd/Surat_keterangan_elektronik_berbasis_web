<?php

namespace App\Http\Controllers;

use App\Models\LetterRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LetterRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = LetterRequest::with(['user', 'letterType'])
            ->orderByDesc('submitted_at');

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by user name or letter type name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('letterType', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            });
        }

        $requests = $query->paginate($request->input('per_page', 8))->withQueryString();

        // Count by status (unfiltered)
        $counts = [
            'all' => LetterRequest::count(),
            'pending' => LetterRequest::where('status', 'pending')->count(),
            'approved' => LetterRequest::where('status', 'approved')->count(),
            'rejected' => LetterRequest::where('status', 'rejected')->count(),
        ];

        return Inertia::render('admin/letter-request', [
            'requests' => $requests,
            'counts' => $counts,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    public function updateStatus(Request $request, LetterRequest $letterRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $letterRequest->update([
            'status' => $validated['status'],
            'reviewed_at' => $validated['status'] !== 'pending' ? now() : null,
        ]);

        return back()->with('success', 'Status pengajuan berhasil diperbarui.');
    }
}
