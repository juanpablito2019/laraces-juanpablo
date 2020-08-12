<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearnerNoveltiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learner_novelties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learner_id')->references('id')->on('learners');
            $table->foreignId('committee_id')->references('id')->on('committees');
            $table->foreignId('novelty_type_id')->references('id')->on('novelty_types');
            $table->longText('justification');
            $table->date('reply_date')->nullable();
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
        Schema::dropIfExists('learner_novelties');
    }
}
