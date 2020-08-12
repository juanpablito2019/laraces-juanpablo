<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class FormationProgramRequest extends FormRequest
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
        $rules = [
            'code' => ['required', 'string', 'min:5', 'unique:formation_programs'],
            'name' => ['required', 'string', 'min:5', 'unique:formation_programs'],
            'formation_program_type_id' => ['required','integer', 'exists:formation_program_types,id'],
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])){
            $formation_program = $this->route()->parameter('formation_program');
            $rules['code']=[
                'required',
                'string',
                'min:5',
                Rule::unique('formation_programs')->ignore($formation_program)
            ];
            $rules['name']=[
                'required',
                'string',
                'min:5',
                Rule::unique('formation_programs')->ignore($formation_program)
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
