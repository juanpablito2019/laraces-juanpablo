<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committees', function (Blueprint $table) {
            $table->id();
            $table->string('record_number',150)->unique();
            $table->date('date');
            $table->longText('assistants');
            $table->string('subdirector_name');
            $table->boolean('qourum');
            $table->time('start_hour');
            $table->time('end_hour');
            $table->string('place');
            $table->string('formation_center');
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
        Schema::dropIfExists('committees');
    }
}
