import React, { Component } from 'react';
import { get, find, update, rules } from '../containers/GeneralParameters';
import { formValid, validate, setRules } from '../containers/Validator';
import Loader from '../components/Loader';
import Ckeditor from '../components/Ckeditor';

class GeneralParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generalParameters: null,
            edit: false,
            id: null,
            message: null,
            rules: rules,
            ckdata: "",
            ckreset: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.search = this.search.bind(this);
    }

    async getGeneralParameters() {
        let data = await get();
        this.setState({ generalParameters: data });
    }

    search(e) {
        let { value } = e.target;
        let matches = this.state.generalParameters.filter(generalParameter => {
            const rgex = new RegExp(`^${value}`, 'gi');
            return generalParameter.name.match(rgex);
        });
        if (value.length === 0) {
            this.getGeneralParameters();
        }
        this.setState({ generalParameters: matches });
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        let data = await find(id);
        if(data.content != null){
            this.setState({ ckdata: data.content, ckreset: false, id , edit: true, message: null });
            setRules(rules, false);
            find(id).then(data => {
                $('#name').val(data.name);
                $('#content').val(data.content);
                $('.modal').find('.modal-title').text('Editar parámetro general');
                $('.modal').modal('toggle');
            })
        }else{
            this.setState({ ckreset: false, id , edit: true, message: null });
            setRules(rules, false);
            find(id).then(data => {
                $('#name').val(data.name);
                $('.modal').find('.modal-title').text('Editar parámetro general');
                $('.modal').modal('toggle');
            })
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    this.getGeneralParameters();
                    $('.modal').modal('toggle');
                } else {
                    this.setState({ message: data.errors.name })
                }
            }
        } else {
            this.setState({ message: 'Por favor completa el formulario' })
        }
    }

    handleInput(e) {
        let { name, value } = e.target;
        let newRules = validate(name, value, rules)
        this.setState({ rules: newRules });
    }

    componentDidMount() {
        this.getGeneralParameters();
    }

    render() {
        if (!this.state.generalParameters) {
            return (
            <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Parametros generales</h3>
                    </div>
                    <div className="d-6 d-lg-3 mr-3 ml-3 mt-3">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-primary" type="button" id="button-addon1">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="text" className="form-control" onInput={this.search} />
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    {this.state.generalParameters.length > 0 ? (
                        this.state.generalParameters.map(generalParameter => (
                            <div key={generalParameter.id} className="col-12 col-md-6 col-lg-6 mb-2" key={generalParameter.id}>
                                <div className="card">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col">
                                                <h5>{generalParameter.name}</h5>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <a href="#" data-id={generalParameter.id} onClick={this.handleEdit} >Editar</a>                                            
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                            <div className="col">
                                <p>No hay datos disponibles</p>
                            </div>
                        )}
                </div>
                <div className="modal fade" data-backdrop="static" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="form" onSubmit={this.handleSubmit}>
                                        {this.state.message ? (

                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i>{this.state.message}</span>
                                        </div>
                                        ):(
                                            <div></div>
                                        )}
                                    <div className="form-group">
                                        <label htmlFor="">Nombre</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className={rules.name.isInvalid && rules.name.message != '' ? 'form-control is-invalid' : 'form-control'}
                                            onInput={this.handleInput}
                                        />
                                        <div className="invalid-feedback">
                                            {rules.name.isInvalid && rules.name.message != '' ? rules.name.message : ''}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <label htmlFor="">Contenido
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Ckeditor
                                                    name="content"
                                                    id="content"
                                                    d={this.state.ckdata}
                                                    options={['heading','bold','italic','blockQuote','bulletedList','numberedList','undo','redo']}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="submit" form="form" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default GeneralParameters;