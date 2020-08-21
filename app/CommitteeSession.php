<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommitteeSession extends Model
{
    //

    public function committee()
    {
        return $this->belongsTo(Committee::class);
    }
}
