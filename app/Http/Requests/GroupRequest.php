<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class GroupRequest extends FormRequest
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
            'code_tab' => ['required', 'string', 'min:5', 'unique:groups'],
            'modality_id' => ['required', 'integer', 'exists:modalities,id'],
            'formation_program_id' => ['required', 'integer', 'exists:formation_programs,id'],
            'quantity_learners' => ['required', 'integer'],
            'active_learners' => ['required', 'integer'],
            'elective_start_date' => ['required', 'date', 'before:elective_end_date'],
            'elective_end_date' => ['required', 'date', 'after:elective_start_date',],
            'practice_start_date' => ['required', 'date', 'before:practice_end_date'],
            'practice_end_date' => ['required', 'date', 'after:practice_start_date'],
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])){
            $group = $this->route()->parameter('group');
            $rules['code_tab'] = [
                'required', 
                'string',
                'min:3',
                Rule::unique('groups')->ignore($group)
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
