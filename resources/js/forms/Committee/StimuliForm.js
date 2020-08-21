import React, { Component } from 'react';
import Select from 'react-select';
import { get } from '../../containers/Learners';
import Loader from '../../components/Loader';

class StimuliForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learners: null,
        }
    }

    async getLearners() {
        let data = await get();
        let d = [];
        for (let i = 0; i < data.length; i++) {
            d.push({ label: `${data[i].name}(${data[i].document})`, value: data[i].id });

        }
        this.setState({ learners: d });
    }

    componentDidMount() {
        this.getLearners();
    }

    render() {
        let { onSubmit, handleInput, handleSelect, committee, rules } = this.props;
        if (!this.state.learners) {
            return <Loader />
        }
        return (
            <form onSubmit={onSubmit} id="form">
                <input type="hidden" name="committee_id" value={committee} />
                <div className="form-group">
                    <label htmlFor="">Aprendiz</label>
                    <Select
                        name="learner_id"
                        id="learner_id"
                        options={this.state.learners}
                        onChange={(value) => handleSelect(value)}
                    />
                    <small id="helpId" className="text-muted">Nombre o numero de documento</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Estimulo</label>
                    <input
                        type="text"
                        name="stimulus"
                        id="stimulus"
                        className={rules.stimulus.isInvalid && rules.stimulus.message != '' ? 'form-control is-invalid' : 'form-control'}
                        onInput={handleInput}
                    />
                    <div className="invalid-feedback">
                        {rules.stimulus.isInvalid && rules.stimulus.message != '' ? rules.stimulus.message : ''}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="">Justificación</label>
                    <textarea
                        name="justification"
                        id="justification"
                        className={rules.justification.isInvalid && rules.justification.message != '' ? 'form-control is-invalid' : 'form-control'}
                        onInput={handleInput}
                    >
                    </textarea>
                    <div className="invalid-feedback">
                        {rules.justification.isInvalid && rules.justification.message != '' ? rules.justification.message : ''}
                    </div>
                </div>
            </form>
        )
    }
}

export default StimuliForm;