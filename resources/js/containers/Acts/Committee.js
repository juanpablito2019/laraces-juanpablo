const token = document.getElementById("token").content;

export const save = async (form, id) => {
    try {
        let fd = new FormData(form);
        fd.append('_method', 'PUT');
        fd.append('_token', token);
        let res = await fetch(`/save-committee/${id}`, {
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

export const exportWord = async (id) => {
    try {
        let res = await fetch(`/export-committee/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}