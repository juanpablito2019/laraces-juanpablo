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
            $table->string('sanction_justification')->nullable();
            $table->longText('notification_acts')->nullable();
            $table->longText('notification_infringements')->nullable();
            $table->longText('committee_a_case_treat')->nullable();
            $table->longText('committee_a_type_discharge')->nullable();
            $table->longText('committee_a_discharges')->nullable();
            $table->longText('committee_a_clarification')->nullable();
            $table->longText('committee_b_valuation_discharges')->nullable();
            $table->longText('committee_b_existing_behavior')->nullable();
            $table->longText('committee_b_behavior_type')->nullable();
            $table->longText('committee_b_responsibility_grade')->nullable();
            $table->longText('committee_b_infringement_classification')->nullable();
            $table->longText('committee_b_determination_sanction_recomendation')->nullable();
            $table->longText('act_sanction_acts_investigated')->nullable();
            $table->longText('act_sanction_discharges')->nullable();
            $table->longText('act_sanction_evidences')->nullable();
            $table->longText('act_sanction_evidence_analysis')->nullable();
            $table->longText('act_sanction_infringements')->nullable();
            $table->longText('act_sanction_responsibility_grade')->nullable();
            $table->longText('act_sanction_definitive_infringement_classification')->nullable();
            $table->longText('act_sanction_infringement_type')->nullable();
            $table->longText('act_sanction_reasons')->nullable();
            $table->longText('act_sanction_notification')->nullable();
            $table->longText('act_sanction_committee_recomendation')->nullable();
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
