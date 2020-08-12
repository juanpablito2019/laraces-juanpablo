<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteeSessionFormativeMeasuresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committee_session_formative_measures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->references('id')->on('committee_sessions');
            $table->foreignId('measure_id')->references('id')->on('formative_measures');
            $table->foreignId('responsble_id')->references('id')->on('formative_measure_responsibles');
            $table->longText('description');
            $table->string('state');
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
        Schema::dropIfExists('committee_session_formative_measures');
    }
}
