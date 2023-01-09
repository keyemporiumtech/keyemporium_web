import { BaseComponent, ApplicationLoggerService, DateModel } from '@ddc/kit';
import { BaseChatSocketService } from './base-chat-socket.service';
import { Input, OnInit, OnDestroy, Directive } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EnumMessageExchangeType } from '../../chat/enums/message-exchange-type.enum';
import { FormControl } from '@angular/forms';
import { MessageFromChatToSocketInterface } from '../../chat/models/message-from-chat-to-socket.interface';
import { ContactChatModel } from '../../chat/models/contact-chat.model';
import { component } from '../../../../environments/template/component';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseChatSocketComponent extends BaseComponent implements OnInit, OnDestroy {
	environment: any;
	@Input() userId: string;
	@Input() contacts: any[];
	@Input() initialMessages: any[];
	@Input() maxChatInitialMessages: number; // numero massimo di messaggi iniziali da caricare se initialMessage è vuoto
	@Input() maxChatContactInitialMessages: number; // numero massimo di messaggi da caricare per ogni chat al more()
	// flag di controllo per le interazioni con un database
	@Input() flgSendMessageIfStored: boolean; // used as true into sendStoreMessage to avoid to send messages if storeMessage is fault
	@Input() flgOpenChatIfReaded: boolean; // used as true into openReadedChat to avoid to open chat if notifyReaded is fault

	chatSocket: BaseChatSocketService;
	// sub
	subInitialMessages: Subscription;
	subContacts: Subscription;
	subStoreMessage: Subscription;
	subMoreMessage: Subscription;
	subNotifyReaded: Subscription;

	constructor(applicationLogger: ApplicationLoggerService, chatSocket: BaseChatSocketService) {
		super(applicationLogger);
		this.chatSocket = chatSocket;
		this.environment = this.applicationLogger.environment;
	}

	connect() {
		this.chatSocket.connect(this.userId);
		// if there are inital messages received in past, I stored them for clients in top of messages array
		if (this.initialMessages && this.initialMessages.length) {
			this.setListMessages(this.convertInitialMessages(this.initialMessages), true);
		} else {
			this.subInitialMessages = this.getInitialMessages(
				this.maxChatInitialMessages
					? this.maxChatInitialMessages
					: component.chat.maxInitialMessages,
			).subscribe((list) => {
				if (list && list.length) {
					this.setListMessages(this.convertInitialMessages(list), true);
				}
			});
		}
	}
	private setListMessages(messages: MessageFromChatToSocketInterface[], top?: boolean) {
		messages.forEach((msg) => {
			this.chatSocket.addMessageForContact(msg.from, msg, top);
		});
	}

	ngOnInit() {
		if (this.contacts && this.contacts.length) {
			this.chatSocket.contacts = this.convertContacts(this.contacts);
			this.connect();
			this.chatSocket.notifyStatusToAllContacts();
		} else {
			this.subContacts = this.getContacts().subscribe((list) => {
				if (list && list.length) {
					this.chatSocket.contacts = this.convertContacts(list);
				}
				this.connect();
				this.chatSocket.notifyStatusToAllContacts();
			});
		}
		super.ngOnInit();
	}

	ngOnDestroy() {
		if (this.subInitialMessages) {
			this.subInitialMessages.unsubscribe();
		}
		if (this.subContacts) {
			this.subContacts.unsubscribe();
		}
		if (this.subMoreMessage) {
			this.subMoreMessage.unsubscribe();
		}
		if (this.subNotifyReaded) {
			this.subNotifyReaded.unsubscribe();
		}
		if (this.subStoreMessage) {
			this.subStoreMessage.unsubscribe();
		}
		super.ngOnDestroy();
	}

	openChat(contactId: string, closeOthers?: boolean) {
		if (closeOthers) {
			this.closeAll();
		}
		this.chatSocket.openChat(contactId);
	}
	openReadedChat(contactId: string, closeOthers?: boolean) {
		if (closeOthers) {
			this.closeAll();
		}
		this.subNotifyReaded = this.notifyMessageReadedForContact(contactId).subscribe((data) => {
			if (this.flgOpenChatIfReaded && data) {
				this.chatSocket.openChat(contactId);
			} else {
				this.chatSocket.openChat(contactId);
			}
		});
	}
	closeChat(contactId: string) {
		this.chatSocket.closeChat(contactId);
	}
	openAll() {
		this.chatSocket.openAll();
	}
	closeAll() {
		this.chatSocket.closeAll();
	}

	sendMessage(contactId: string, text?: string, control?: FormControl) {
		const messageToSend: MessageFromChatToSocketInterface = {
			type: EnumMessageExchangeType.MESSAGE,
			from: this.userId,
			to: contactId,
			message: text ? text : control ? control.value : '',
			date: new DateModel(new Date()).toString(
				'YYYY-MM-DD HH:ii:ss',
				this.environment.default.timezoneChatSocketName,
			),
		};
		this.chatSocket.evalMessageSend(messageToSend);
	}

	sendStoreMessage(contactId: string, text?: string, control?: FormControl) {
		const messageToSend: MessageFromChatToSocketInterface = {
			type: EnumMessageExchangeType.MESSAGE,
			from: this.userId,
			to: contactId,
			message: text ? text : control ? control.value : '',
			date: new DateModel(new Date()).toString(
				'YYYY-MM-DD HH:ii:ss',
				this.environment.default.timezoneChatSocketName,
			),
		};
		this.subStoreMessage = this.storeMessage(this.convertMessage(messageToSend)).subscribe(
			(data) => {
				if (!this.flgSendMessageIfStored) {
					this.chatSocket.evalMessageSend(messageToSend);
				} else if (this.evalStoreMessageResult(data)) {
					this.chatSocket.evalMessageSend(messageToSend);
				}
			},
		);
	}

	more(contactId: string, page?: number) {
		this.subMoreMessage = this.moreMessages(
			contactId,
			page ? page : 1,
			this.maxChatContactInitialMessages
				? this.maxChatContactInitialMessages
				: component.chat.maxContactInitialMessages,
		).subscribe((list) => {
			if (list && list.length) {
				this.setListMessages(this.convertInitialMessages(list), true);
			}
		});
	}

	onwriting(contactId: string) {
		this.chatSocket.evalWaitingSend(contactId);
	}

	onkeydownenter(contactId: string, text?: string, control?: FormControl, store?: boolean) {
		if (store) {
			this.sendStoreMessage(contactId, text, control);
		} else {
			this.sendMessage(contactId, text, control);
		}
	}

	disconnect() {
		this.chatSocket.closeConnection();
	}

	// abstract functions

	/**
	 * Chiamata che ritorna una lista di contatti.
	 */
	abstract getContacts(): Observable<any[]>;
	/**
	 * Converte una lista di contatti in un array di ContactChatModel
	 * @param list lista dei contatti da convertire
	 */
	abstract convertContacts(list: any[]): ContactChatModel[];
	/**
	 * Chiamata rest per memorizzare un messaggio (inviato o ricevuto) su un database
	 * @param msg messaggio da salvare su un database
	 */
	abstract storeMessage(msg: any): Observable<any>;
	/**
	 * Valuta la risposta alla chiamata storeMessage() per valutare se abilitare o meno l'invio di un messaggio.
	 * In pratica se non è stato aggiornato il database il messaggio non dovrebbe essere inviato
	 * @param res body ricevuto da storeMessage()
	 */
	abstract evalStoreMessageResult(res: any): boolean;
	/**
	 * Converte un messaggio MessageFromChatToSocketInterface nel formato di messaggio da salvare sul database
	 * @param msg messaggio da convertire
	 */
	abstract convertMessage(msg: MessageFromChatToSocketInterface): any;
	/**
	 * Chiamata rest che ritorna la lista dei messaggi iniziali da visualizzare nelle chat
	 * @param max: numero massimo di messaggi da caricare
	 */
	abstract getInitialMessages(max: number): Observable<any[]>;
	/**
	 * Converte una lista di messagi in un array di MessageFromChatToSocketInterface
	 * @param list lista di messaggi
	 */
	abstract convertInitialMessages(list: any[]): MessageFromChatToSocketInterface[];
	/**
	 * Chiamata che notifica come letti tutti i messaggi ricevuti da un contatto (Operazione su db).
	 * Solitamente usato all'apertura della chat con il contatto
	 * @param contactId id del contatto
	 */
	abstract notifyMessageReadedForContact(contactId: string): Observable<boolean>;
	/**
	 * Chiamata rest per il caricamento dallo storico dei messaggi scambiati con un contatto (sfrutta la paginazione)
	 * @param contactId id del contatto
	 * @param page pagina richiesta
	 * @param max: numero massimo di messaggi da caricare
	 */
	abstract moreMessages(contactId: string, page?: number, max?: number): Observable<any[]>; // criteria to call more old messages
}
