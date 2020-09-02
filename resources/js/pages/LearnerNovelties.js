import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/LearnerNovelties';
import { validate, formValid, setRules } from '../containers/Validator';
import { get as getLearners } from '../containers/Learners'
import Loader from '../components/Loader';
import { data } from 'jquery';
import DataTable from '../components/DataTable';



class LearnerNovelties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learnerNovelties: null,
            learnersId: null,
            edit: false,
            id: null,
            message:null,
            rules: rules
        }
        this.getLearners = this.getLearners.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async getLearnerNovelties () {
        this.setState({learnerNovelties: null});
        let data = await get();
        this.setState({learnerNovelties: data});
    }

    getLearners() {
        getLearners().then(data => {
            this.setState({ learnersId: data });
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                update(e.target, this.state.id).then(data => {
                    if (data.success) {
                        this.getLearnerNovelties();
                        $('.modal').modal('toggle');
                    }else{
                        this.setState({message: "Revisar campo HandleSubmit Update"});
                    }
                })
            } else {
                store(e.target).then(data => {
                    if (data.success) {
                        this.getLearnerNovelties();
                        $('.modal').modal('toggle');
                    }else{
                        this.setState({message: "Revisar campo HandleSubmit Store"});
                    }
                });
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    handleDelete(e) {
        let id = $(e.target).data('id');
        let res = confirm('¿Estas seguro que deseas eliminar este elemento?');
        if (res) {
            destroy(id).then(data => {
                if (data.success) {
                    this.getLearnerNovelties();
                }
            })
        }
    }

    handleInput(e) {
        const { name, value } = e.target;
        let newRules = validate(name, value, rules);
        this.setState({ rules: newRules });
    }

    handleModal() {
        $('#form').trigger('reset');
        setRules(rules);
        this.setState({ message: 'Te recomendamos actualizar antes de agregar uno nuevo', edit: false });
        $('.modal').find('.modal-title').text('Agregar novedad del aprendiz');
        $('.modal').modal('toggle');
    }

    handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ id, edit: true, message: null });
        setRules(rules, false);
        find(id).then(data => {
            $('#name').val(data.name);
            $('.modal').find('.modal-title').text('Editar novedad del aprendiz');
            $('.modal').modal('toggle');
        })
    }
    
    componentDidMount() {
        this.getLearnerNovelties();
        this.getLearners();
    }

    render() {
        // const { rules } = this.state;
        // if (!this.state.learnerNovelties) {
        //     return (
        //         <Loader />
        //     )
        // }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Novedades aprendices</h3>
                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar Novedad</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th>Aprendiz</th>
                                    <th className="hide">Comite</th>
                                    <th className="hide">Novedad</th>
                                    <th className="hide">Justificación</th>
                                    <th className="hide">Fecha Respuesta</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {this.state.learnerNovelties.map(learnerNovelty => (
                                    <tr key={learnerNovelty.id}>
                                        <td>{learnerNovelty.learner}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-id={learnerNovelty.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary">Editar</button>
                                                <button data-id={learnerNovelty.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </DataTable>
                    </div>
                </div>
            </>
        );
    }
}

export default LearnerNovelties
