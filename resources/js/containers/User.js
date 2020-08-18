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

export const store = async function(form) {
    try {
        let fd = new FormData(form);
        fd.append("_token", token);
        let res = await fetch("/users", {
            method: "POST",
            body: fd
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

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
