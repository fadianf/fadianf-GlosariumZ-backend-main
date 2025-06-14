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
        Schema::create('istilah', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kata');
            $table->string('emoji');
            $table->string('terkait');
            $table->string('kelas_kata');
            $table->string('sinonim');
            $table->text('deskripsi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('istilah');
    }
};
