const token = document.getElementById('token').content;
export const get = async (committee_id) => {
    try {
        let res = await fetch(`/learner-novelties/${committee_id}`);
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
        let res = await fetch('/learner-novelties', {
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

export const rules = {
    learner_id: {
        name: 'aprendiz',
        required: true,
        type: 'numeric',
        message:'',
        isEmpty: true,
        isInvalid: true
    },
    novelty_type_id:{
        name: 'tipo de novedad',
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