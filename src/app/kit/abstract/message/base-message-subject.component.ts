import { BaseComponent } from '../base.component';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { Input, AfterViewChecked, Directive } from '@angular/core';
import { MessageService } from '../../message/services/message.service';
import { Subscription } from 'rxjs';
import { MessageModel } from '../../message/models/message.model';
import { EnumMessageType } from '../../message/enums/message-type.enum';
declare var $: any;

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseMessageSubjectComponent
	extends BaseComponent
	implements AfterViewChecked
{
	private _environment: any;
	@Input() idMessage: string;
	@Input() typeComponent: 'DIV' | 'MODAL';
	// services
	messageService: MessageService;
	// variables
	subMessage: Subscription;
	currentMessage: MessageModel;
	flgReaded: boolean;
	enableDebug: boolean;

	constructor(applicationLogger: ApplicationLoggerService, messageServiceIn: MessageService) {
		super(applicationLogger);
		this.environment = this.applicationLogger.environment;
		this.messageService = messageServiceIn;
	}

	// overrides
	ngOnInitForChildren() {
		// defaults
		if (!this.idMessage) {
			this.idMessage = 'messageComponent';
		}
		if (!this.typeComponent) {
			this.typeComponent = 'DIV';
		}
		// instance
		this.messageService.instanceSubjectComponent(this.idMessage);
		// waiting
		this.subMessage = this.messageService.getSubjectMessage(this.idMessage).subscribe((message) => {
			this.currentMessage = message ? message.message : undefined;
			this.flgReaded = false;
			this.applicationLogger.logMessageSubjectReceived(
				this.log,
				this.idMessage,
				this.currentMessage,
			);
		});

		this.enableDebug = this.environment.enable.debugMode;
	}

	ngAfterViewChecked() {
		if (this.typeComponent === 'DIV' && !this.flgReaded && this.currentMessage) {
			// console.log('changes entered');
			const etop = $('#' + this.idMessage).offset().top;
			$(window).scrollTop(etop);
			this.flgReaded = true;
		}
		if (this.typeComponent === 'MODAL' && !this.flgReaded && this.currentMessage) {
			// console.log('changes entered');
			$('#' + this.idMessage).modal('show');
			this.flgReaded = true;
		}
	}

	ngOnDestroyForChildren() {
		if (this.subMessage) {
			this.subMessage.unsubscribe();
		}
	}

	/**
	 * Metodo che chiude il box (div o modale) dei messaggi, ripulendo i parametri del componente
	 */
	close() {
		this.flgReaded = false;
		this.messageService.clearSubjectMessage(this.idMessage);
		this.currentMessage = undefined;
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
