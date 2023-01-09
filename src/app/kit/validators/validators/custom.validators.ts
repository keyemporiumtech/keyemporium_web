import { AbstractControl, ValidatorFn } from '@angular/forms';

/* eslint-disable no-useless-escape */
export class CustomValidators {
	static isInteger = (control: AbstractControl) => {
		const numberRegex = /^[0-9]\d*$/;
		if (control.value && !numberRegex.test(control.value)) {
			return { notInteger: control.value };
		} else {
			return;
		}
	};

	static isDoublePrecision = (control: AbstractControl) => {
		const numberRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
		if (control.value && !numberRegex.test(control.value)) {
			return { notDoublePrecision: control.value };
		} else {
			return;
		}
	};

	static isSpecificPrecision = (digits: number) => (control: AbstractControl) => {
		const regex = new RegExp('^[0-9]+(.[0-9]{1,' + digits + '})?$');
		if (control.value && !regex.test(control.value)) {
			return { notSpecificPrecision: control.value };
		} else {
			return;
		}
	};

	static isValidEmail = (control: AbstractControl) => {
		const emailRegex = /^[A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-z]{2,6}$/;
		if (control.value && !emailRegex.test(control.value)) {
			return { notValidEmail: control.value };
		} else {
			return;
		}
	};

	static isEmptyString = (control: AbstractControl) => {
		if (control.value && !control.value.trim()) {
			return { notEmptyString: true };
		} else {
			return;
		}
	};

	static isChecked = (control: AbstractControl) => {
		if (!control.value) {
			return { notChecked: true };
		} else {
			return;
		}
	};

	static isUrl = (control: AbstractControl) => {
		const urlRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
		if (control.value && !urlRegex.test(control.value)) {
			return { notUrl: control.value };
		} else {
			return;
		}
	};

	static minMaxLength = (min: number, max: number) => (control: AbstractControl) => {
		if (control.value && (control.value.length < min || control.value.length > max)) {
			return {
				minMaxLength: { min, max },
			};
		} else {
			return;
		}
	};

	static almostOneNumber = (control: AbstractControl) => {
		const regexNumber = /\d/g; // almeno un numero
		if (control.value && !regexNumber.test(control.value)) {
			return { almostOneNumber: true };
		} else {
			return;
		}
	};

	static almostOneUpper = (control: AbstractControl) => {
		const regexLower = /[A-Z]/; // almeno una maiuscola
		if (control.value && !regexLower.test(control.value)) {
			return { almostOneUpper: true };
		} else {
			return;
		}
	};

	static almostOneLower = (control: AbstractControl) => {
		const regexUpper = /[a-z]/; // almeno una minuscola
		if (control.value && !regexUpper.test(control.value)) {
			return { almostOneLower: true };
		} else {
			return;
		}
	};

	static isEqual(otherFormControl: AbstractControl): ValidatorFn {
		return (control: AbstractControl) => {
			if (control.value && otherFormControl && control.value !== otherFormControl.value) {
				return { notEqual: true };
			} else {
				return;
			}
		};
	}
}
