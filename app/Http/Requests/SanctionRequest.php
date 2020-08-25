<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;

class SanctionRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:5', 'unique:sanctions']
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $sanction = $this->route()->parameter('sanction');
            $rules['name'] = [
                'required',
                'string',
                'min:5',
                Rule::unique('sanctions')->ignore($sanction)
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
