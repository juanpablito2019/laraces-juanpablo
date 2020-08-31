<?php

namespace App\Http\Controllers;

use App\CommitteeSession;
use App\Http\Requests\CommitteeSessionRequest;
use App\Http\Requests\CommunicationRequest;
use HTMLtoOpenXML\Parser;
use PhpOffice\PhpWord\TemplateProcessor;

class CommitteeSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        $learners = $request->get('learners');
        for ($i = 0; $i < count($learners); $i++) {
            CommitteeSession::create([
                'committee_id' => $request->get('committee_id'),
                'infringement_type_id' => $request->get('infringement_type_id'),
                'learner_id' => $learners[$i]
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
        return CommitteeSession::with('learner.group.formationProgram', 'learner.stimuli', 'learner.novelties', 'learner.academics', 'infringementType')->findOrFail($id);
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
        $committeeSession->delete();
        return response()->json([
            'status' => 200,
            'success' => true,
            'message' => 'Caso eliminado con exito'
        ]);
    }

    public function saveCommunication(CommunicationRequest $request, $id)
    {
        $committee = CommitteeSession::findOrFail($id);
        $committee->notification_acts = $request->get('notification_acts');
        $committee->notification_infringements = $request->get('notification_infringements');
        $committee->infringement_classification_id = $request->get('infringement_classification_id');
        $committee->start_hour = $request->get('start_hour');
        $committee->save();
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Comunicacion guardada con exito'
        ]);
    }

    public function exportCommunication($id)
    {
        $parser = new Parser();
        $committee = CommitteeSession::with('learner.group.formationProgram', 'committee')->findOrFail($id);
        $templateProcessor = new TemplateProcessor('word-template/communication.docx');
        // dd($committee->infringement_classification_id);
        $templateProcessor->setValue('learner_name', $committee->learner->name);
        $templateProcessor->setValue('learner_document', $committee->learner->document_type . " " . $committee->learner->document);
        $templateProcessor->setValue('learner_group', $committee->learner->group->code_tab);
        $templateProcessor->setValue('learner_formation_program', $committee->learner->group->formationProgram->name);
        $templateProcessor->setValue('formation_center', $committee->committee->formation_center);
        $templateProcessor->setValue('acts', $parser->fromHTML($committee->notification_acts));
        $templateProcessor->setValue('infringements', $parser->fromHTML($committee->notification_infringements));
        $templateProcessor->setValue('is_academic', $committee->infringement_type_id == 1 ? '___x___' : '______');
        $templateProcessor->setValue('is_disciplinary', $committee->infringement_type_id == 2 ? '___x___' : '______');
        $templateProcessor->setValue('is_leve', $committee->infringement_classification_id == 1 ? '___x___' : '______');
        $templateProcessor->setValue('is_grave', $committee->infringement_classification_id == 2 ? '___x___' : '______');
        $templateProcessor->setValue('is_gravisima', $committee->infringement_classification_id == 3 ? '___x___' : '______');
        $templateProcessor->setValue('committee_date', $committee->committee->date);
        $templateProcessor->setValue('committee_hour', $committee->start_hour);
        $templateProcessor->setValue('committee_place', $committee->committee->formation_center);
        $templateProcessor->setValue('subdirector_name', $committee->committee->subdirector_name);    
        $filename = 'Comunicacion - Learner';
        $templateProcessor->saveAs($filename . ".docx");
        return response()->download($filename . ".docx")->deleteFileAfterSend(true);
    }
}
