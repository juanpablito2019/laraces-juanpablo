<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class FormationProgramTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules =  [
            'name' => ['required', 'string', 'min:5', 'unique:formation_program_types'],
            'elective_months' => ['required', 'integer'],
            'practice_months' => ['required', 'integer'],
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])){
            $formation_program_type = $this->route()->parameter('formation_program_type');
            $rules['name']=[
                'required',
                'string',
                'min:5',
                Rule::unique('formation_program_types')->ignore($formation_program_type)
            ];
        }

        return $rules;
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
