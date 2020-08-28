<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormativeMeasureResponsiblesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formative_measure_responsibles', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('misena_email')->unique();
            $table->string('institutional_email')->unique()->nullable();
            $table->string('document_type');
            $table->string('document');
            $table->date('birthdate');
            $table->string('phone')->unique()->nullable();
            $table->string('phone_ip')->nullable();
            $table->enum('gender', ['M', 'F']);
            $table->foreignId('position_id')->references('id')->on('positions');
            $table->foreignId('contract_type_id')->references('id')->on('contract_types');
            $table->string('type');
            $table->string('photo')->nullable();
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
        Schema::dropIfExists('formative_measure_responsibles');
    }
}
