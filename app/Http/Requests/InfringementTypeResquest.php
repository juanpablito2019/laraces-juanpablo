<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class InfringementTypeResquest extends FormRequest
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
            'name' => ['required','string','min:5','unique:infringement_types']
        ];

        if (in_array($this->method(), ['PUT','PATCH'])) {
            $infringement_type = $this->route()->parameter('infringement_type');
            $rules['name'] = [
                'required',
                'string',
                'min:5',
                Rule::unique('infringement_types')->ignore($infringement_type)
            ];
        }

        return $rules;
    }

    public function attributes()
    {
        return [
            'name' => 'nombre',
            'type' => 'tipo'
        ];
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
