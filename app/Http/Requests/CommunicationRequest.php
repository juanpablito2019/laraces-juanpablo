<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;

class CommunicationRequest extends FormRequest
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
            'notification_acts'=>['required', 'string'],
            'notification_infringements' => ['required', 'string'],
            'infringement_type_id'=>['required', 'integer', 'exists:infringement_types,id'],
            'infringement_classification_id'=>['required', 'integer', 'exists:infringement_classifications,id'],
            'start_hour'=>['required', 'date_format:H:i']
        ];
    }

    public function attributes()
    {
        return [
            'notification_acts'=>'RELACIÓN SUSCINTA DEL INFORME O DE LA QUEJA PRESENTADA',
            'notification_infringements' => 'NORMAS DEL REGLAMENTO DEL APRENDIZ SENA QUE PRESUNTAMENTE INFRINGIÓ(ERON) EL (LOS) APRENDIZ(CES) CON ESOS HECHOS U OMISIONES',
            'start_hour'=>'HORA DE CITACION',
            'infringement_classification_id' => 'CALIFICACIÓN PROVISIONAL DE LA(S) PROBABLE(S) FALTA(S)'
        ];
    }

    public function response(array $errors)
    {
        if ($this->forceJsonResponse || $this->ajax() || $this->wantsJson()) {
            return new JsonResponse($errors);
        }
    }
}
