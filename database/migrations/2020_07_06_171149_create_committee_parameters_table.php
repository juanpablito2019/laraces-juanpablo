<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteeParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committee_parameters', function (Blueprint $table) {
            $table->id();
            $table->string('name',150)->unique();
            $table->longText('content');
            $table->foreignId('committee_session_state_id')->references('id')->on('committee_session_states');
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
        Schema::dropIfExists('committee_parameters');
    }
}
