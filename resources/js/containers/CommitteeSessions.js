const token = document.getElementById("token").content;

export const store = async (form) => {
	try {
		let fd = new FormData(form);
		fd.append("_token", token);
		let res = await fetch(`/committee-sessions/`, {
			method: "POST",
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
};

export const update = async (form, id) => {
	try {
		let fd = new FormData(form);
		fd.append('_method', 'PUT');
		fd.append('_token', token);
		let res = await fetch(`/committee-sessions/${id}`, {
			method: 'POST',
			body: fd
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const find = async (id) => {
	try {
		let res = await fetch(`/committee-sessions/${id}`);
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const destroy = async (id) => {
	try {
		let fd = new FormData();
		fd.append('_method','DELETE');
		fd.append('_token', token);
		let res = await fetch(`/committee-sessions/${id}`, {
			method:'POST',
			body: fd
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const updateState = async (id, state) => {
	try {
		let fd = new FormData();
		fd.append('_method', 'PUT');
		fd.append('_token', token);
		fd.append('state_id', state);
		let res = await fetch(`/committee-sessions/${id}/update-state`, {
			method: 'POST',
			body: fd
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const deleteComplainer = async (id) => {
	try {
		let fd = new FormData();
		fd.append('_method', 'PUT');
		fd.append('_token', token);
		let res = await fetch(`/committee-sessions/${id}/delete-complainer`, {
			method: 'POST',
			body: fd
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const detachResponsible = async (id, responsibleId) => {
	try {
		let fd = new FormData();
		fd.append('_method', 'PUT');
		fd.append('_token', token);
		fd.append('responsible_id', responsibleId);
		let res = await fetch(`/committee-sessions/${id}/detach-responsible`, {
			method: 'POST',
			body: fd
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const updateStateFormativeMeasure = async (id, responsibleId, state) => {
	try {
		let fd = new FormData();
		fd.append('_method', 'PUT');
		fd.append('_token', token);
		fd.append('responsible_id', responsibleId);
		fd.append('state', state);
		let res = await fetch(`/committee-sessions/${id}/set-state`, {
			method: 'POST',
			body: fd
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const setDescriptionFormativeMeasure = async(id, responsibleId, form) => {
	try {
		let fd = new FormData(form);
		fd.append('_method', 'PUT');
		fd.append('_token', token);
		fd.append('responsible_id', responsibleId);
		let res = await fetch(`/committee-sessions/${id}/set-description`, {
			method: 'POST',
			body: fd
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const rules = {
	learner_id: {
		name: "aprendiz",
		required: true,
		message: "",
		type: "numeric",
		isInvalid: true,
		isEmpty: true,
	},
	infringement_type_id: {
		name: "tipo de infraccion",
		required: true,
		message: "",
		type: "numeric",
		isInvalid: true,
		isEmpty: true,
	},
};
