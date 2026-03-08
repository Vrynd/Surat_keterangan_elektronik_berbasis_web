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
        Schema::create('form_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('letter_type_id')->constrained()->onDelete('cascade');
            $table->string('label');
            $table->string('name'); // field name for form handling
            $table->string('type'); // input, select, textarea, etc.
            $table->string('placeholder')->nullable();
            $table->string('data_type')->default('string'); // string, number, date
            $table->json('options')->nullable(); // For select, dropdown
            $table->json('validation_rules')->nullable();
            $table->integer('order_position')->default(0);
            $table->boolean('is_required')->default(false);
            $table->boolean('is_full_width')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_fields');
    }
};
