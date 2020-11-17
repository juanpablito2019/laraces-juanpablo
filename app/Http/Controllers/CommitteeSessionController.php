<?php

namespace App\Http\Controllers;

use Exception;
use App\Committee;
use App\Complainer;
use App\Http\Requests\SaveSanctionRequest;
use App\ActTemplate;
use App\CommitteeSession;
use HTMLtoOpenXML\Parser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\TemplateProcessor;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\CommitteeSessionRequest;

class CommitteeSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [CommitteeSession::class]);
        return CommitteeSession::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommitteeSessionRequest $request)
    {
        $this->authorize('create', [CommitteeSession::class]);
        $learners = $request->get('learners');
        for ($i = 0; $i < count($learners); $i++) {
            CommitteeSession::create([
                'committee_id' => $request->get('committee_id'),
                'infringement_type_id' => $request->get('infringement_type_id'),
                'learner_id' => $learners[$i],
                'committee_session_state_id' => 1
            ]);
        }
        return response()->json([
            'status' => 201,
            'success' => true,
            'message' => 'Casos academicos agregados exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $committeeSession = CommitteeSession::with(
            'learner.group.formationProgram',
            'learner.stimuli',
            'learner.novelties.noveltyType',
            'learner.academics.committee',
            'learner.academics.responsibles',
            'learner.academics.sanction',
            'infringementType',
            'committeeSessionParameters',
            'committeeSessionState',
            'committee',
            'responsibles',
            'complainer'
        )->findOrFail($id);
        foreach ($committeeSession->learner->academics as $academic) {
            foreach ($academic->responsibles as $responsible) {
                $formative_measure = $responsible->pivot->formativeMeasure;
                $responsible->pivot->formative_measure = $formative_measure;
            }
        }
        foreach ($committeeSession->responsibles as $responsible) {
            $formative_measure = $responsible->pivot->formativeMeasure;
            $responsible->pivot->formative_measure = $formative_measure;
        }
        return $committeeSession;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommitteeSessionRequest $request, CommitteeSession $committeeSession)
    {
        $this->authorize('update', [CommitteeSession::class, $committeeSession]);
        $committeeSession->infringement_type_id = $request->get('infringement_type_id');
        $committeeSession->learner_id = $request->get('learners')[0];
        $committeeSession->save();
        return response()->json([
            'status' => 200,
            'success' => true,
            'message' => 'Caso academico actualizado con exito'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommitteeSession $committeeSession)
    {
        $this->authorize('delete', [CommitteeSession::class, $committeeSession]);

        $committeeSession->delete();
        return response()->json([
            'status' => 200,
            'success' => true,
            'message' => 'Caso eliminado con exito'
        ]);
    }

    public function updateState(Request $request, $id)
    {
        $committee = CommitteeSession::findOrFail($id);
        $committee->committee_session_state_id = $request->state_id;
        $committee->save();
        return response()->json([
            'status' => 200,
            'success' => true,
            'message' => 'Se ha actualizado el estado del caso'
        ]);
    }

    public function deleteComplainer($id)
    {
        $committee = CommitteeSession::findOrFail($id);
        $committee->complainer_id = null;
        $committee->save();
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'La empresa no estara asociada con este caso'
        ]);
    }

    public function detachResponsible(Request $request, $id)
    {
        $committee = CommitteeSession::findOrFail($id);
        $committee->responsibles()->detach($request->get('responsible_id'));
        $committee->save();
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'El responsable no estara asociado con este caso'
        ]);
    }

    public function setState(Request $request, $id)
    {
        $committeeSession = CommitteeSession::findOrFail($id);
        DB::update('UPDATE committee_session_formative_measures SET state = :state WHERE session_id = :session_id AND responsible_id = :responsible_id', [
            'state' => $request->get('state'),
            'session_id' => $committeeSession->id,
            'responsible_id' => $request->get('responsible_id')
        ]);
        return response()->json([
            'status' => 200,
            'success' => true,
            'message' => 'Estado de la medida formativa actualizado con exito'
        ]);
    }

    public function setDescription(Request $request, $id)
    {
        $committeeSession = CommitteeSession::findOrFail($id);
        DB::update('UPDATE committee_session_formative_measures SET description = :description, report_date = :report_date, learning_result = :learning_result WHERE session_id = :session_id AND responsible_id = :responsible_id', [
            'description' => $request->get('description'),
            'report_date' => $request->get('report_date'),
            'learning_result' => $request->get('learning_result'),
            'session_id' => $committeeSession->id,
            'responsible_id' => $request->get('responsible_id')
        ]);
        return response()->json([
            'status' => 200,
            'success' => true,
            'message' => 'Descripcion de la medida formativa actualizado con exito'
        ]);
    }

    public function saveCommunication(Request $request, $id)
    {
        try {
            $keys = array_keys($request->all());
            $parameters = [];
            foreach ($keys as $key) {
                if ($key != 'infringement_type_id' && $key != 'start_hour' && $key != 'infringement_classification_id' && $key != '_method' && $key != '_token') {
                    $parameter_id = explode('_', $key)[1];
                    array_push($parameters, $parameter_id);
                }
            }
            $committee = CommitteeSession::findOrFail($id);
            $committee->infringement_classification_id = $request->get('infringement_classification_id');
            $committee->start_hour = $request->get('start_hour');
            $committee->save();
            // Validacion de que si ya existe lo actualiza y si no esta lo crea
            foreach ($parameters as $parameter) {
                if ($committee->committeeSessionParameters->pluck('id')->contains($parameter)) {
                    $committee->committeeSessionParameters()->detach($parameter);
                    $committee->committeeSessionParameters()->attach($parameter, ['description' => $request->get('parameter_' . $parameter)]);
                } else {
                    $committee->committeeSessionParameters()->attach($parameter, ['description' => $request->get('parameter_' . $parameter)]);
                }
            }
            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'Comunicacion guardada con exito',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'status' => 500,
                'message' => 'No se pudo guardar la comunicacion, intentelo de nuevo',
                'exc' => $e->getMessage()
            ]);
        }
    }

    public function exportCommunication($id)
    {
        $parser = new Parser();
        $committee = CommitteeSession::with('learner.group.formationProgram', 'committee', 'committeeSessionParameters')->findOrFail($id);
        $active_communication =  ActTemplate::with('parameters.committeeSessions')->where([
            ['is_active', '=', 1],
            ['act_type', '=', 'Comunicación al aprendiz']
        ])->first();
        $parameters = [];
        foreach ($committee->committeeSessionParameters as $parameter) {
            $name = str_replace('${', '', $parameter->slug);
            $name = str_replace('}', '', $name);
            array_push($parameters, [
                'name' => $name,
                'value' => $parameter->pivot->description
            ]);
        }

        $templateProcessor = new TemplateProcessor(public_path("/storage/" . $active_communication->path));
        $templateProcessor->setValue('learner_name', $committee->learner->name);
        $templateProcessor->setValue('learner_document', $committee->learner->document_type . " " . $committee->learner->document);
        $templateProcessor->setValue('learner_group', $committee->learner->group->code_tab);
        $templateProcessor->setValue('learner_formation_program', $committee->learner->group->formationProgram->name);
        $templateProcessor->setValue('formation_center', $committee->committee->formation_center);
        foreach ($parameters as $parameter) {
            $templateProcessor->setValue($parameter['name'], $parser->fromHTML($parameter['value']));
        }
        $templateProcessor->setValue('is_academic', $committee->infringement_type_id == 1 ? '___x___' : '______');
        $templateProcessor->setValue('is_disciplinary', $committee->infringement_type_id == 2 ? '___x___' : '______');
        $templateProcessor->setValue('is_leve', $committee->infringement_classification_id == 1 ? '___x___' : '______');
        $templateProcessor->setValue('is_grave', $committee->infringement_classification_id == 2 ? '___x___' : '______');
        $templateProcessor->setValue('is_gravisima', $committee->infringement_classification_id == 3 ? '___x___' : '______');
        $templateProcessor->setValue('committee_date', $committee->committee->date);
        $templateProcessor->setValue('committee_hour', $committee->start_hour);
        $templateProcessor->setValue('committee_place', $committee->committee->formation_center);
        $templateProcessor->setValue('subdirector_name', $committee->committee->subdirector_name);
        $templateProcessor->setValue('coordinador_name', $committee->committee->coordinador_name);
        $filename = 'Comunicacion - Learner';
        $templateProcessor->saveAs($filename . ".docx");
        return response()->download($filename . ".docx")->deleteFileAfterSend(true);
    }

    public function saveCommittee(Request $request, $id)
    {
        try {
            $committeeSession = CommitteeSession::find($id);
            $committee = Committee::find($committeeSession->committee_id);
            $keys = array_keys($request->all());
            $parameters = [];
            foreach ($keys as $key) {
                if (
                    $key != 'assistants' &&
                    $key != 'quorum' &&
                    $key != 'objectives' &&
                    $key != 'discharge_type' &&
                    $key != 'sanction_id' &&
                    $key != 'responsibles' &&
                    $key != 'formative_measures' &&
                    $key != 'type_complainer' &&
                    $key != 'name' &&
                    $key != 'document_type' &&
                    $key != 'document' &&
                    $key != '_method' &&
                    $key != '_token'
                ) {
                    $parameter_id = explode('_', $key)[1];
                    array_push($parameters, $parameter_id);
                }
            }
            $committee->assistants = $request->get('assistants');
            $committee->quorum = $request->get('quorum');
            $committee->save();
            $committeeSession->objectives = $request->get('objectives');
            $committeeSession->discharge_type = $request->get('discharge_type');
            $committeeSession->act_sanction_id = $request->get('sanction_id');

            foreach ($parameters as $parameter) {
                if ($committeeSession->committeeSessionParameters->pluck('id')->contains($parameter)) {
                    $committeeSession->committeeSessionParameters()->detach($parameter);
                    $committeeSession->committeeSessionParameters()->attach($parameter, ['description' => $request->get('parameter_' . $parameter)]);
                } else {
                    $committeeSession->committeeSessionParameters()->attach($parameter, ['description' => $request->get('parameter_' . $parameter)]);
                }
            }
            $responsibles = $request->get('responsibles');
            $responsibles_formative_measures = [];
            $formative_measures = $request->get('formative_measures');
            if ($responsibles) {
                foreach ($responsibles as $index => $responsible) {
                    if ($formative_measures) {
                        array_push($responsibles_formative_measures, [
                            'responsible' => $responsible,
                            'formative_measure' => array_key_exists($index, $formative_measures) ? $formative_measures[$index] : null
                        ]);
                    } else {
                        array_push($responsibles_formative_measures, [
                            'responsible' => $responsible,
                            'formative_measure' => null
                        ]);
                    }
                }

                foreach ($responsibles_formative_measures as $row) {
                    if ($committeeSession->responsibles->pluck('id')->contains($row['responsible'])) {
                        $committeeSession = CommitteeSession::findOrFail($id);
                        DB::update('UPDATE committee_session_formative_measures SET measure_id = :measure_id, state =:state  WHERE session_id = :session_id AND responsible_id = :responsible_id', [
                            'responsible_id' => $row['responsible'],
                            'session_id' => $committeeSession->id,
                            'measure_id' => $row['formative_measure'],
                            'state' => 'En proceso',
                        ]);
                    } else {
                        $committeeSession->responsibles()->attach($row['responsible'], ['measure_id' => $row['formative_measure'], 'state' => 'En proceso']);
                    }
                }
            }
            if ($request->get('name')) {
                $complainer = Complainer::where('name', $request->name)->first();
                if ($complainer) {
                    $committeeSession->complainer_id = $complainer->id;
                } else {
                    $cmp = Complainer::create([
                        'name' => $request->get('name'),
                        'document_type' => $request->get('document_type'),
                        'document' => $request->get('document'),
                    ]);
                    $committeeSession->complainer_id = $cmp->id;
                }
            }
            $committeeSession->save();
            return response()->json([
                'status' => 200,
                'success' => true,
                'message' => 'Acta de comité guardada con exito'
            ]);
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }

    public function exportCommittee($id)
    {
        $parser = new Parser();
        $committeeSession = CommitteeSession::with('learner.group.formationProgram', 'committee', 'committeeSessionParameters')->findOrFail($id);
        $active_committee =  ActTemplate::with('parameters.committeeSessions')->where([
            ['is_active', '=', 1],
            ['act_type', '=', 'Acta de comité']
        ])->first();
        $parameters = [];
        foreach ($committeeSession->committeeSessionParameters as $parameter) {
            $name = str_replace('${', '', $parameter->slug);
            $name = str_replace('}', '', $name);
            array_push($parameters, [
                'name' => $name,
                'value' => $parameter->pivot->description
            ]);
        }
        $templateProcessor = new TemplateProcessor(public_path("/storage/" . $active_committee->path));
        $templateProcessor->setValue('learner_name', $committeeSession->learner->name);
        $templateProcessor->setValue('learner_document', $committeeSession->learner->document_type . " " . $committeeSession->learner->document);
        $templateProcessor->setValue('learner_group', $committeeSession->learner->group->code_tab);
        $templateProcessor->setValue('learner_phone', $committeeSession->learner->phone);
        $templateProcessor->setValue('learner_email', $committeeSession->learner->email);
        $templateProcessor->setValue('learner_formation_program', $committeeSession->learner->group->formationProgram->name);
        $templateProcessor->setValue('formation_center', $committeeSession->committee->formation_center);
        $templateProcessor->setValue('assistants', $parser->fromHTML($committeeSession->committee->assistants));
        $templateProcessor->setValue('quorum_yes', $committeeSession->committee->quorum == 1 ? '__x__' : '____');
        $templateProcessor->setValue('quorum_no', $committeeSession->committee->quorum == 0 ? '__x__' : '____');
        $templateProcessor->setValue('is_verbal', $committeeSession->discharge_type == 'verbal' ? '__x__' : '____');
        $templateProcessor->setValue('is_written', $committeeSession->discharge_type == 'written' ? '__x__' : '____');
        $templateProcessor->setValue('committee_date', $committeeSession->committee->date);
        $templateProcessor->setValue('committee_place', $committeeSession->committee->place);
        $templateProcessor->setValue('committee_start_hour', $committeeSession->committee->start_hour);
        $templateProcessor->setValue('objectives', $parser->fromHTML($committeeSession->objectives));
        $templateProcessor->setValue('record_number', $committeeSession->committee->record_number);

        foreach ($parameters as $parameter) {
            $templateProcessor->setValue($parameter['name'], $parser->fromHTML($parameter['value']));
        }
        $filename = 'Acta de comite - Learner';
        $templateProcessor->saveAs($filename . ".docx");
        return response()->download($filename . ".docx")->deleteFileAfterSend(true);
    }

    public function saveSanction(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date_academic_act_sanction' => ['nullable', 'date'],
            'date_notification_act_sanction' => ['nullable', 'date', 'after:date_academic_act_sanction'],
            'date_expiration_act_sanction' => ['nullable', 'date', 'after:date_notification_act_sanction'],
            'date_lifting_act_sanction' => ['nullable', 'date', 'after:date_notification_act_sanction'],
        ], [
            'date_notification_act_sanction.after' => 'El campo de fecha de notificacion debe ser una fecha posterior a la fecha de acto sancionatorio',
            'date_expiration_act_sanction.after' => 'El campo de fecha de expiracion debe ser una fecha posterior a la fecha de notificacion del acto sancionatorio',
            'date_lifting_act_sanction.after' => 'El campo de fecha de levantamiento debe ser una fecha posterior a la fecha de notificacion del acto sancionatorio',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }
        $committeeSession = CommitteeSession::with('learner.group.formationProgram', 'committee', 'committeeSessionParameters')->findOrFail($id);
        $keys = array_keys($request->all());
        $parameters = [];
        foreach ($keys as $key) {
            if (
                $key != 'date_academic_act_sanction' &&
                $key != 'date_notification_act_sanction' &&
                $key != 'date_expiration_act_sanction' &&
                $key != 'date_lifting_act_sanction' &&
                $key != '_method' &&
                $key != '_token'
            ) {
                $parameter_id = explode('_', $key)[1];
                array_push($parameters, $parameter_id);
            }
        }
        foreach ($parameters as $parameter) {
            if ($committeeSession->committeeSessionParameters->pluck('id')->contains($parameter)) {
                $committeeSession->committeeSessionParameters()->detach($parameter);
                $committeeSession->committeeSessionParameters()->attach($parameter, ['description' => $request->get('parameter_' . $parameter)]);
            } else {
                $committeeSession->committeeSessionParameters()->attach($parameter, ['description' => $request->get('parameter_' . $parameter)]);
            }
        }
        $committeeSession->date_academic_act_sanction = $request->get('date_academic_act_sanction');
        $committeeSession->date_notification_act_sanction = $request->get('date_notification_act_sanction');
        $committeeSession->date_expiration_act_sanction = $request->get('date_expiration_act_sanction');
        $committeeSession->date_lifting_act_sanction = $request->get('date_lifting_act_sanction');
        $committeeSession->save();

        return response()->json([
            'status' => 200,
            'success' => true,
            'message' => 'Acto sancionatorio guardado con exito'
        ]);
    }

    public function exportSanction($id)
    {
        $parser = new Parser();
        $committeeSession = CommitteeSession::with('learner.group.formationProgram', 'committee', 'committeeSessionParameters', 'infringementType', 'infringementClassification')->findOrFail($id);
        $active_committee =  ActTemplate::with('parameters.committeeSessions')->where([
            ['is_active', '=', 1],
            ['act_type', '=', 'Acto sancionatorio']
        ])->first();
        $parameters = [];
        foreach ($committeeSession->committeeSessionParameters as $parameter) {
            $name = str_replace('${', '', $parameter->slug);
            $name = str_replace('}', '', $name);
            array_push($parameters, [
                'name' => $name,
                'value' => $parameter->pivot->description
            ]);
        }
        $templateProcessor = new TemplateProcessor(public_path("/storage/" . $active_committee->path));
        $templateProcessor->setValue('learner_name', $committeeSession->learner->name);
        $templateProcessor->setValue('learner_document', $committeeSession->learner->document_type . " " . $committeeSession->learner->document);
        $templateProcessor->setValue('learner_group', $committeeSession->learner->group->code_tab);
        $templateProcessor->setValue('learner_formation_program', $committeeSession->learner->group->formationProgram->name);
        $templateProcessor->setValue('formation_center', $committeeSession->committee->formation_center);
        $templateProcessor->setValue('assistants', $parser->fromHTML($committeeSession->committee->assistants));
        $templateProcessor->setValue('quorum_yes', $committeeSession->committee->quorum == 1 ? '__x__' : '____');
        $templateProcessor->setValue('quorum_no', $committeeSession->committee->quorum == 0 ? '__x__' : '____');
        $templateProcessor->setValue('is_verbal', $committeeSession->discharge_type == 'verbal' ? '__x__' : '____');
        $templateProcessor->setValue('is_written', $committeeSession->discharge_type == 'written' ? '__x__' : '____');
        $templateProcessor->setValue('committee_date', $committeeSession->committee->date);
        $templateProcessor->setValue('committee_place', $committeeSession->committee->place);
        $templateProcessor->setValue('committee_start_hour', $committeeSession->start_hour);
        $templateProcessor->setValue('infringement_type', $committeeSession->infringementType->name);
        $templateProcessor->setValue('infringement_classification', $committeeSession->infringementClassification ? $committeeSession->infringementClassification->name : "");
        $templateProcessor->setValue('record_number', $committeeSession->committee->record_number);
        $templateProcessor->setValue('subdirector_name', $committeeSession->committee->subdirector_name);
        $templateProcessor->setValue('date_academic_act_sanction', $committeeSession->date_academic_act_sanction);
        $templateProcessor->setValue('sanction', $committeeSession->sanction->name);

        foreach ($parameters as $parameter) {
            $templateProcessor->setValue($parameter['name'], $parser->fromHTML($parameter['value']));
        }
        $filename = 'Acta de comite - Learner';
        $templateProcessor->saveAs($filename . ".docx");
        return response()->download($filename . ".docx")->deleteFileAfterSend(true);
    }
}
