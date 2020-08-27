const token = document.getElementById('token').content;

export const get = async ()=>{
    try {
        let res = await fetch('/infringement-classifications');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// export const store = async (form)=>{
//     try {
//         let fd = new FormData(form);
//         fd.append('_token', token);
//         let res = await fetch('/infringement-classifications', {
//             method:'POST',
//             body:fd,
//             headers:{
//                 'accept':'application/json'
//             }
//         });
//         let data = await res.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const destroy = async (id)=>{
//     try {
//         let fd = new FormData();
//         fd.append('_token', token);
//         fd.append('_method', 'DELETE');
//         let res = await fetch(`/infringement-classifications/${id}`, {
//             method:'POST',
//             body:fd
//         });
//         let data = await res.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

export const update = async (form, id)=>{
    try {
        let fd = new FormData(form);
        fd.append('_token', token);
        fd.append('_method', 'PUT');
        let res = await fetch(`/infringement-classifications/${id}`, {
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

export const find = async (id)=>{
    try {
        let res = await fetch(`/infringement-classifications/${id}`);
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const rules = {
    name:{
        name:'nombre',
        type:'text',
        message:'',
        min:3,
        required:true,
        isEmpty:true,
        isInvalid:true
    }
}
