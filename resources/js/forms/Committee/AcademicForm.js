import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getLearnersCommittee } from "../../containers/Learners";
import { get as fetchInfringementTypes } from '../../containers/InfringementTypes'
import Loader from "../../components/Loader";

function AcademicForm({ onSubmit, committee, rules, handleInput, handleSelect, data = null, committeeSession = null }) {
    const [learners, setLearners] = useState(null);
    const [infringementTypes, setInfringementTypes] = useState(null);
    const [qtyLearners, setQtyLearners] = useState(0);
    const [elements, setElements] = useState([]);
    const getLearners = async () => {
        let data = await getLearnersCommittee(committee);
        let d = [];
        for (let i = 0; i < data.length; i++) {
            d.push({
                label: `${data[i].name}(${data[i].document})`,
                value: data[i].id,
            });
        }
        setLearners(d);
    };
    const getInfringementTypes = async () => {
        let data = await fetchInfringementTypes();
        setInfringementTypes(data);
    }
    const add = () => {
        if (qtyLearners < 10) {
            setQtyLearners(qtyLearners + 1);
            let e = elements;
            e.push(
                e.length + 1
            );
            setElements(e);
        }
    };
    const sustract = () => {
        if (qtyLearners > 0) {
            setQtyLearners(qtyLearners - 1);
            let e = elements;
            e.pop();
            setElements(e);
        }
    };
    useEffect(() => {
        getLearners();
        getInfringementTypes();
    }, []);
    if (!learners || !infringementTypes) {
        return <Loader />;
    }
    return (
        <form onSubmit={onSubmit} id="form">
            <input type="hidden" name="committee_id" value={committee} />
            <div className="form-group">
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="infringement_type_id">Falta</label>
                        <select
                            name="infringement_type_id"
                            id="infringement_type_id"
                            className={rules.infringement_type_id.isInvalid && rules.infringement_type_id.message != '' ? 'form-control is-invalid' : 'form-control'}
                            onInput={handleInput}
                            defaultValue={data ? data.infringement_type_id : ''}
                        >
                            <option value="">Seleccione una</option>
                            {infringementTypes.length > 0 ? (
                                infringementTypes.map((infringementType, i) => (
                                    <option key={i} value={infringementType.id}>{infringementType.name}</option>
                                ))
                            ) : (
                                    <option value="">No hay tipos de faltas registradas</option>
                                )}
                        </select>
                        <div className="invalid-feedback">
                            {rules.infringement_type_id.isInvalid && rules.infringement_type_id.message != '' ? rules.infringement_type_id.message : ''}
                        </div>
                    </div>
                    {data ? (
                        <div className=""></div>
                    ) : (
                            <div className="col-3">
                                <label htmlFor="quantity_learners">
                                    Numero de aprendices
                            </label>
                                <div className="row">
                                    <div className="col-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-info"
                                            onClick={sustract}
                                        >
                                            -
                                    </button>
                                    </div>
                                    <div className="col text-center">
                                        <h5 className="mt-2">{qtyLearners}</h5>
                                    </div>
                                    <div className="col-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-info"
                                            onClick={add}
                                        >
                                            +
                                    </button>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
            <label>{data ? 'Aprendiz' : 'Aprendices'}</label>
            {data ? (
                <div className="form-group">
                    <Select
                        name="learners[]"
                        id="learner"
                        options={learners}
                        onChange={(value) => handleSelect(value)}
                        defaultValue={data?{label: `${data.learner.name}(${data.learner.document})`, value: data.learner.id}:''}
                    />
                    <small id="helpId" className="text-muted">
                        Nombre o numero de documento
                    </small>
                </div>
            ) : (
                    elements.length > 0 ? (
                        elements.map(element => (
                            <div className="form-group" key={element}>
                                <Select
                                    name="learners[]"
                                    id={"learner" + element}
                                    options={learners}
                                    onChange={(value) => handleSelect(value)}
                                />
                                <small id="helpId" className="text-muted">
                                    Nombre o numero de documento
                                    </small>
                            </div>
                        ))
                    ) : (
                            <p>Por favor selecciona el numero de aprendices que quieres agregar</p>
                        )
                )}
        </form>
    );
}

export default AcademicForm;
