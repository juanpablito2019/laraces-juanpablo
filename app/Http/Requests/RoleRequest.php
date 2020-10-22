<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:5', 'unique:roles']
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $role = $this->route()->parameter('role');
            $rules['name'] = [
                'required',
                'string',
                'min:5',
                Rule::unique('roles')->ignore($role)
            ];
        }
        return $rules;
    }

    public function attributes()
    {
        return [
            'name' => 'nombre'
        ];
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }

}
