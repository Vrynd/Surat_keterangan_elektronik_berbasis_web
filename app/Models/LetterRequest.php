<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LetterRequest extends Model
{
    protected $fillable = [
        'user_id',
        'letter_type_id',
        'form_data',
        'status',
        'admin_notes',
        'submitted_at',
        'reviewed_at',
    ];

    protected function casts(): array
    {
        return [
            'form_data' => 'array',
            'submitted_at' => 'datetime',
            'reviewed_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function letterType()
    {
        return $this->belongsTo(LetterType::class);
    }
}
