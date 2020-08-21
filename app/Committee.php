<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Committee extends Model
{
    protected $fillable = [
        'record_number',
        'date',
        'start_hour',
        'end_hour',
        'place',
        'formation_center',
        'assistants',
        'subdirector_name',
        'qourum'
    ];

    public function committeeSessions()
    {
        return $this->hasMany(CommitteeSession::class);
    }
}
