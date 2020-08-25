<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommitteeSession extends Model
{
	protected $fillable = [
		'complainer_id',
		'committee_id',
		'committee_session_state_id',
		'learner_id',
		'infringement_type_id',
		'infringement_classification_id',
		'act_sanction_id',
		'place',
		'start_hour',
		'end_hour',
		'date_academic_act_sanction',
		'date_notification_act_sanction',
		'date_expiration_act',
		'date_lifting_act_sanction',
		'saction_justification',
		'notification_acts',
		'notification_infringements',
		'committee_a_case_treat',
		'committee_a_type_discharge',
		'committee_a_discharges',
		'committee_a_clarification',
		'committe_b_valuation_discharges',
		'committe_b_existing_behavior',
		'committe_b_behavior_type',
		'committe_b_responsability_grade',
		'committe_b_infringement_classification',
		'committe_b_determination_sanction_recomendation',
		'act_sanction_acts_investigated',
		'act_sanction_discharges',
		'act_sanction_evidences',
		'act_sanction_evidences_analysis',
		'act_sanction_infringements',
		'act_sanction_responsability_grade',
		'act_sanction_definitive_infringement_classification',
		'act_sanction_infringement_type',
		'act_sanction_reasons',
		'act_sanction_notification',
		'act_sanction_committee_recomendation',
	];
    public function committee()
    {
        return $this->belongsTo(Committee::class);
	}
	
	public function learner()
	{
		return $this->belongsTo(Learner::class);
	}

	public function infringementType()
	{
		return $this->belongsTo(InfringementType::class);
	}
}
