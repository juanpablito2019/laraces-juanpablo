<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;

class GeneralParameterRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:5', 'unique:general_parameters'],
            'content' => ['nullable', 'string']
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])){
            $general_parameter = $this->route()->parameter('general_parameter');
            $rules['name']=[
                'required',
                'string',
                'min:5',
                Rule::unique('general_parameters')->ignore($general_parameter)
            ];
        }

        return $rules;
    }

    public function attributes(){
        return  [
            'name' => 'nombre',
            'content' => 'contenido'
        ];
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
