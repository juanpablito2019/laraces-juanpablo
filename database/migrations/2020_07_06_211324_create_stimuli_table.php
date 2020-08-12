<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStimuliTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stimuli', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learner_id')->references('id')->on('learners');
            $table->foreignId('committee_id')->references('id')->on('committees');
            $table->string('stimulus');
            $table->longText('justification');
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
        Schema::dropIfExists('stimuli');
    }
}
