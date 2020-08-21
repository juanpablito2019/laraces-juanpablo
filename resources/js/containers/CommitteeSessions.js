const token = document.getElementById("token").content;

export const store = async (form) => {
	try {
		let fd = new FormData(form);
		fd.append("_token", token);
		let res = await fetch(`/committee-sessions/`, {
			method: "POST",
			body: fd,
		});
		let data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const rules = {
	complainer_id: {
		name: "quejoso",
		required: false,
		message: "",
		type: "numeric",
		isInvalid: false,
		isEmpty: true,
	},
	committee_session_state_id: {
		name: "estado del comité",
		required: false,
		message: "",
		type: "numeric",
		isInvalid: false,
		isEmpty: true,
	},
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
	infringement_classification_id: {
		name: "clasificacion de la infraccion",
		required: true,
		message: "",
		type: "numeric",
		isInvalid: true,
		isEmpty: true,
	},
	act_sanction_id: {
		name: "sancion",
		required: true,
		message: "",
		type: "numeric",
		isInvalid: true,
		isEmpty: true,
	},
	place: {
		name: "lugar",
		required: true,
		message: "",
		type: "text",
		isInvalid: true,
		isEmpty: true,
	},
	start_hour: {
		name: "hora inicio",
		required: true,
		message: "",
		type: "time",
		isInvalid: true,
		isEmpty: true,
	},
	end_hour: {
		name: "hora fin",
		required: true,
		message: "",
		type: "time",
		isInvalid: true,
		isEmpty: true,
	},
	date_academic_act_sanction: {
		name: "fecha de sancion academica",
		required: true,
		message: "",
		type: "date",
		isInvalid: true,
		isEmpty: true,
	},
	date_notification_act_sanction: {
		name: "fecha de notification de sancion academica",
		required: true,
		message: "",
		type: "date",
		isInvalid: true,
		isEmpty: true,
	},
	date_expiration_act_sanction: {
		name: "fecha de notification de sancion academica",
		required: true,
		message: "",
		type: "date",
		isInvalid: true,
		isEmpty: true,
	},
	date_lifting_act_sanction: {
		name: "fecha de levantamiento de sancion academica",
		required: true,
		message: "",
		type: "date",
		isInvalid: true,
		isEmpty: true,
	},
	sanction_justification: {
		name: "justificacion de la sancion",
		required: true,
		message: "",
		type: "text",
		isInvalid: true,
		isEmpty: true,
	},
	notification_acts: {
		name: "Hechos",
		required: true,
		message: "",
		type: "text",
		isInvalid: true,
		isEmpty: true,
	},
};
