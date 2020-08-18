import React, { Component } from 'react';
import { find } from '../containers/Committees';
import { get } from '../containers/CommitteeSessionTypes';
import Loader from '../components/Loader';
import moment from 'moment';
import StimuliForm from '../components/Committee/StimuliForm';
import NoveltyForm from '../components/Committee/NoveltyForm';
import AcademicForm from '../components/Committee/AcademicForm';

class Committee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            committee: null,
            committee_session_types: null,
            committee_session_type: null,
        }

        this.handleCommitteeSessionType = this.handleCommitteeSessionType.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    async getCommittee() {
        let data = await find(this.state.id);
        this.setState({ committee: data });
    }
    async getCommitteeSessionTypes() {
        let data = await get();
        this.setState({ committee_session_types: data });
    }

    handleCommitteeSessionType(e){
        let {value} = e.target;
        this.setState({committee_session_type: value});
    }

    handleModal() {
        this.setState({committee_session_type: null});
        $('.modal').find('.modal-title').text('Agregar caso');
        $('.modal').modal('toggle');
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.committee_session_type==1){

        }else if(this.state.committee_session_type==2){

        }else{

        }
    }

    componentDidMount() {
        this.getCommittee();
        this.getCommitteeSessionTypes();
    }

    render() {
        if (!this.state.committee || !this.state.committee_session_types) {
            return <Loader />
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h4 className="text-primary">{moment(this.state.committee.date).format('LL')}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#detail" role="tab" aria-controls="home" aria-selected="true">Detalle</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#committee_sessions" role="tab" aria-controls="profile" aria-selected="false">Casos a tratar <span className="badge badge-light">{this.state.committee.committee_sessions.length}</span></a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="detail" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row mt-3">
                                    <div className="col">
                                        <h5>Numero de acta</h5>
                                        <p>{this.state.committee.record_number}</p>
                                        <h5>Fecha</h5>
                                        <p>{moment(this.state.committee.date).format('LL')}</p>
                                        <h5>Hora </h5>
                                        <p>{moment(this.state.committee.start_hour, 'HH:mm').format('hh:mm A')} a {moment(this.state.committee.end_hour, 'HH:mm').format('hh:mm A')}</p>
                                        <h5>Lugar </h5>
                                        <p>{this.state.committee.place}</p>
                                        <h5>Centro de formacion </h5>
                                        <p>{this.state.committee.formation_center}</p>
                                        <h5>Subdirector </h5>
                                        <p>{this.state.committee.subdirector_name}</p>
                                        <h5>Qourum </h5>
                                        <p>{this.state.committee.qourum == 1 ? 'Si' : 'No'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="committee_sessions" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row mt-3">
                                    <div className="col">
                                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar caso</a>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    {this.state.committee.committee_sessions.length > 0 ? (
                                        this.state.committee.committee_sessions.map((committee_session, i) => (
                                            <div key={i} className="col-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h6>Santiago Bedoya Arcila</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                            <div className="col">
                                                <p>No hay casos a tratar en este comité</p>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" tabIndex="-1" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.committee_session_types.length > 0 ? (
                                    this.state.committee_session_types.map((committee_session_type, i) => (
                                        <div key={i} className="form-check form-check-inline">
                                            <input className="form-check-input" onClick={this.handleCommitteeSessionType} type="radio" name="inlineRadioOptions" id={"radio"+i} value={committee_session_type.id} />
                                            <label className="form-check-label" htmlFor={"radio"+i}>{committee_session_type.name}</label>
                                        </div>
                                    ))
                                ) : (
                                        <p>No hay tipos de casos disponibles</p>
                                    )}

                                {this.state.committee_session_type?(
                                    <div className="row mt-2">
                                        <div className="col">
                                            {this.state.committee_session_type==1?(
                                                <StimuliForm 
                                                    onSubmit={this.handleSubmit}
                                                />
                                            ):(
                                                this.state.committee_session_type==2?(
                                                    <NoveltyForm 
                                                        onSubmit={this.handleSubmit}
                                                    />
                                                ):(
                                                    <AcademicForm 
                                                        onSubmit={this.handleSubmit}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                ):(
                                    <div></div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Committee;