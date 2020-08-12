<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormationProgramType extends Model
{
    protected $fillable = [
        'id',
        'name',
        'elective_months',
        'practice_months'
    ];
}
