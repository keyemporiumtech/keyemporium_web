import { BaseComponent } from '../base.component';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { MessageService } from '../../message/services/message.service';
import { MessageModel } from '../../message/models/message.model';
import { EnumMessageType } from '../../message/enums/message-type.enum';
import { PreviousRouteService } from '../../routing/services/previous-route.service';
import { ApplicationStorageService } from '../../storage/services/application-storage.service';
import { Directive } from '@angular/core';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseMessageRoutingComponent extends BaseComponent {
	private _environment: any;
	// services
	messageService: MessageService;
	previousRoute: PreviousRouteService;
	applicationStorage: ApplicationStorageService;
	// variables
	currentMessage: MessageModel;
	enableDebug: boolean;

	constructor(
		applicationLogger: ApplicationLoggerService,
		messageServiceIn: MessageService,
		previousRouteIn: PreviousRouteService,
		applicationStorageIn: ApplicationStorageService,
	) {
		super(applicationLogger);
		this.environment = this.applicationLogger.environment;
		this.messageService = messageServiceIn;
		this.previousRoute = previousRouteIn;
		this.applicationStorage = applicationStorageIn;
	}

	// overrides
	ngOnInitForChildren() {
		this.currentMessage = new MessageModel(
			+this.applicationStorage.messageType.get(),
			+this.applicationStorage.messageCode.get(),
			this.applicationStorage.messageTitle.get(),
			this.applicationStorage.messageText.get(),
			this.applicationStorage.messageException.get(),
		);
		this.enableDebug = this.environment.enable.debugMode;
	}

	/**
	 * Metodo che ripulisce i parametri del componente, resetta i parametri del messaggio e richiama il metodo back()
	 * del previous routing service
	 */
	back() {
		this.messageService.clearRoutingMessage();
		this.currentMessage = undefined;
		this.previousRoute.back();
	}

	/**
	 * Ritorna la classe css specifica di un messaggio in base al tipo di messaggio (EnumMessageType)
	 */
	get cssClassMessage(): string {
		if (this.currentMessage && this.currentMessage.type) {
			switch (this.currentMessage.type) {
				case EnumMessageType.INFO:
					return this.getCSSClassInfo();
				case EnumMessageType.WARNING:
					return this.getCSSClassWarning();
				case EnumMessageType.ERROR:
					return this.getCSSClassError();
				case EnumMessageType.EXCEPTION:
					return this.getCSSClassException();
				default:
					return undefined;
			}
		}
		return undefined;
	}

	// to implements
	abstract getCSSClassInfo(): string;
	abstract getCSSClassWarning(): string;
	abstract getCSSClassError(): string;
	abstract getCSSClassException(): string;

	/**
	 * Getter environment
	 * @return any
	 */
	public get environment(): any {
		return this._environment;
	}

	/**
	 * Setter environment
	 * @param any value
	 */
	public set environment(value: any) {
		this._environment = value;
	}
}
