<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GeneralParameter extends Model
{
    protected $fillable = [
        'id',
        'name',
        'content'
    ];
}
