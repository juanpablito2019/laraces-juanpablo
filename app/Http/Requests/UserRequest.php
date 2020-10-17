<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;



class UserRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['string', 'min:8', 'confirmed'],
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $user = $this->route()->parameter('user');
            $rules['name'] = [
                'required',
                'string',
                'min:5',
                Rule::unique('users')->ignore($user)
            ];
        }
        return $rules;
    }

    public function attributes()
    {
        return [
            'name' => 'nombre',
            'email' => 'correo',
            'password' => 'contraseña'
        ];
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }

}
