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
            'committee_session_state_id' => ['required', 'integer', 'exists:committee_session_states,id'],
            'version' => ['required', 'integer'],
            'date' => ['required', 'date'],
            'file' => ['required', 'max:5000'],
            'is_active' => ['required', 'boolean']
        ];
        return $rules;
    }

    public function response(array $errors)
    {
        if ($this->forceJsonResponse || $this->ajax() || $this->wantsJson()) {
            return new JsonResponse($errors);
        }
    }
}
