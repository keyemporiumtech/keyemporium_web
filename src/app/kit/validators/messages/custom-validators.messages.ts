import { MessageValidatorUtil } from '../utils/message-validator.util';

export class CustomValidatorsMessages {
	// COMMONS

	public static MIN = (min: number, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'min',
			message ? message : 'VALIDATION.NUMBER.MIN',
			params ? params : { min: min },
		);
	};

	public static MAX = (max: number, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'max',
			message ? message : 'VALIDATION.NUMBER.MAX',
			params ? params : { max: max },
		);
	};

	public static REQUIRED = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'required',
			message ? message : 'VALIDATION.REQUIRED',
			params,
		);
	};

	public static EMAIL = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'email',
			message ? message : 'VALIDATION.EMAIL',
			params,
		);
	};

	public static MIN_LENGTH = (min: number, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'minlength',
			message ? message : 'VALIDATION.MIN_LENGTH',
			params ? params : { min: min },
		);
	};

	public static MAX_LENGTH = (max: number, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'maxlength',
			message ? message : 'VALIDATION.MAX_LENGTH',
			params ? params : { max: max },
		);
	};

	public static PATTERN = (pattern: string | RegExp, message?: string, params?: any) => {
		let text: string = '';
		if (typeof pattern === 'string') {
			text = pattern;
		} else if (pattern instanceof RegExp) {
			text = pattern.source;
		}
		return MessageValidatorUtil.getMessageValidator(
			'pattern',
			message ? message : 'VALIDATION.PATTERN',
			params ? params : { pattern: text },
		);
	};

	// CUSTOM
	public static IS_INTEGER = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notInteger',
			message ? message : 'VALIDATION.INTEGER',
			params,
		);
	};

	public static IS_DOUBLE_PRECISION = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notDoublePrecision',
			message ? message : 'VALIDATION.DOUBLE_PRECISION',
			params,
		);
	};

	public static IS_SPECIFIC_PRECISION = (digits: number, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notSpecificPrecision',
			message ? message : 'VALIDATION.SPECIFIC_PRECISION',
			params ? params : { digits: digits },
		);
	};

	public static IS_VALID_EMAIL = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notValidEmail',
			message ? message : 'VALIDATION.EMAIL',
			params,
		);
	};

	public static IS_EMPTY_STRING = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notEmptyString',
			message ? message : 'VALIDATION.REQUIRED',
			params,
		);
	};

	public static IS_CHECKED = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notChecked',
			message ? message : 'VALIDATION.REQUIRED',
			params,
		);
	};

	public static IS_URL = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notUrl',
			message ? message : 'VALIDATION.URL',
			params,
		);
	};

	public static MIN_MAX_LENGTH = (min: number, max: number, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'minMaxLength',
			message ? message : 'VALIDATION.MIN_MAX_LENGTH',
			params ? params : { min: min, max: max },
		);
	};

	public static ALMOST_ONE_NUMBER = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'almostOneNumber',
			message ? message : 'VALIDATION.ALMOST_ONE_NUMBER',
			params,
		);
	};

	public static ALMOST_ONE_UPPER = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'almostOneUpper',
			message ? message : 'VALIDATION.ALMOST_ONE_UPPER',
			params,
		);
	};

	public static ALMOST_ONE_LOWER = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'almostOneLower',
			message ? message : 'VALIDATION.ALMOST_ONE_LOWER',
			params,
		);
	};

	public static IS_EQUAL = (from: string, to: string, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notEqual',
			message ? message : 'VALIDATION.ALMOST_ONE_LOWER',
			params ? params : { field1: from, field2: to },
		);
	};
}
