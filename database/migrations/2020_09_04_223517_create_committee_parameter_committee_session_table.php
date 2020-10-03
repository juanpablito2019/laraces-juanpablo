<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteeParameterCommitteeSessionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committee_parameter_committee_session', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parameter_id')->references('id')->on('committee_parameters');
            $table->foreignId('session_id')->references('id')->on('committee_sessions');
            $table->longText('description')->nullable();
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
        Schema::dropIfExists('committee_parameter_committee_session');
    }
}
