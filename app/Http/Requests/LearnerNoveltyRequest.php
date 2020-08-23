<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;

class LearnerNoveltyRequest extends FormRequest
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
            'learner_id' => ['required', 'integer', 'exists:learners,id'],
            'committee_id' => ['required', 'integer', 'exists:committees,id'],
            'novelty_type_id'=>['required', 'integer', 'exists:novelty_types,id'],
            'justification' => ['required', 'string']
        ];

    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
