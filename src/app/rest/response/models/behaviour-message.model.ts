import { MessageService, MessageModel } from '@ddc/kit';
import { ResponseMessageSubjectModel } from './response-message-subject.model';
import { ResponseMessageRoutingModel } from './response-message-routing.model';
import { ResponseMessageInterface } from '../interfaces/response-message.interface';

export class BehaviourMessageModel {
	private _messageService: MessageService;
	private _defaultResponseMessageSubject: ResponseMessageSubjectModel;
	private _defaultResponseMessageRouting: ResponseMessageRoutingModel;

	constructor(messageService: MessageService, responseMessage: ResponseMessageInterface) {
		this.messageService = messageService;
		this.defaultResponseMessageSubject = responseMessage.subject;
		this.defaultResponseMessageRouting = responseMessage.routing;
	}

	// calls
	evalMessage(toMessage?: ResponseMessageInterface, specificMessage?: MessageModel) {
		let toMessageSubject;
		let toMessageRouting;
		if (!toMessage) {
			toMessageSubject = this.defaultResponseMessageSubject;
			toMessageRouting = this.defaultResponseMessageRouting;
		} else {
			toMessageSubject = toMessage.subject ? toMessage.subject : undefined;
			toMessageRouting = toMessage.routing ? toMessage.routing : undefined;
		}

		if (!toMessageSubject && !toMessageRouting) {
			toMessageSubject = this.defaultResponseMessageSubject;
			toMessageRouting = this.defaultResponseMessageRouting;
		}

		if (toMessageSubject) {
			this.messageService.sendSubjectMessage(specificMessage, toMessageSubject.idComponent);
		} else if (toMessageRouting) {
			this.messageService.sendRoutingMessage(
				specificMessage,
				toMessageRouting.urlBack,
				toMessageRouting.urlTo,
			);
		}
	}

	/**
	 * Getter messageService
	 * @return MessageService
	 */
	public get messageService(): MessageService {
		return this._messageService;
	}

	/**
	 * Setter messageService
	 * @param MessageService value
	 */
	public set messageService(value: MessageService) {
		this._messageService = value;
	}

	/**
	 * Getter defaultResponseMessageSubject
	 * @return ResponseMessageSubjectModel
	 */
	public get defaultResponseMessageSubject(): ResponseMessageSubjectModel {
		return this._defaultResponseMessageSubject;
	}

	/**
	 * Getter defaultResponseMessageRouting
	 * @return ResponseMessageRoutingModel
	 */
	public get defaultResponseMessageRouting(): ResponseMessageRoutingModel {
		return this._defaultResponseMessageRouting;
	}

	/**
	 * Setter defaultResponseMessageSubject
	 * @param ResponseMessageSubjectModel value
	 */
	public set defaultResponseMessageSubject(value: ResponseMessageSubjectModel) {
		this._defaultResponseMessageSubject = value;
	}

	/**
	 * Setter defaultResponseMessageRouting
	 * @param ResponseMessageRoutingModel value
	 */
	public set defaultResponseMessageRouting(value: ResponseMessageRoutingModel) {
		this._defaultResponseMessageRouting = value;
	}
}
