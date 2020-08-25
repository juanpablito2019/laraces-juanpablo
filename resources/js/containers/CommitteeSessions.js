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
		required: false,
		message: "",
		type: "numeric",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_id: {
		name: "sancion",
		required: false,
		message: "",
		type: "numeric",
		isInvalid: false,
		isEmpty: false,
	},
	place: {
		name: "lugar",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	start_hour: {
		name: "hora inicio",
		required: false,
		message: "",
		type: "time",
		isInvalid: false,
		isEmpty: false,
	},
	end_hour: {
		name: "hora fin",
		required: false,
		message: "",
		type: "time",
		isInvalid: false,
		isEmpty: false,
	},
	date_academic_act_sanction: {
		name: "fecha de sancion academica",
		required: false,
		message: "",
		type: "date",
		isInvalid: false,
		isEmpty: false,
	},
	date_notification_act_sanction: {
		name: "fecha de notification de sancion academica",
		required: false,
		message: "",
		type: "date",
		isInvalid: false,
		isEmpty: false,
	},
	date_expiration_act_sanction: {
		name: "fecha de notification de sancion academica",
		required: false,
		message: "",
		type: "date",
		isInvalid: false,
		isEmpty: false,
	},
	date_lifting_act_sanction: {
		name: "fecha de levantamiento de sancion academica",
		required: false,
		message: "",
		type: "date",
		isInvalid: false,
		isEmpty: false,
	},
	sanction_justification: {
		name: "justificacion de la sancion",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	notification_acts: {
		name: "hechos",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	notification_infringments: {
		name: "faltas",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_a_case_treat: {
		name: "caso a tratar",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_a_type_discharge: {
		name: "tipo de descargos",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_a_discharges: {
		name: "descargos",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_a_clarification: {
		name: "aclaracion",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_b_valuation_discharges: {
		name: "Evaluacion de descargos",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_b_existing_behavior: {
		name: "",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_b_behavior_type: {
		name: "",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_b_responsability_grade: {
		name: "grado de responsabilidad",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_b_infringement_classification: {
		name: "grado de responsabilidad",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	committee_b_determination_sanction_recomendation: {
		name: "determinacion recomendacion de la sancion",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_acts_investigated: {
		name: "actos investigados",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_acts_discharges: {
		name: "descargo de actos",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_acts_evidences: {
		name: "evidencia de los actos",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_acts_evidence_analysis: {
		name: "analisis de las evidencias",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_infringements: {
		name: "faltas",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_responsability_grade: {
		name: "grado de responsabilidad",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_definitive_infringement_classification: {
		name: "clasificacion definitiva de la clasificacion de la falta",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_infringement_type: {
		name: "tipo de falta",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_reasons: {
		name: "razones",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_notification: {
		name: "notificacion",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
	act_sanction_committee_recomendation: {
		name: "recomendacion del comite",
		required: false,
		message: "",
		type: "text",
		isInvalid: false,
		isEmpty: false,
	},
};
