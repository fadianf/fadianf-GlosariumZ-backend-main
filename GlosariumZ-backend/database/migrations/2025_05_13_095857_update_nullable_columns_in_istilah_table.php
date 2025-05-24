<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateNullableColumnsInIstilahTable extends Migration
{
    public function up()
    {
        Schema::table('istilah', function (Blueprint $table) {
            $table->string('emoji')->nullable()->change();
            $table->string('sinonim')->nullable()->change();
            $table->string('terkait')->nullable()->change();
            $table->string('kelas_kata')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('istilah', function (Blueprint $table) {
            $table->string('emoji')->nullable(false)->change();
            $table->string('sinonim')->nullable(false)->change();
            $table->string('terkait')->nullable(false)->change();
            $table->string('kelas_kata')->nullable(false)->change();
        });
    }
}