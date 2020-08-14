<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;

class CommitteeSessionTypeRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:5', 'unique:committee_session_types']
        ];
        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $committee_session_type  = $this->route()->parameter('committee_session_type');
            $rules['name'] = [
                'required',
                'string',
                'min:5',
                Rule::unique('committee_session_types')->ignore($committee_session_type)
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
