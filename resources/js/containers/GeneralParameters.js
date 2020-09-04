const token = document.getElementById('token').content;
export const get = async () => {
    try {
        let res = await fetch('/general-parameters');
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
        let res = await fetch(`/general-parameters/${id}`, {
            method:'POST',
            body:fd,
            headers:{
                accept :'application/json'
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
        let res = await fetch(`/general-parameters/${id}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const rules = {
    name: {
        // Properties
        name: 'nombre',
        type: 'text',
        message: '',
        min: 5,
        // Rules
        required: true,
        isEmpty: true,
        isInvalid: true
    }
};
