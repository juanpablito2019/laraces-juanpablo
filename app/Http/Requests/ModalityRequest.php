<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ModalityRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'unique:modalities']
        ];

        // if(in_array($this->method(), ['PUT', 'PATCH'])){
        //     $modality = $this->route()->parameter('modality');
        //     $rules['name'] = [
        //         'required', 
        //         'string',
        //         'min:3',
        //         Rule::unique('modalities')->ignore($modality)
        //     ];
        // }

        return $rules;
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
