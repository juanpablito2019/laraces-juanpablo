<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Learner;

class LearnerNovelty extends Model
{
    protected $fillable = [
    	'committee_id',
    	'learner_id',
    	'novelty_type_id',
    	'justification'
    ];

    public function learner()
    {
    	return $this->belongsTo(Learner::class);
    }

    public function committee()
    {
    	return $this->belongsTo(Committee::class);
    }

    public function noveltyType()
    {
    	return $this->belongsTo(NoveltyType::class);
    }
}
