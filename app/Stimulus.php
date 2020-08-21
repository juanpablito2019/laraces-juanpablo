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
}
