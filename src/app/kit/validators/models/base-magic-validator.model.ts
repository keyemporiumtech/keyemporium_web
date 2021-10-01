import { AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MessageValidatorInterface } from '../interfaces/message-validator.interface';

export class BaseMagicValidator {
	validations: MessageValidatorInterface[];
	validators: any[] | ValidationErrors[];
	value: any;
	asyncValidators?: any[] | AsyncValidatorFn[];

	constructor(validations: MessageValidatorInterface[], value?: any) {
		this.validators = [];
		this.validations = validations || [];
		this.asyncValidators = [];
		this.value = value;
	}

	generic = (validators: any[] | ValidationErrors[], messages?: MessageValidatorInterface[]) => {
		this.validations.concat(messages);
		this.validators.concat(validators);
		return this;
	};

	async(asyncValidators?: any[] | AsyncValidatorFn[]) {
		this.asyncValidators = asyncValidators;
	}

	// BUILDER
	build(async?: any | AsyncValidatorFn[]) {
		if (async) {
			this.async(async);
			return [this.value, this.validators, async];
		}

		if (this.asyncValidators) {
			return [this.value, this.validators, this.asyncValidators];
		}
		return [this.value, this.validators];
	}

	buildControl(async?: any[] | AsyncValidatorFn[]): FormControl {
		const syncValidations: ValidatorFn[] = this.validators as ValidatorFn[];
		if (async) {
			this.async(async);
			return new FormControl(this.value, syncValidations, async);
		}
		if (this.asyncValidators) {
			return new FormControl(this.value, syncValidations, this.asyncValidators);
		}
		return new FormControl(this.value, syncValidations);
	}
}
