<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('code_tab')->unique();
            $table->foreignId('modality_id')->references('id')->on('modalities');
            $table->foreignId('formation_program_id')->references('id')->on('formation_programs');
            $table->integer('quantity_learners');
            $table->integer('active_learners');
            $table->date('elective_start_date');
            $table->date('elective_end_date');
            $table->date('practice_start_date');
            $table->date('practice_end_date');
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
        Schema::dropIfExists('groups');
    }
}
