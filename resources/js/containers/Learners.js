const token = document.getElementById('token').content;
export const get = async ()=>{
    try {
        let res = await fetch('/learners');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const importLearners = async (form) => {
    try {
        let fd = new FormData(form);
        fd.append('_token', token);
        let res = await fetch('/learners/import', {
            method:'POST',
            body:fd
        });
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
        let res = await fetch('/learners', {
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
        let res = await fetch(`/learners/${id}`, {
            method:'POST',
            body:fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getByFormationProgram = async function(id){
    try {
        let res = await fetch(`/groups/get-by-formation-program/${id}`);
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
        let res = await fetch(`/learners/${id}`, {
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

export const find = async (id) => {
    try {
        let res = await fetch(`/learners/${id}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const rules = {
    name:{
        // Properties
        name: 'nombre',
        type:'text',
        message:'',
        // Rules
        required:true,
        isEmpty: true,
        isInvalid:true
    },
    document_type:{
        name: 'tipo de documento',
        type:'text',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    },
    document:{
        name: 'documento',
        type:'numeric',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    },
    email:{
        name: 'correo electronico',
        type:'email',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    },
    birthdate:{
        name: 'fecha nacimiento',
        type:'date',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    },
    phone:{
        name: 'telefono',
        type:'numeric',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    },
    formation_program:{
        name: 'programa de formacion',
        type:'numeric',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    },
    group_id:{
        name: 'grupo',
        type:'numeric',
        message:'',
        required:true,
        isEmpty: true,
        isInvalid:true
    },
};