<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActTemplate extends Model
{
    protected $fillable = [
        'name',
        'version',
        'date',
        'path',
        'is_active'
    ];
}
