import { MessageValidatorUtil } from '../../validators/utils/message-validator.util';

export class FileValidatorsMessages {
	public static UPLOAD_ERROR = (message?: string, params?: any) => {
		return MessageValidatorUtil.getMessageValidator(
			'uploadError',
			message ? message : 'VALIDATION.UPLOAD.GENERIC_ERROR',
			params,
		);
	};
}
