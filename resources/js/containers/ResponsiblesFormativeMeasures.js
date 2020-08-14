const token = document.getElementById('token').content;
export const get = async ()=>{
    try {
        let res = await fetch('/formative-measure-responsibles');
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
        let res = await fetch('/formative-measure-responsibles', {
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
        let res = await fetch(`/formative-measure-responsibles/${id}`, {
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
        let res = await fetch(`/formative-measure-responsibles/${id}`, {
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

export const storeMass = async () => {
    try {
        let res = await fetch('/formative-measure-responsibles/mass', {
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
        let res = await fetch(`/formative-measure-responsibles/${id}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const rules = {
    username: {
        // Properties
        name: 'Nombre',
        type: 'text',
        message: '',
        min:6,
        // Rules
        required: true,
        isEmpty: true,
        isInvalid: true
    },
    misena_email:{
        name:'correo Misena',
        type:'email',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    institutional_email:{
        name:'correo institucional',
        type:'email',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    document_type:{
        name:'tipo de documento',
        type:'text',
        max:3,
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    document:{
        name:'documento',
        type:'numeric',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    birthdate:{
        name:'Fecha de nacimiento',
        type:'date',
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    phone:{
        name:'celular',
        type:'numeric',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    phone_ip:{
        name:'telefono',
        type:'numeric',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    gender:{
        name:'genero',
        type:'text',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    position_id:{
        name:'cargo',
        type:'numeric',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    contract_type_id:{
        name:'tipo de contrato',
        type:'numeric',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    type:{
        name:'tipo',
        type:'text',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    },
    state:{
        name:'estado',
        type:'text',
        required:true,
        message:'',
        isEmpty: true,
        isInvalid:true
    }
};
