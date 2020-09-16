<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteeSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committee_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('complainer_id')->nullable()->references('id')->on('complainers');
            $table->foreignId('committee_id')->nullable()->references('id')->on('committees');
            $table->foreignId('committee_session_state_id')->nullable()->references('id')->on('committee_session_states');
            $table->foreignId('learner_id')->references('id')->on('learners');
            $table->foreignId('infringement_type_id')->nullable()->references('id')->on('infringement_types');
            $table->foreignId('infringement_classification_id')->nullable()->references('id')->on('infringement_classifications');
            $table->foreignId('act_sanction_id')->nullable()->references('id')->on('sanctions');
            $table->string('place')->nullable();
            $table->time('start_hour')->nullable();
            $table->time('end_hour')->nullable();
            $table->date('date_academic_act_sanction')->nullable();
            $table->date('date_notification_act_sanction')->nullable();
            $table->date('date_expiration_act_sanction')->nullable();
            $table->date('date_lifting_act_sanction')->nullable();
            $table->string('discharge_type')->nullable();
            $table->longText('objectives')->nullable();
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
        Schema::dropIfExists('committee_sessions');
    }
}
