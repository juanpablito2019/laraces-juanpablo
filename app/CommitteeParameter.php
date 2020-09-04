<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommitteeParameter extends Model
{
    protected $fillable = [
        'id',
        'name',
        'content',
        'act_template_id'
    ];

    public function actTemplate()
    {
        return $this->belongsTo(ActTemplate::class);
    }
}
