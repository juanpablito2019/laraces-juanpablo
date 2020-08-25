<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;

class FormativeMeasureRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:6', 'unique:formative_measures']
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $formative_measure = $this->route()->parameter('formative_measure');
            $rules['name'] = [
                'required',
                'string',
                'min:6',
                Rule::unique('formative_measures')->ignore($formative_measure)
            ];

        }
        return $rules;
    }

    public function attributes(){
        return  [
            'name' => 'nombre'
        ];
    }

    public function response(array $errors)
    {
        if ($this->forceJsonResponse || $this->ajax() || $this->wantsJson()) {
            return new JsonResponse($errors);
        }
    }
}
