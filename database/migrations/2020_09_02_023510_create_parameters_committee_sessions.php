<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParametersCommitteeSessions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parameters_committee_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parameter_id')->references('id')->on('committee_parameters');
            $table->foreignId('committee_session_id')->references('id')->on('committee_sessions');
            $table->longText('description');
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
        Schema::dropIfExists('parameters_committee_sessions');
    }
}
