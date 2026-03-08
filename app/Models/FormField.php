<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormField extends Model
{
    protected $fillable = [
        'letter_type_id',
        'label',
        'name',
        'type',
        'placeholder',
        'data_type',
        'options',
        'validation_rules',
        'order_position',
        'is_required',
        'is_full_width',
    ];

    protected $casts = [
        'options' => 'array',
        'validation_rules' => 'array',
        'is_required' => 'boolean',
        'is_full_width' => 'boolean',
    ];

    public function letterType(): BelongsTo
    {
        return $this->belongsTo(LetterType::class);
    }
}
