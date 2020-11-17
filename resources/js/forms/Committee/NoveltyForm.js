import React, { Component } from "react";
import Select from "react-select";
import { getLearnersCommittee } from "../../containers/Learners";
import { get as get_novelty_types } from "../../containers/NoveltyTypes";
import Loader from "../../components/Loader";

class NoveltyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learners: null,
            noveltyTypes: null,
        };
    }

    async getLearners(){
        let committeeID = this.props.committee;
        let data = await getLearnersCommittee(committeeID);
        let d = [];
        for (let i = 0; i < data.length; i++) {
            d.push({
                label: `${data[i].name}(${data[i].document})`,
                value: data[i].id,
            });
        }
        this.setState({learners: d});
    }

    async getNoveltyTypes (){
        let data = await get_novelty_types();
        this.setState({noveltyTypes: data});
    };

    componentDidMount(){
        this.getLearners();
        this.getNoveltyTypes();
    }

    render() {
        let {onSubmit, handleSelect, handleInput, rules, committee, data=null} = this.props;
        if(!this.state.learners || !this.state.noveltyTypes){
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
                        defaultValue={data?{label: `${data.learner.name}(${data.learner.document})`, value: data.learner.id}:''}
                    />
                    <small id="helpId" className="text-muted">
                        Nombre o numero de documento
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Tipo de novedad</label>
                    <select
                        name="novelty_type_id"
                        id="novelty_type_id"
                        className={
                            rules.novelty_type_id.isInvalid &&
                            rules.novelty_type_id.message != ""
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                        onInput={handleInput}
                        defaultValue={data?data.novelty_type_id:''}
                    >
                        <option value="">Seleccione uno</option>
                        {this.state.noveltyTypes.length > 0 ? (
                            this.state.noveltyTypes.map((noveltyType, i) => (
                                <option key={i} value={noveltyType.id}>
                                    {noveltyType.name}
                                </option>
                            ))
                        ) : (
                            <option value="">
                                No hay tipos de novedades disponibles
                            </option>
                        )}
                    </select>
                    <div className="invalid-feedback">
                        {rules.novelty_type_id.isInvalid && rules.novelty_type_id.message != '' ? rules.novelty_type_id.message : ''}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="">Justificación</label>
                    <textarea
                        name="justification"
                        id="justification"
                        className={rules.justification.isInvalid && rules.justification.message != '' ? 'form-control is-invalid':'form-control'}
                        onInput={handleInput}
                        defaultValue={data?data.justification:''}
                    ></textarea>
                    <div className="invalid-feedback">
                        {rules.justification.isInvalid && rules.justification.message != '' ? rules.justification.message : ''}
                    </div>
                </div>
            </form>
        );
    }
}

export default NoveltyForm;
