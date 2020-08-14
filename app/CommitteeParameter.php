<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommitteeParameter extends Model
{
    protected $fillable = [
        'id',
        'name',
        'content',
        'committee_session_state_id'
    ];

    public function committeeSessionState()
    {
        return $this->belongsTo(CommitteeSessionState::class);
    }
}
