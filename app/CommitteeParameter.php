<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommitteeParameter extends Model
{
    protected $fillable = [
        'id',
        'name',
        'content',
        'act_template_id',
        'slug'
    ];

    public function actTemplate()
    {
        return $this->belongsTo(ActTemplate::class);
    }

    public function committeeSessions()
    {
        return $this->belongsToMany(CommitteeSession::class, 'committee_parameter_committee_session', 'parameter_id', 'session_id')->withPivot('description');
    }
}
