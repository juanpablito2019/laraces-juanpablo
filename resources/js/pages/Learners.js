import React, { Component } from 'react';
import { get, rules, store, find, update, destroy, getByFormationProgram, importLearners } from '../containers/Learners';
import { get as getFormationPrograms } from '../containers/FormationPrograms';
import Loader from '../components/Loader';
import { formValid, validate, setRules } from '../containers/Validator';
import Select from 'react-select';
import DataTable from '../components/DataTable';

class Learners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learners: null,
            rules: rules,
            id: null,
            edit: false,
            message: null,
            options: null,
            optionsGroups: null,
            formationProgramId: null,
            groupId: null,
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.selectProgram = this.selectProgram.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleImportSubmit = this.handleImportSubmit.bind(this);
        this.getFormationPrograms = this.getFormationPrograms.bind(this);
    }

    async getLearners() {
        this.setState({learners: null});
        let data = await get();
        this.setState({ learners: data });
    }

    getFormationPrograms() {
        getFormationPrograms().then(data => {
            let d = [];
            for (let i = 0; i < data.length; i++) {
                d.push({ label: data[i].name, value: data[i].id });
            }
            this.setState({ options: d });
        })
    }

    handleClick() {
        console.log('click');
    }

    async getGroupsByFormationProgram(id) {
        let data = await getByFormationProgram(id);
        this.setState({ optionsGroups: null });
        let d = [];
        for (let i = 0; i < data.length; i++) {
            d.push({ label: data[i].code_tab, value: data[i].id });
        }
        this.setState({ optionsGroups: d });
    }

    selectProgram(value) {
        this.setState({ formationProgramId: value });
        rules.formation_program.isInvalid = false;
        this.getGroupsByFormationProgram(value.value);
    }

    selectGroup(value) {
        rules.group_id.isInvalid = false;
        this.setState({ groupId: value });
    }

    selectPhoto(e) {
        let input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.img').attr('src', e.target.result).hide().fadeIn(1000);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (formValid(rules)) {
            if (this.state.edit) {
                let data = await update(e.target, this.state.id);
                if (data.success) {
                    $('#modal').modal('toggle');
                    setTimeout(async () => {
                        await this.getLearners();
                    }, 100);
                } else {
                    this.setState({ message: data.errors.name || data.errors.document_type || data.errors.document })
                }
            } else {
                let data = await store(e.target);
                if (data.success) {
                    $('#modal').modal('hide');
                    setTimeout(async () => {
                        await this.getLearners();
                    }, 100);
                } else {
                    this.setState({ message: data.errors.name })
                }
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
                    this.getLearners();
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
        $('#temp').attr('src', '/img/no-photo.png')
        setRules(rules);
        this.setState({
            message: 'Te recomendamos importar antes de agregar uno nuevo',
            edit: false,
            formationProgramId: null,
            groupId: null,
            optionsGroups: null
        });
        $('#modal').find('.modal-title').text('Agregar aprendiz');
        $('#modal').modal('toggle');
    }

    async handleEdit(e) {
        let id = $(e.target).data('id');
        this.setState({ id, edit: true, message: null });
        let data = await find(id);
        setRules(rules, false);
        $('#modal').find('.modal-title').text('Editar Aprendiz');
        $('#modal').find('#name').val(data.name);
        $('#modal').find('#document_type').val(data.document_type);
        $('#modal').find('#document').val(data.document);
        $('#modal').find('#email').val(data.email);
        $('#modal').find('#birthdate').val(data.birthdate);
        $('#modal').find('#phone').val(data.phone);
        if (data.photo) {
            $('#modal').find('.img').attr('src', `/storage/${data.photo}`);
        } else {
            $('#modal').find('.img').attr('src', `/img/no-photo.png`);
        }
        this.setState({ formationProgramId: this.state.options.find(o => o.value === data.group.formation_program_id) })
        await this.getGroupsByFormationProgram(data.group.formation_program_id);
        this.setState({ groupId: this.state.optionsGroups.find(o => o.value === data.group_id) });
        $('#modal').modal('toggle');
    }

    async handleDetail(e) {
        let id = $(e.target).data('id');
        let data = await find(id);
        $('#detail').find('.modal-title').text(`Informacion de ${data.name}`);
        $('#detail').find('#name').text(data.name);
        $('#detail').find('#document').text(`${data.document_type} ${data.document}`);
        $('#detail').find('#group').text(`${data.group.code_tab}`);
        $('#detail').find('#formationProgram').text(`${data.group.formation_program.name}`);
        $('#detail').find('#email').text(`${data.email}`);
        $('#detail').find('#phone').text(`${data.phone}`);
        $('#detail').find('#learner-photo').attr('src', data.photo ? "/storage/" + data.photo : '/img/no-photo.png');
        $('#detail').modal('toggle');
    }

    async handleImportSubmit(e) {
        e.preventDefault();
        let data = await importLearners(e.target);
        if (data.status === 200) {
            $('#import').modal('toggle');
            setTimeout(async () => {
                await this.getLearners();
            }, 200);
        }
    }

    handleImport() {
        this.setState({
            optionsGroups: null,
            groupId: null,
        })
        $('#import').modal('toggle');
    }

    tooltip(e) {
        $(e.target).tooltip();
    }

    componentDidMount() {
        this.getLearners();
        this.getFormationPrograms();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.learners) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h3>Aprendices</h3>
                        <a href="#" onClick={this.handleModal}><i className="fa fa-plus" aria-hidden="true"></i> Agregar aprendiz</a>
                        <a href="#" onClick={this.handleImport} className="ml-3"><i className="fa fa-download" aria-hidden="true"></i> Importar</a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <DataTable>
                            <thead>
                                <tr>
                                    <th className="hide">Documento</th>
                                    <th>Nombre</th>
                                    <th className="hide">Correo</th>
                                    <th className="hide">Grupo</th>
                                    <th className="hide">Programa</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.learners.map(learner => (
                                    <tr key={learner.id}>
                                        <td className="hide">{learner.document_type} {learner.document}</td>
                                        <td>{learner.name}</td>
                                        <td className="hide">{learner.email}</td>
                                        <td className="hide">{learner.group.code_tab}</td>
                                        <td className="hide">{learner.group.formation_program.name.split('-')[1]}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-id={learner.id} onClick={this.handleEdit} className="btn btn-sm btn-outline-primary">Editar</button>
                                                <button data-id={learner.id} onClick={this.handleDetail} className="btn btn-sm btn-outline-primary">Detalle</button>
                                                <button data-id={learner.id} onClick={this.handleDelete} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </DataTable>
                    </div>
                </div >
                <div className="modal" id="import" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Importar aprendices</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleImportSubmit} id="importForm">
                                    <div className="form-group">
                                        <div className="label">Programa</div>
                                        <Select
                                            name="formation_program_id"
                                            id="formation_program_id"
                                            options={this.state.options}
                                            onChange={value => this.selectProgram(value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Grupo</label>
                                        {this.state.optionsGroups ? (
                                            <>
                                                <Select
                                                    defaultValue={this.state.groupId}
                                                    value={this.state.groupId}
                                                    name="group_id"
                                                    id="group_id"
                                                    options={this.state.optionsGroups}
                                                    onChange={value => this.selectGroup(value)}
                                                />
                                                <div className="invalid-feedback"></div>
                                            </>
                                        ) : (
                                                <p>Por favor selecciona un programa</p>
                                            )}
                                    </div>
                                    <div className="form-group">
                                        <input type="file" name="csv" id="csv" className="d-none" />
                                        <label htmlFor="csv" className="btn btn-block btn-primary">
                                            Subir archivo csv
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="submit" form="importForm" className="btn btn-primary">Importar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="detail" tabIndex="-1">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="row">
                                            <div className="col mx-auto">
                                                <div className="card">
                                                    <img src="" id="learner-photo" className="card-img-top" alt="learner-photo" />
                                                    <div className="card-body">
                                                        <h5 className="card-title" id="name">
                                                        </h5>
                                                        <div className="card-subtitle text-muted" id="document">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#information" role="tab" aria-controls="home" aria-selected="true">Informacion</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#stimuli" role="tab" aria-controls="profile" aria-selected="false">Estimulos</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#history" role="tab" aria-controls="contact" aria-selected="false">Historial</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="information" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h6>Correo electronico</h6>
                                                        <h6 className="text-muted" id="email"></h6>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h6>Grupo</h6>
                                                        <h6 className="text-muted" id="group"></h6>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <h6>Programa</h6>
                                                        <h6 className="text-muted" id="formationProgram"></h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="stimuli" role="tabpanel" aria-labelledby="profile-tab">...</div>
                                            <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="contact-tab">...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit} id="form">
                                    {this.state.message ? (
                                        <div className="alert alert-info" role="alert">
                                            <span><i className="fa fa-info-circle" aria-hidden="true"></i> {this.state.message}</span>
                                        </div>
                                    ) : (
                                            <div className=""></div>
                                        )}
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#personal" role="tab" aria-controls="home" aria-selected="true">Datos personales</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#formation" role="tab" aria-controls="profile" aria-selected="false">Formacion</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active mt-1" id="personal" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row">
                                                <div className="col-8 mx-auto text-center col-lg-4">
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        id="photo"
                                                        className="d-none"
                                                        onChange={this.selectPhoto}
                                                    />
                                                    <label
                                                        htmlFor="photo"
                                                    >
                                                        <img
                                                            src="/img/no-photo.png"
                                                            alt="no-photo"
                                                            className="img-thumbnail img"
                                                            onMouseOver={this.tooltip}
                                                            data-toggle="tooltip"
                                                            data-placement="left"
                                                            title="Subir foto"
                                                            id="temp"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
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
                                                    <div className="col-12 col-lg-6">
                                                        <label htmlFor="">Tipo de documento</label>
                                                        <select
                                                            name="document_type"
                                                            id="document_type"
                                                            className={rules.document_type.isInvalid && rules.document_type.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        >
                                                            <option value="">Selecciona uno</option>
                                                            <option value="CC">Cedula de ciudadania</option>
                                                            <option value="TI">Tarjeta de identidad</option>
                                                            <option value="CE">Cedula extranjera</option>
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            {rules.document_type.isInvalid && rules.document_type.message != '' ? rules.document_type.message : ''}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <label htmlFor="">Numero de documento</label>
                                                        <input
                                                            type="number"
                                                            name="document"
                                                            id="document"
                                                            className={rules.document.isInvalid && rules.document.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.document.isInvalid && rules.document.message != '' ? rules.document.message : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Correo electronico</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className={rules.email.isInvalid && rules.email.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                    onInput={this.handleInput}
                                                />
                                                <div className="invalid-feedback">
                                                    {rules.email.isInvalid && rules.email.message != '' ? rules.email.message : ''}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-row">
                                                    <div className="col-12 col-lg-6">
                                                        <label htmlFor="">Fecha de nacimiento</label>
                                                        <input
                                                            type="date"
                                                            name="birthdate"
                                                            id="birthdate"
                                                            className={rules.birthdate.isInvalid && rules.birthdate.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.birthdate.isInvalid && rules.birthdate.message != '' ? rules.birthdate.message : ''}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <label htmlFor="">Telefono</label>
                                                        <input
                                                            type="number"
                                                            name="phone"
                                                            id="phone"
                                                            className={rules.phone.isInvalid && rules.phone.message != '' ? 'form-control is-invalid' : 'form-control'}
                                                            onInput={this.handleInput}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {rules.phone.isInvalid && rules.phone.message != '' ? rules.phone.message : 'form-control'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade mt-3" id="formation" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="form-group">
                                                <label htmlFor="">Programa</label>
                                                <Select
                                                    defaultValue={this.state.formationProgramId}
                                                    value={this.state.formationProgramId}
                                                    name="formation_program_id"
                                                    id="formation_program_id"
                                                    options={this.state.options}
                                                    onChange={value => this.selectProgram(value)}
                                                />
                                                <div className="invalid-feedback"></div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Grupo</label>
                                                {this.state.optionsGroups ? (
                                                    <>
                                                        <Select
                                                            defaultValue={this.state.groupId}
                                                            value={this.state.groupId}
                                                            name="group_id"
                                                            id="group_id"
                                                            options={this.state.optionsGroups}
                                                            onChange={value => this.selectGroup(value)}
                                                        />
                                                        <div className="invalid-feedback"></div>
                                                    </>
                                                ) : (
                                                        <p>Por favor selecciona un programa</p>
                                                    )}
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

export default Learners;