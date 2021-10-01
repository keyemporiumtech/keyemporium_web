import { MessageValidatorInterface } from '../interfaces/message-validator.interface';

export class MessageValidatorUtil {
	public static getMessageValidator(
		type: string,
		message: string,
		params: any,
	): MessageValidatorInterface {
		const messageValidator: MessageValidatorInterface = {
			type: type,
			message: message,
			params: params,
		};
		return messageValidator;
	}
}
