import { AbstractControl, Validators, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { DateModel } from '../../timing/models/date.model';
import { MessageValidatorInterface } from '../interfaces/message-validator.interface';
import { CustomValidatorsMessages } from '../messages/custom-validators.messages';
import { DateValidatorsMessages } from '../messages/date-validators.messages';
import { BaseMagicValidator } from '../models/base-magic-validator.model';
import { CustomValidators } from '../validators/custom.validators';
import { DateValidators } from '../validators/date.validators';

export class MagicValidatorUtil extends BaseMagicValidator {
	constructor(validations: MessageValidatorInterface[], value?: any) {
		super(validations, value);
	}

	// GENERIC
	// PUSH
	push(validator: any | ValidationErrors, message: MessageValidatorInterface) {
		this.validations.push(message);
		this.validators.push(validator);
		return this;
	}

	pushAsync(validator: any | AsyncValidatorFn, message: MessageValidatorInterface) {
		this.validations.push(message);
		this.asyncValidators.push(validator);
		return this;
	}

	// KNOWN
	min = (min: number, message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.MIN(min, message, params));
		this.validators.push(Validators.min(min));
		return this;
	};

	max = (max: number, message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.MAX(max, message, params));
		this.validators.push(Validators.max(max));
		return this;
	};

	required = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.REQUIRED(message, params));
		this.validators.push(Validators.required);
		return this;
	};

	requiredTrue = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.REQUIRED(message, params));
		this.validators.push(Validators.requiredTrue);
		return this;
	};

	email = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.EMAIL(message, params));
		this.validators.push(Validators.email);
		return this;
	};

	minLength = (min: number, message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.MIN_LENGTH(min, message, params));
		this.validators.push(Validators.minLength(min));
		return this;
	};

	maxLength = (max: number, message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.MAX_LENGTH(max, message, params));
		this.validators.push(Validators.maxLength(max));
		return this;
	};

	pattern = (pattern: string | RegExp, message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.PATTERN(pattern, message, params));
		this.validators.push(Validators.pattern(pattern));
		return this;
	};

	// CUSTOM VALIDATORS
	isInteger = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.IS_INTEGER(message, params));
		this.validators.push(CustomValidators.isInteger);
		return this;
	};

	isDoublePrecision = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.IS_DOUBLE_PRECISION(message, params));
		this.validators.push(CustomValidators.isDoublePrecision);
		return this;
	};

	isSpecificPrecision = (digits: number, message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.IS_SPECIFIC_PRECISION(digits, message, params));
		this.validators.push(CustomValidators.isSpecificPrecision(digits));
		return this;
	};

	isValidEmail = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.IS_VALID_EMAIL(message, params));
		this.validators.push(CustomValidators.isValidEmail);
		return this;
	};

	isEmptyString = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.IS_EMPTY_STRING(message, params));
		this.validators.push(CustomValidators.isEmptyString);
		return this;
	};

	isChecked = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.IS_CHECKED(message, params));
		this.validators.push(CustomValidators.isChecked);
		return this;
	};

	isUrl = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.IS_URL(message, params));
		this.validators.push(CustomValidators.isUrl);
		return this;
	};

	minMaxLength = (min: number, max: number, message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.MIN_MAX_LENGTH(min, max, message, params));
		this.validators.push(CustomValidators.minMaxLength(min, max));
		return this;
	};

	almostOneNumber = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.ALMOST_ONE_NUMBER(message, params));
		this.validators.push(CustomValidators.almostOneNumber);
		return this;
	};

	almostOneUpper = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.ALMOST_ONE_UPPER(message, params));
		this.validators.push(CustomValidators.almostOneUpper);
		return this;
	};

	almostOneLower = (message?: string, params?: any) => {
		this.validations.push(CustomValidatorsMessages.ALMOST_ONE_LOWER(message, params));
		this.validators.push(CustomValidators.almostOneLower);
		return this;
	};

	isEqual = (
		otherFormControl: AbstractControl,
		from: string,
		to: string,
		message?: string,
		params?: any,
	) => {
		this.validations.push(CustomValidatorsMessages.IS_EQUAL(from, to, message, params));
		this.validators.push(CustomValidators.isEqual(otherFormControl));
		return this;
	};

	// DATE
	isDate = (message?: string, params?: any) => {
		this.validations.push(DateValidatorsMessages.IS_DATE(message, params));
		this.validators.push(DateValidators.isDate);
		return this;
	};

	mustBeLessThan = (
		otherFormControl: AbstractControl | DateModel,
		other: string,
		message?: string,
		params?: any,
	) => {
		this.validations.push(DateValidatorsMessages.MUST_BE_LESS_THAN(other, message, params));
		this.validators.push(DateValidators.mustBeLessThan(otherFormControl));
		return this;
	};

	mustBeLessOrEqualThan = (
		otherFormControl: AbstractControl | DateModel,
		other: string,
		message?: string,
		params?: any,
	) => {
		this.validations.push(
			DateValidatorsMessages.MUST_BE_LESS_OR_EQUAL_THAN(other, message, params),
		);
		this.validators.push(DateValidators.mustBeLessOrEqualThan(otherFormControl));
		return this;
	};

	mustBeLessThanCurrent = (message?: string, params?: any) => {
		this.validations.push(DateValidatorsMessages.MUST_BE_LESS_THAN_CURRENT(message, params));
		this.validators.push(DateValidators.mustBeLessThanCurrent);
		return this;
	};

	mustBeLessOrEqualThanCurrent = (message?: string, params?: any) => {
		this.validations.push(
			DateValidatorsMessages.MUST_BE_LESS_OR_EQUAL_THAN_CURRENT(message, params),
		);
		this.validators.push(DateValidators.mustBeLessOrEqualThanCurrent);
		return this;
	};

	mustBeGreaterThan = (
		otherFormControl: AbstractControl | DateModel,
		other: string,
		message?: string,
		params?: any,
	) => {
		this.validations.push(DateValidatorsMessages.MUST_BE_GREATER_THAN(other, message, params));
		this.validators.push(DateValidators.mustBeGreaterThan(otherFormControl));
		return this;
	};

	mustBeGreaterOrEqualThan = (
		otherFormControl: AbstractControl | DateModel,
		other: string,
		message?: string,
		params?: any,
	) => {
		this.validations.push(
			DateValidatorsMessages.MUST_BE_GREATER_OR_EQUAL_THAN(other, message, params),
		);
		this.validators.push(DateValidators.mustBeGreaterOrEqualThan(otherFormControl));
		return this;
	};

	mustBeGreaterThanCurrent = (message?: string, params?: any) => {
		this.validations.push(DateValidatorsMessages.MUST_BE_GREATER_THAN_CURRENT(message, params));
		this.validators.push(DateValidators.mustBeGreaterThanCurrent);
		return this;
	};

	mustBeGreaterOrEqualThanCurrent = (message?: string, params?: any) => {
		this.validations.push(
			DateValidatorsMessages.MUST_BE_GREATER_OR_EQUAL_THAN_CURRENT(message, params),
		);
		this.validators.push(DateValidators.mustBeGreaterOrEqualThanCurrent);
		return this;
	};
}
