<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group(['middleware' => ['auth']], function () {
    Route::get('/app/{path?}', [
        'uses' => function(){
            return view('react');
        },
        'as' => 'react',
        'where' => ['path' => '.*']
    ]);
    Route::resource('committees', 'CommitteeController');
    Route::resource('committee-parameters', 'CommitteeParameterController');
    Route::resource('committee-sessions', 'CommitteeSessionController');
    Route::resource('committee-session-states', 'CommitteeSessionStateController');
    Route::resource('complainers', 'ComplainerController');
    Route::resource('contract-types', 'ContractTypeController');
    Route::post('/contract-types/mass', 'ContractTypeController@mass');
    Route::resource('formation-programs', 'FormationProgramController');
    Route::post('formation-programs/mass/', 'FormationProgramController@mass');
    Route::resource('formation-program-types', 'FormationProgramTypeController');
    Route::post('formation-program-types/mass/', 'FormationProgramTypeController@mass');
    Route::resource('formative-measures', 'FormativeMeasureController');
    Route::resource('formative-measure-responsibles', 'FormativeMeasureResponsibleController');
    Route::post('/formative-measure-responsibles/mass', 'FormativeMeasureResponsibleController@mass');
    Route::resource('groups', 'GroupController');
    Route::post('groups/mass', 'GroupController@mass');
    Route::get('groups/get-by-formation-program/{id}', 'GroupController@getByFormationProgram');
    Route::resource('infringement-classifications', 'InfringementClassificationController');
    Route::resource('infringement-types', 'InfringementTypeController');
    Route::resource('learners', 'LearnerController');
    Route::post('learners/import', 'LearnerController@import');
    Route::resource('modalities', 'ModalityController');
    Route::post('modalities/mass', 'ModalityController@mass');
    Route::resource('novelty-types', 'NoveltyTypeController');
    Route::resource('positions', 'PositionController');
    Route::post('/positions/mass', 'PositionController@mass');
    Route::resource('Reports', 'ReportsController');
    Route::resource('roles', 'RoleController');
    Route::resource('sanctions', 'SanctionController');
    Route::resource('users', 'UserController');

    Route::get('/stimuli/{committee}', 'StimulusController@index');
    Route::post('/stimuli', 'StimulusController@store');
    Route::get('/stimuli/show/{stimulus}', 'StimulusController@show');
    Route::delete('/stimuli/delete/{stimulus}', 'StimulusController@destroy');
    Route::put('/stimuli/update/{stimulus}', 'StimulusController@update');

    Route::get('/learner-novelties/{committee}', 'LearnerNoveltyController@index');
    Route::post('/learner-novelties', 'LearnerNoveltyController@store');
    Route::get('/learner-novelties/show/{learner_novelty}', 'LearnerNoveltyController@show');
    Route::delete('/learner-novelties/delete/{learner_novelty}', 'LearnerNoveltyController@destroy');
    Route::put('/learner-novelties/update/{learner_novelty}', 'LearnerNoveltyController@update');
});
