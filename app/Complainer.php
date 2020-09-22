<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Complainer extends Model
{
    protected $fillable = [
        'name',
        'document_type',
        'document'
    ];
}
