<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActTemplate extends Model
{
    protected $fillable = [
        'committee_session_state_id',
        'version',
        'date',
        'path',
        'is_active'
    ];

    public function committeeSessionState()
    {
        return $this->belongsTo(CommitteeSessionState::class);
    }

    public function parameters()
    {
        return $this->hasMany(CommitteeParameter::class);
    }
}
