<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class PositionRequest extends FormRequest
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
        return [
            'name' => ['required', 'string', 'min:5', 'unique:positions'],
            'type' => ['required', 'string', 'min:5'],
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $position = $this->route()->parameter('position');
            $rules['name'] = [
                'required',
                'string',
                'min:5',
                Rule::unique('positions')->ignore($position)
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
