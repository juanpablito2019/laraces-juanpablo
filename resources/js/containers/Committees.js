const token = document.getElementById("token").content;

export const get = async () => {
    try {
        let res = await fetch("/committees");
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const store = async form => {
    try {
        let fd = new FormData(form);
        fd.append("_token", token);
        let res = await fetch("/committees", {
            method: "POST",
            body: fd,
            headers: {
                accept: "application/json"
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }``
};

export const update = async (form, id) => {
    try {
        let fd = new FormData(form);
        fd.append("_token", token);
        fd.append("_method", 'PUT');
        let res = await fetch(`/committees/${id}`, {
            method: "POST",
            body: fd,
            headers: {
                accept: "application/json"
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }``
};

export const find = async id => {
    try {
        let res = await fetch(`/committees/${id}`, {
            headers: {
                accept: "application/json"
            }
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const destroy = async id => {
    try {
        let fd = new FormData();
        fd.append('_token', token);
        fd.append('_method', 'DELETE');
        let res = await fetch(`/committees/${id}`, {
            method: 'POST',
            body: fd,
            headers: {
                accept: 'application/json'
            }
        });
        let data = await res.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

export const rules = {
    record_number: {
        name: "numero de acta",
        type: "numeric",
        message: "",
        min: 3,
        required: true,
        isInvalid: true,
        isEmpty: true
    },
    date: {
        name: "fecha",
        type: "date",
        message: "",
        required: true,
        isInvalid: true,
        isEmpty: true
    },
    start_hour: {
        name: "hora inicio",
        type: "time",
        message: "",
        required: true,
        isInvalid: true,
        isEmpty: true
    },
    end_hour: {
        name: "hora fin",
        type: "time",
        message: "",
        required: false,
        isInvalid: false,
        isEmpty: false
    },
    place: {
        name: "lugar",
        type: "text",
        message: "",
        required: true,
        isInvalid: true,
        isEmpty: true
    },
    formation_center: {
        name: "centro de formacion",
        type: "text",
        message: "",
        required: true,
        isInvalid: true,
        isEmpty: true
    },
    subdirector_name: {
        name: "subdirector",
        type: "text",
        message: "",
        required: true,
        isInvalid: true,
        isEmpty: true
    },
    coordinador_name: {
        name: "coordinador",
        type: "text",
        message: "",
        required: true,
        isInvalid: true,
        isEmpty: true
    },
};
