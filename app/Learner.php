<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Learner extends Model
{
    protected $fillable = [
        'name',
        'document_type',
        'document',
        'email',
        'birthdate',
        'phone',
        'group_id',
        'status'
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function stimuli()
    {
        return $this->hasMany(Stimulus::class);
    }

    public function novelties()
    {
        return $this->hasMany(LearnerNovelty::class);
    }

    public function academics()
    {
        return $this->hasMany(CommitteeSession::class);
    }
}
