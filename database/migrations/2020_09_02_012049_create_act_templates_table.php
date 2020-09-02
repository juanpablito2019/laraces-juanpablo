<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('act_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->integer('version');
            $table->date('date');
            $table->boolean('is_active')->default(false);
            $table->string('path');
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
        Schema::dropIfExists('act_templates');
    }
}
