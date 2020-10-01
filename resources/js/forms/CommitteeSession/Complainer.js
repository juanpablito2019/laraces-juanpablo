import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Loader from '../../components/Loader';
import { get as IndexResponsibles } from '../../containers/ResponsiblesFormativeMeasures';
import { get as IndexFormativeMeasures } from '../../containers/FormativeMeasures';
import { get as IndexComplainers } from '../../containers/Complainer';

function Complainer({ index, onCancel, tcmp, company, responsible, measure, companyId, responsibleId, onSelectType }) {
    const [typeComplainer, setTypeComplainer] = useState(tcmp);
    const [responsibles, setResponsibles] = useState(null);
    const [formativeMeasures, setFormativeMeasures] = useState(null);
    const [complainers, setComplainers] = useState(null);
    const [tmpComplainers, setTmpComplainers] = useState([]);

    const getResponsibles = async () => {
        let data = await IndexResponsibles();
        let d = [];
        for (let i = 0; i < data.length; i++) {
            d.push({
                label: `${data[i].username} (${data[i].document})`,
                value: data[i].id
            });
        }
        setResponsibles(d);
    }

    const getFormativeMeasures = async () => {
        let data = await IndexFormativeMeasures();
        setFormativeMeasures(data);
    }

    const getComplainers = async () => {
        let data = await IndexComplainers();
        setComplainers(data);
    }

    const searchComplainer = (e) => {
        let value = e.target.value;
        let matches = complainers.filter(complainer => {
            let rgx = new RegExp(`^${value}`, 'gi');
            return complainer.name.match(rgx)
        });
        if (value.length == 0) {
            matches = [];
        }
        setTmpComplainers(matches);
    }

    const selectComplainer = (e) => {
        let id = $(e.target).data('id');
        let complainer = complainers.filter(cmp => cmp.id == id)[0];
        $('#name').val(complainer.name);
        $('#document_type').val(complainer.document_type);
        $('#document').val(complainer.document);
        setTmpComplainers([]);
    }

    const handleTypeComplainer = (e) => {
        setTypeComplainer(e.target.value);
        onSelectType(e.target.value, index);
    }

    useEffect(() => {
        getResponsibles();
        getFormativeMeasures();
        getComplainers();
    }, []);

    if (!responsibles || !formativeMeasures || !complainers) {
        return <Loader />
    }
    return (
        <div className={tcmp == "0" ? "card border mb-4 border-primary": typeComplainer == "0" ? "card border mb-2 border-primary" : "card border mb-2"}>
            <div className="card-body">
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={"type_complainer[" + index + "]"} id={"responsibles" + index} onClick={handleTypeComplainer} value="1" defaultChecked={tcmp == 1 ?? true} />
                        <label className="form-check-label" htmlFor={"responsibles" + index}>
                            Responsables de medida formativa
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={"type_complainer[" + index + "]"} id={"complainer" + index} onClick={handleTypeComplainer} value="0" defaultChecked={tcmp == 0 ?? true} />
                        <label className="form-check-label" htmlFor={"complainer" + index}>
                            Empresa
                        </label>
                    </div>
                </div>
                {typeComplainer ? (
                    typeComplainer == 1 ? (
                        <>
                            <div className="form-group">
                                <label>Nombre o numero de documento</label>
                                <Select
                                    name={"responsibles[" + index + "]"}
                                    id="responsibles"
                                    options={responsibles}
                                    defaultValue={responsible ? { label: responsible.username + " (" + responsible.document + ")", value: responsible.id } : ""}
                                />
                            </div>
                            <div className="form-group">
                                <label>Medida formativa</label>
                                {formativeMeasures.map((formativeMeasure, i) => (
                                    <div className="form-check" key={i}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={"formative_measures[" + index + "]"}
                                            id={"formative_measure" + formativeMeasure.id + "_" + index}
                                            value={formativeMeasure.id}
                                            defaultChecked={measure == formativeMeasure.id ?? true}
                                        />
                                        <label className="form-check-label" htmlFor={"formative_measure" + formativeMeasure.id + "_" + index}>
                                            {formativeMeasure.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                            <>
                                <div className="form-group">
                                    <label>Nombre de la empresa</label>
                                    <input type="text" name="name" id="name" className="form-control" onInput={searchComplainer} defaultValue={company ? company.name : ""} autoComplete="off" />
                                    <div className="list-group">
                                        {tmpComplainers.map((cmp, i) => (
                                            <div onClick={selectComplainer} data-id={cmp.id} key={i} className="list-group-item list-group-item-action">{cmp.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col">
                                            <label>Tipo de documento</label>
                                            <select className="form-control" name="document_type" id="document_type" defaultValue={company ? company.document_type : ""}>
                                                <option value="">Seleccion uno</option>
                                                <option value="CE">Cedula extranjera</option>
                                                <option value="CC">Cedula de ciudadania</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label>Numero de documento</label>
                                            <input type="number" name="document" id="document" className="form-control" defaultValue={company ? company.document : ""} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                ) : (
                        <h6 className="text-muted">Por favor seleccione tipo de quejoso respectivo</h6>
                    )}
                <button data-index={index} data-id={companyId || responsibleId} onClick={onCancel} type="button" className="btn btn-sm btn-outline-danger">Cancelar</button>
            </div>
        </div>
    )
}

export default Complainer;