import React from 'react';

function Loader(props) {
    return (
        <div className="row">
            <div className="col-6 mx-auto text-center">
                <h6>{props.message || 'Cargando...'}</h6>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}
export default Loader;