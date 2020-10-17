<?php
session_start();

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



Route::get('login', function(){
    return redirect()->route('login-app');
});

Route::post('login', [
    'as' => '',
    'uses' => 'Auth\LoginController@login'
])->name('login');

Route::post('logout', [
    'as' => 'logout',
    'uses' => 'Auth\LoginController@logout'
]);

// Password Reset Routes...
Route::post('password/email', [
    'as' => 'password.email',
    'uses' => 'Auth\ForgotPasswordController@sendResetLinkEmail'
]);
Route::get('password/reset', [
    'as' => 'password.request',
    'uses' => 'Auth\ForgotPasswordController@showLinkRequestForm'
]);
Route::post('password/reset', [
    'as' => 'password.update',
    'uses' => 'Auth\ResetPasswordController@reset'
]);
Route::get('password/reset/{token}', [
    'as' => 'password.reset',
    'uses' => 'Auth\ResetPasswordController@showResetForm'
]);

Route::get('app/logout', function () {
    session()->flush();
    return redirect('/');
});

Route::get('/', function () {
    if(auth()->user()){
        return redirect('/app');
    }
    return view('welcome');
})->name('login-app');

Route::group(['middleware' => ['auth']], function () {

    Route::get('/app/{path?}', [
        'uses' => function () {
            return view('react');
        },
        'as' => 'react',
        'where' => ['path' => '.*']
    ]);


    Route::resource('committees', 'CommitteeController');
    Route::resource('committee-parameters', 'CommitteeParameterController');
    Route::put('committee-sessions/{id}/update-state', 'CommitteeSessionController@updateState');
    Route::put('committee-sessions/{id}/delete-complainer', 'CommitteeSessionController@deleteComplainer');
    Route::put('committee-sessions/{id}/detach-responsible', 'CommitteeSessionController@detachResponsible');
    Route::put('committee-sessions/{id}/set-state', 'CommitteeSessionController@setState');
    Route::put('committee-sessions/{id}/set-description', 'CommitteeSessionController@setDescription');
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
    Route::resource('general-parameters', 'GeneralParameterController');
    Route::get('act-templates/view/{file}', 'ActTemplateController@view');
    Route::get('act-templates/active', 'ActTemplateController@findActive');
    Route::get('act-templates/type/{act_type}', 'ActTemplateController@findByType');
    Route::resource('act-templates', 'ActTemplateController');

    Route::get('/stimuli/{committee}', 'StimulusController@index');
    Route::post('/stimuli', 'StimulusController@store');
    Route::get('/stimuli/show/{stimulus}', 'StimulusController@show');
    Route::delete('/stimuli/delete/{stimulus}', 'StimulusController@destroy');
    Route::put('/stimuli/update/{stimulus}', 'StimulusController@update');

    Route::get('/learner-novelties/{committee}', 'LearnerNoveltyController@index');
    Route::get('/learner-novelties', 'LearnerNoveltyController@indexAll');
    Route::post('/learner-novelties', 'LearnerNoveltyController@store');
    Route::get('/learner-novelties/show/{learner_novelty}', 'LearnerNoveltyController@show');
    Route::delete('/learner-novelties/delete/{learner_novelty}', 'LearnerNoveltyController@destroy');
    Route::put('/learner-novelties/update/{learner_novelty}', 'LearnerNoveltyController@update');

    Route::put('/save-communication/{id}', 'CommitteeSessionController@saveCommunication');
    Route::get('/export-communication/{id}', 'CommitteeSessionController@exportCommunication');

    Route::put('/save-committee/{id}', 'CommitteeSessionController@saveCommittee');
    Route::get('/export-committee/{id}', 'CommitteeSessionController@exportCommittee');

    Route::put('/save-sanction/{id}', 'CommitteeSessionController@saveSanction');
    Route::get('/export-sanction/{id}', 'CommitteeSessionController@exportSanction');
});

Route::get('/userPermissions', function () {

    $user = Auth::user();

    return response()->json([
        'superAdmin' => $user->id == 1,
        'permissions' => $user->getPermissionsViaRoles()
    ]);
});
