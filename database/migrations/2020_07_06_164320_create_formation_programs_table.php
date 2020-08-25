<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormationProgramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formation_programs', function (Blueprint $table) {
            $table->id();
            $table->string('code',150)->unique();
            $table->string('name',150)->unique();
            $table->foreignId('formation_program_type_id')->references('id')->on('formation_program_types');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formation_programs');
    }
}
