<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   /**
    * Run the migrations.
    */
   public function up(): void
   {
      Schema::create('letter_types', function (Blueprint $table) {
         $table->id();
         $table->string('code')->unique();
         $table->string('name');
         $table->enum('category', ['kependudukan', 'ekonomi', 'sosial']);
         $table->text('description');
         $table->string('processing_time');
         $table->string('validity_period');
         $table->boolean('is_active')->default(true);
         $table->timestamps();
      });
   }

   /**
    * Reverse the migrations.
    */
   public function down(): void
   {
      Schema::dropIfExists('letter_types');
   }
};
