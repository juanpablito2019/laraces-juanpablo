import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {get} from '../../containers/Learners'
import {get as get_novelty_types} from '../../containers/NoveltyTypes'
import Loader from '../../components/Loader';


function NoveltyForm({onSubmit}) {
    const [learners, setLearners] = useState(null);
    const [noveltyTypes, setNoveltyTypes] = useState(null);
    const getLearners = async () => {
        let data = await get();
        let d = [];
        for (let i = 0; i < data.length; i++) {
            d.push({ label: `${data[i].name}(${data[i].document})`, value: data[i].id });
        }
        setLearners(d);
    }
    const getNoveltyTypes = async () => {
        let data = await get_novelty_types();
        setNoveltyTypes(data);
    }
    useEffect(()=>{
        getLearners();
        getNoveltyTypes();
    }, []);
    if(!learners || !noveltyTypes){
        return <Loader />
    }
    return (
        <form onSubmit={onSubmit} id="form">
            <div className="form-group" >
                <label htmlFor="">Aprendiz</label>
                <Select 
                    name="learner_id"
                    id="learner_id"
                    options={learners}
                />
                <small id="helpId" className="text-muted">Nombre o numero de documento</small>
            </div>
            <div className="form-group">
              <label htmlFor="">Tipo de novedad</label>
              <select name="novelty_type_id" id="novelty_type_id" className="form-control">
                  <option value="">Seleccione uno</option>
                  {noveltyTypes.length>0?(
                      noveltyTypes.map(noveltyType => (
                          <option value={noveltyType.id}>{noveltyType.name}</option>
                      ))
                  ):(
                      <option value="">No hay tipos de novedades disponibles</option>
                  )}
              </select>
            </div>
            <div className="form-group">
                <label htmlFor="">Justificación</label>
                <textarea name="justification" id="justification" className="form-control"></textarea>
            </div>
        </form>
    )
}

export default NoveltyForm;