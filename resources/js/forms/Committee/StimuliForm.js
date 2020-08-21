import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { get } from '../../containers/Learners'
import Loader from '../../components/Loader';

function StimuliForm({onSubmit, committee}){
    const [learners, setLearners] = useState(null);
    const getLearners = async () => {
        let data = await get();
        let d = [];
        for (let i = 0; i < data.length; i++) {
            d.push({ label: `${data[i].name}(${data[i].document})`, value: data[i].id });

        }
        setLearners(d);
    }
    useEffect(() => {
        getLearners();
    }, []);
    if (!learners) {
        return <Loader />
    }
    return (
        <form onSubmit={onSubmit} id="form">
            <input type="hidden" name="committee_id" value={committee}/>
            <div className="form-group">
                <label htmlFor="">Aprendiz</label>
                <Select 
                    name="learner_id"
                    id="learner_id"
                    options={learners}
                />
                <small id="helpId" className="text-muted">Nombre o numero de documento</small>
            </div>
            <div className="form-group">
                <label htmlFor="">Estimulo</label>
                <input type="text" name="stimulus" id="stimulus" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="">Justificación</label>
                <textarea name="justification" id="justification" className="form-control"></textarea>
            </div>
        </form>
    )
}

export default StimuliForm;