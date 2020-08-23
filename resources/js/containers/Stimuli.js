const token = document.getElementById('token').content;
export const get = async (committee_id) => {
    try {
        let res = await fetch(`/stimuli/${committee_id}`);
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
        let res = await fetch('/stimuli', {
            method: 'POST',
            body: fd,
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

export const update = async (form, id) => {
    try {
        let fd = new FormData(form);
        fd.append('_method', 'PUT');
        fd.append('_token', token);
        let res = await fetch(`/stimuli/update/${id}`, {
            method: 'POST',
            body: fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const find = async (id) => {
    try {
        let res = await fetch(`/stimuli/show/${id}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const destroy = async (id) => {
    try {
        let fd = new FormData();
        fd.append('_method', 'DELETE');
        fd.append('_token', token);
        let res = await fetch(`/stimuli/delete/${id}`, {
            body: fd,
            method: 'POST'
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const rules = {
    learner_id: {
        name: 'aprendiz',
        required: true,
        type: 'numeric',
        message:'',
        isEmpty: true,
        isInvalid: true
    },
    stimulus:{
        name: 'estimulo',
        required:true,
        type: 'text',
        message:'',
        isEmpty: true,
        isInvalid: true
    },
    justification:{
        name: 'justificacion',
        required: true,
        type:'text',
        message:'',
        isEmpty: true,
        isInvalid: true
    }
}