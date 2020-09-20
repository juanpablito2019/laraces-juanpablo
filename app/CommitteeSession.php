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

	public function committeeSessionParameters()
	{
		return $this->belongsToMany(CommitteeParameter::class, 'committee_parameter_committee_session', 'session_id', 'parameter_id')->withPivot('description');
	}

	public function committeeSessionState()
	{
		return $this->belongsTo(CommitteeSessionState::class);
	}
}
