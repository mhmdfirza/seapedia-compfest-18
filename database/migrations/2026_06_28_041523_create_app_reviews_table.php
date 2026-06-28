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
        Schema::create('app_reviews', function (Blueprint $table) {
            $table->id();
            $table->string('reviewer_name');
            $table->integer('rating')->default(5);
            $table->text('comment');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('ip_address')->nullable();
            $table->timestamps();
            
            // Check constraint will be added in native DB flavor or through logic.
            // For Postgres, we can do a raw check constraint.
            \DB::statement('ALTER TABLE app_reviews ADD CONSTRAINT rating_check CHECK (rating >= 1 AND rating <= 5)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_reviews');
    }
};
