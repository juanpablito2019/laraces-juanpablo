<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormativeMeasureResponsible extends Model
{
    protected $fillable = [
        'username',
        'misena_email',
        'institutional_email',
        'document_type',
        'document',
        'birthdate',
        'phone',
        'phone_ip',
        'gender',
        'position_id',
        'contract_type_id',
        'type',
        'photo',
        'state'
    ];

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function contractType()
    {
        return $this->belongsTo(ContractType::class);
    }
}
