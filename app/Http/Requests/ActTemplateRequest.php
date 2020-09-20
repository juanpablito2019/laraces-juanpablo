<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ActTemplateRequest extends FormRequest
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
            'act_type' => ['required', 'string'],
            'version' => ['required', 'integer'],
            'date' => ['required', 'date'],
            'file' => ['required', 'max:5000'],
            'is_active' => ['required', 'boolean']
        ];
        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $rules['file'] = [
                'max:5000',
            ];
        }
        return $rules;
    }

    public function response(array $errors)
    {
        if ($this->forceJsonResponse || $this->ajax() || $this->wantsJson()) {
            return new JsonResponse($errors);
        }
    }
}
