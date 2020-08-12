<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'id',
        'code_tab',
        'modality_id',
        'formation_program_id',
        'quantity_learners',
        'active_learners',
        'elective_start_date',
        'elective_end_date',
        'practice_start_date',
        'practice_end_date',
    ];

    public function formationProgram()
    {
        return $this->belongsTo(FormationProgram::class);
    }

    public function learners()
    {
        return $this->hasMany(Learner::class);
    }

    public function modality()
    {
        return $this->belongsTo(Modality::class);
    }
}
