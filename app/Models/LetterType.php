<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LetterType extends Model
{
   protected $fillable = [
      'code',
      'name',
      'category',
      'description',
      'processing_time',
      'validity_period',
      'is_active',
   ];

   public function fields()
   {
      return $this->hasMany(FormField::class)->orderBy('order_position');
   }
}
