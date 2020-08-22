<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class InfringementClassificationRequest extends FormRequest
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
            'name' => ['required','string','min:4','unique:infringement_classifications']
        ];

        if (in_array($this->method(), ['PAT','PATCH'])) {
            $infringement_classification = $this->route()->parameter('infringement_classification');
            $rules['name'] = [
                'required',
                'string',
                'min:4',
                Rule::unique('infringement_classifications')->ignore($infringement_classification)
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

    public function response(array $errors) {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
