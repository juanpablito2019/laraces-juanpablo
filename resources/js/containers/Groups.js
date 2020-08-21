const token = document.getElementById('token').content;
export const get = async ()=>{
    try {
        let res = await fetch('/groups');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const store = async (form) => {
    try {
        let fd = new FormData(form);
        fd.append('_token', token);
        let res = await fetch('/groups', {
            method:'POST',
            body:fd,
            headers:{
                'accept':'application/json'
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const destroy = async (id) => {
    try {
        let fd = new FormData();
        fd.append('_token', token);
        fd.append('_method', 'DELETE');
        let res = await fetch(`/groups/${id}`, {
            method:'POST',
            body:fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (form, id) => {
    try {
        let fd = new FormData(form);
        fd.append('_token', token);
        fd.append('_method', 'PUT');
        let res = await fetch(`/groups/${id}`, {
            method:'POST',
            body:fd,
            headers:{
                accept: 'application/json'
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const storeMass = async () => {
    try {
        let res = await fetch('/groups/mass', {
            method:'POST',
            headers:{
                'accept':'application/json',
                'X-CSRF-TOKEN': token
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const find = async (id) => {
    try {
        let res = await fetch(`/groups/${id}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const rules = {
    code_tab: {
        name: 'nombre',
        type: 'text',
        message: '',
        required: true,
        isEmpty: true,
        isInvalid: true,
        min: 3
    },
    modality_id:{
        name:'modalidad',
        type:'numeric',
        required:true,
        message: '',
        isEmpty: true,
        isInvalid: true,
    },
    formation_program_id:{
        name:'programa de formacion',
        type:'numeric',
        required:true,
        message: '',
        isEmpty: true,
        isInvalid: true,
    },
    quantity_learners:{
        name:'numero de aprendices',
        type:'numeric',
        required:true,
        message: '',
        isEmpty: true,
        isInvalid: true,
    },
    active_learners:{
        name:'aprendices activos',
        type:'numeric',
        required:true,
        message: '',
        isEmpty: true,
        isInvalid: true,
    },
    elective_start_date:{
        name:'inicio de etapa electiva',
        type:'date',
        required:true,
        message: '',
        isEmpty: true,
        isInvalid: true,
    },
    elective_end_date:{
        name:'fin de etapa electiva',
        type:'date',
        required:true,
        message: '',
        isEmpty: true,
        isInvalid: true,
    },
    practice_start_date:{
        name:'inicio de etapa practica',
        type:'date',
        required:true,
        message: '',
        isEmpty: true,
        isInvalid: true,
    },
    practice_end_date:{
        name:'fin de etapa practica',
        type:'date',
        required:true,
        message: '',
        isEmpty: true,
        isInvalid: true,
    }
};