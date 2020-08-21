<?php

namespace App\Http\Requests;

use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CommitteeParameterRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:5', 'unique:committee_parameters'],
            'content' => ['required', 'string'],
            'committee_session_state_id' => ['required','integer', 'exists:committee_session_states,id'],
        ];
        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $committee_parameter  = $this->route()->parameter('committee_parameter');
            $rules['name'] = [
                'required',
                'string',
                'min:5',
                Rule::unique('committee_parameters')->ignore($committee_parameter)
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
