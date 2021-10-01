import { FormControl } from '@angular/forms';
import { MessageValidatorInterface, StringTranslate } from '@ddc/kit';
import { FormInputValidationStyleInterface } from '../interfaces/form/form-input-validation-style.interface';

export class FormValidatorsUtil {
	static isCome(
		formControl: FormControl,
		flgOnInitValidation?: boolean,
		flgOnSubmitValidation?: boolean,
		submitted?: boolean,
	): boolean {
		return flgOnSubmitValidation
			? submitted
			: (formControl && (formControl.dirty || formControl.touched)) ||
					(flgOnInitValidation && formControl.untouched);
	}

	static buildErrors(
		formControl: FormControl,
		validations: MessageValidatorInterface[],
	): (string | StringTranslate)[] {
		let errorMessages: (string | StringTranslate)[];
		if (validations && validations.length) {
			errorMessages = [];
			validations.forEach((validation) => {
				if (formControl.hasError(validation.type)) {
					errorMessages.push(new StringTranslate(validation.message, validation.params));
				}
			});
		}
		return errorMessages;
	}

	static buildValids(
		showValids: boolean,
		formControl: FormControl,
		valids: (string | StringTranslate)[],
	): (string | StringTranslate)[] {
		let validMessages: (string | StringTranslate)[];
		if (showValids && formControl.valid && valids && valids.length) {
			validMessages = valids;
		}
		return validMessages;
	}

	static buildStyleMessages(formControl: FormControl, styles: FormInputValidationStyleInterface[]) {
		let styleMessages: FormInputValidationStyleInterface[];
		if (styles && styles.length) {
			styleMessages = [];
			styles.forEach((style) => {
				if (style.condition(formControl)) {
					styleMessages.push(style);
				}
			});
		}
		return styleMessages;
	}
}
