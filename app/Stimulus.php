<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stimulus extends Model
{
    protected $fillable = [
        'learner_id',
        'committee_id',
        'stimulus',
        'justification'
    ];

    public function learner()
    {
        return $this->belongsTo(Learner::class);
    }

    public function committee()
    {
        return $this->belongsTo(Committee::class);
    }
}
