<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormationProgram extends Model
{
    protected $fillable = [
        'id',
        'name',
        'code',
        'formation_program_type_id'
    ];

    public function formationProgramType()
    {
        return $this->belongsTo(FormationProgramType::class);
    }
}
