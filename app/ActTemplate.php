<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActTemplate extends Model
{
    protected $fillable = [
        'act_type',
        'version',
        'date',
        'path',
        'is_active'
    ];
    public function parameters()
    {
        return $this->hasMany(CommitteeParameter::class);
    }

}
