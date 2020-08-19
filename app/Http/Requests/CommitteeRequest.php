<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class CommitteeRequest extends FormRequest
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
            'record_number' => ['required', 'min: 3', 'string', 'unique:committees'],
            'date' => ['required', 'date'],
            'start_hour' => ['required', 'date_format:H:i'],
            'end_hour' => ['required', 'date_format:H:i', 'after:start_hour'],
            'place' => ['required', 'string'],
            'formation_center' => ['required', 'string'],
            'assistants' => ['required', 'string'],
            'subdirector_name'=>['required', 'string'],
            'qourum'=>['required', 'boolean']
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])){
            $committee = $this->route()->parameter('committee');
            $rules['record_number'] = [
                'required', 
                'string',
                'min:3',
                Rule::unique('committees')->ignore($committee)
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
