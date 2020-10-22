const token = document.getElementById("token").content;

export const get = async function() {
    try {
        let res = await fetch("/users", {
            headers: {
                accept: "application/json"
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getByRol = async function(id) {
    try {
        let res = await fetch(`/roles/${id}`, {
            headers: {
                accept: "application/json"
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const store = async (form) => {
    try {
        let fd = new FormData(form);
        fd.append('_token', token);
        let res = await fetch('/users', {
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

export const update = async function(form, id) {
    try {
        let fd = new FormData(form);
        fd.append("_token", token);
        fd.append("_method", "PUT");
        let res = await fetch("/users/" + id, {
            method: "POST",
            body: fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const destroy = async function(id) {
    try {
        let fd = new FormData();
        fd.append("_token", token);
        fd.append("_method", "DELETE");
        let res = await fetch("/users/" + id, {
            method: "POST",
            body: fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const find = async function(id) {
    try {
        let res = await fetch("/users/" + id);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const updatePersonalInformation = async function (id, form) {
    try {
        const fd = new FormData(form);
        fd.append('_method', 'PUT');
        fd.append('_token', token);
        let res = await fetch(`/users/${id}/personalInformation`, {
            method: 'POST',
            body: fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updatePassword = async function (id, form) {
    try {
        const fd = new FormData(form);
        fd.append('_method', 'PUT');
        fd.append('_token', token);
        let res = await fetch(`/users/${id}/updatePassword`, {
            method: 'POST',
            body: fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllCommittes = async () => {
    try {
        let res = await fetch('/users/get-all-committee');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllStimulus = async () => {
    try {
        let res = await fetch('/users/get-all-stimulus');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllSanction = async () => {
    try {
        let res = await fetch('/users/get-all-sanction');
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
        // Rules
        required: true,
        isEmpty: true,
        isInvalid: true
    },
    email:{
        name:'correo',
        type:'email',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    }
};
