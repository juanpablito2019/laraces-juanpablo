import React, { useEffect } from 'react';

function DataTable(props) {
    useEffect(()=>{
        $('#datatable').DataTable({
            language:{
                url: 'https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
            }
        });
    },[]);
    return (
        <table className="table table-sm" width="100%" id="datatable">
            {props.children}
        </table>
    )
}

export default DataTable;