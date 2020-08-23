<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;

class CommitteeSessionRequest extends FormRequest
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
            'complainer_id' => ['integer', 'exists:complainers,id'],
            'committee_id' => ['required', 'integer', 'exists:committees,id'],
            'committee_session_state_id' => ['integer', 'exists:committee_session_states,id'],
            'learners' => ['required', 'array'],
            'infringement_type_id' => ['required', 'integer', 'exists:infringement_types,id'],
            'infringement_classification_id' => ['integer', 'exists:infringement_classifications,id'],
            'act_sanction_id' => ['integer', 'exists:sanctions,id'],
            'place' => ['string'],
            'start_hour' => ['date_format:H:i'],
            'end_hour' => ['date_format:H:i', 'after:start_hour'],
            'date_academic_act_sanction' => ['date'],
            'date_notification_act_sanction' => ['date'],
            'date_expiration_act' => ['date'],
            'date_lifting_act_sanction' => ['date'],
            'saction_justification' => ['string'],
            'notification_acts' => ['string'],
            'notification_infringements' => ['string'],
            'committee_a_case_treat' => ['string'],
            'committee_a_type_discharge' => ['string'],
            'committee_a_discharges' => ['string'],
            'committee_a_clarification' => ['string'],
            'committe_b_valuation_discharges' => ['string'],
            'committe_b_existing_behavior' => ['string'],
            'committe_b_behavior_type' => ['string'],
            'committe_b_responsability_grade' => ['string'],
            'committe_b_infringement_classification' => ['string'],
            'committe_b_determination_sanction_recomendation' => ['string'],
            'act_sanction_acts_investigated' => ['string'],
            'act_sanction_discharges' => ['string'],
            'act_sanction_evidences' => ['string'],
            'act_sanction_evidences_analysis' => ['string'],
            'act_sanction_infringements' => ['string'],
            'act_sanction_responsability_grade' => ['string'],
            'act_sanction_definitive_infringement_classification' => ['string'],
            'act_sanction_infringement_type' => ['string'],
            'act_sanction_reasons' => ['string'],
            'act_sanction_notification' => ['string'],
            'act_sanction_committee_recomendation' => ['string'],
        ];

        return $rules;
    }
    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
