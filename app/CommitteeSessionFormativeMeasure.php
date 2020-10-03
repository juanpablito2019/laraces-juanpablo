<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CommitteeSessionFormativeMeasure extends Pivot
{
    protected $table = 'committee_session_formative_measures';

    public function formativeMeasure()
    {
        return $this->belongsTo(FormativeMeasure::class, 'measure_id');
    }
}
