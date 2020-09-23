import { trim } from "lodash";

// Regex
export const emailRegex = RegExp(
	/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i
);

export const numberRegex = RegExp(
	/^[0-9]+$/
);

export const dateRegex = RegExp(
	/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/
);

export const timeRegex = RegExp(
	/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
);

export const setRules = (rules, value=true) => {
	let rulesName = Object.keys(rules);
	rulesName.map(ruleName => {
		rules[ruleName].isInvalid = value;
		rules[ruleName].isEmpty = value;
		rules[ruleName].message = '';
	});
	return rules;
}

export const formValid = (rules) => {
	let valid = true;
	let rulesName = Object.keys(rules);

	rulesName.map((ruleName) => {
		if (rules[ruleName]['isInvalid']) {
			valid = false
		}
	});
	return valid;
}


export const validate = (name, value, rules) => {
	value = trim(value);
	if (rules[name].type === 'text') {
		if (rules[name].required && value.length === 0) {
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es requerido`;
		} else if(value.length < rules[name].min ){
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} debe tener minimo ${rules[name].min} caracteres`;
		} else if(value.length > rules[name].max ){
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} no debe tener mas de ${rules[name].max} caracteres`;
		} else {
			rules[name].isEmpty = false;
			rules[name].isInvalid = false;
			rules[name].message = '';
		}
	}
	if(rules[name].type === 'numeric'){
		if (rules[name].required && value.length === 0) {
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es requerido`;
		}else if(value.length < rules[name].min){
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} debe tener minimo ${rules[name].min} caracteres`;
		}else if(!numberRegex.test(value)){
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es invalido`;
		}else{
			rules[name].isEmpty = false;
			rules[name].isInvalid = false;
			rules[name].message = '';
		}
    }
    if(rules[name].type === 'email'){
		if (rules[name].required && value.length === 0) {
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es requerido`;
		}else if(!emailRegex.test(value)){
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es invalido`;
		}else{
			rules[name].isEmpty = false;
			rules[name].isInvalid = false;
			rules[name].message = '';
		}
	}
	if(rules[name].type === 'date'){
		if (rules[name].required && value.length === 0) {
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es requerido`;
		}else if(!dateRegex.test(value)){
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es invalido`;
		}else{
			rules[name].isEmpty = false;
			rules[name].isInvalid = false;
			rules[name].message = '';
		}
	}
	if(rules[name].type === 'time'){
		if (rules[name].required && value.length === 0) {
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es requerido`;
		}else if(!timeRegex.test(value)){
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es invalido`;
		}else{
			rules[name].isEmpty = false;
			rules[name].isInvalid = false;
			rules[name].message = '';
		}
	}
	if(rules[name].type === 'file'){
		if (rules[name].required && value.length === 0) {
			rules[name].isEmpty = true;
			rules[name].isInvalid = true;
			rules[name].message = `El campo ${rules[name].name} es requerido`;
		}else{
			rules[name].isEmpty = false;
			rules[name].isInvalid = false;
			rules[name].message = '';
		}
	}
	return rules;
}
