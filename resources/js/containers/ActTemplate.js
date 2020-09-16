const token = document.getElementById('token').content;

export const index = async () => {
    try {
        let res = await fetch('/act-templates');
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
        let res = await fetch('/act-templates', {
            method: 'POST',
            body: fd,
            headers:{
                accept:'application/json'
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
        let res = await fetch(`/act-templates/${id}`);
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
        let res = await fetch(`/act-templates/${id}`, {
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

export const destroy = async (id) => {
    try {
        let fd = new FormData();
        fd.append('_method', 'DELETE');
        fd.append('_token', token);
        let res = await fetch(`/act-templates/${id}`, {
            method: 'POST',
            body: fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const findActive = async () => {
    try {
        let res = await fetch('/act-templates/active');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const findActiveByType = async (type) => {
    let res = await fetch(`/act-templates/type/${type}`);
    try {
        let data = await res.json();
        return data;
    } catch (error) {
        return {sucess: false, status: res.status};
    }
}

export const rules = {
    act_type:{
        name: 'tipo de acta',
        required: true,
        message: '',
        type: 'text',
        isInvalid: true,
        isEmpty: true
    },
    version:{
        name:'version',
        required: true,
        message: '',
        type: 'numeric',
        isInvalid: true,
        isEmpty: true
    },
    date:{
        name: 'fecha',
        required: true,
        message: '',
        type: 'date',
        isInvalid: true,
        isEmpty: true
    },
    file: {
        name: 'archivo',
        required: true,
        message: '',
        type: 'file',
        isInvalid: true,
        isEmpty: true
    },
    is_active: {
        name: 'es activa',
        required: true,
        message: '',
        type: 'numeric',
        isInvalid: true,
        isEmpty: true
    }
}