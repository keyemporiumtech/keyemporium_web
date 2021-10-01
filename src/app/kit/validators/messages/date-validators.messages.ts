import { MessageValidatorUtil } from '../utils/message-validator.util';

export class DateValidatorsMessages {
	public static IS_DATE = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notDate',
			message ? message : 'VALIDATION.DATE.NOT_VALID',
			params,
		);
	};

	public static MUST_BE_LESS_THAN = (other: string, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notLessThan',
			message ? message : 'VALIDATION.DATE.DATE_LESS_THEN',
			params ? params : { other: other },
		);
	};

	public static MUST_BE_LESS_OR_EQUAL_THAN = (other: string, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notLessOrEqualThan',
			message ? message : 'VALIDATION.DATE.DATE_LESS_OR_EQUAL_THEN',
			params ? params : { other: other },
		);
	};

	public static MUST_BE_LESS_THAN_CURRENT = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notLessThanCurrent',
			message ? message : 'VALIDATION.DATE.DATE_LESS_THEN_CURRENT',
			params,
		);
	};

	public static MUST_BE_LESS_OR_EQUAL_THAN_CURRENT = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notLessOrEqualThanCurrent',
			message ? message : 'VALIDATION.DATE.DATE_LESS_OR_EQUAL_THEN_CURRENT',
			params,
		);
	};

	// GREATER
	public static MUST_BE_GREATER_THAN = (other: string, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notGreaterThan',
			message ? message : 'VALIDATION.DATE.DATE_GREATER_THEN',
			params ? params : { other: other },
		);
	};

	public static MUST_BE_GREATER_OR_EQUAL_THAN = (other: string, message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notGreaterOrEqualThan',
			message ? message : 'VALIDATION.DATE.DATE_GREATER_OR_EQUAL_THEN',
			params ? params : { other: other },
		);
	};

	public static MUST_BE_GREATER_THAN_CURRENT = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notGreaterThanCurrent',
			message ? message : 'VALIDATION.DATE.DATE_GREATER_THEN_CURRENT',
			params,
		);
	};

	public static MUST_BE_GREATER_OR_EQUAL_THAN_CURRENT = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'notGreaterOrEqualThanCurrent',
			message ? message : 'VALIDATION.DATE.DATE_GREATER_OR_EQUAL_THEN_CURRENT',
			params,
		);
	};
}
