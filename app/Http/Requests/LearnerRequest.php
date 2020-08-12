<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class LearnerRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3'],
            'document_type' => ['required', 'string', 'max:3'],
            'document' => ['required', 'string', 'unique:learners'],
            'phone' => ['required', 'string', 'unique:learners'],
            'email' => ['required', 'string', 'unique:learners'],
            'group_id' => ['required', 'integer', 'exists:groups,id'],
            'birthdate' => ['date'],
            'photo' => ['file', 'max:5000']
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])){
            $user = $this->route()->parameter('learner');
            $rules['document'] = [
                'required',
                'string',
                Rule::unique('learners')->ignore($user)
            ];
            $rules['phone'] = [
                'required',
                'string',
                Rule::unique('learners')->ignore($user)
            ];
            $rules['email'] = [
                'required',
                'string',
                Rule::unique('learners')->ignore($user)
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
