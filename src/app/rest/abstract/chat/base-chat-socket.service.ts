import { ApplicationLoggerService, BaseSocketService } from '@ddc/kit';
import { EnumMessageExchangeType } from '../../chat/enums/message-exchange-type.enum';
import { MessageFromChatToSocketInterface } from '../../chat/models/message-from-chat-to-socket.interface';
import { ContactChatModel } from '../../chat/models/contact-chat.model';

/**
 * Classe che utilizza i modelli definiti dal modulo chat per comunicare con un socket di gestione chat.
 *
 * Il flusso è il seguente
 *
 * - CLIENT: Apro la chat
 * - SOCKET: Ricevo il token e l'id della risorsa dal socket (evalMessage -> OPEN) e lo gestisco
 * - CLIENT: Invio il token decodificato al socket (evalSend -> OPEN) per la gestione delle mie chiamate future
 * - SOCKET: Se il socket mi autentica invia un messaggio di status a true per il mio id (evalMessage -> STATUS)
 * - SOCKET: Se il socket mi autentica mi invia i messaggi ricevuti quando il mio id era offline (evalMessage -> MESSAGE)
 * - CLIENT: Notifico a tutti i miei contatti che sono online (evalSend -> STATUS)
 * - Ricevo dai miei contatti il loro stato (evalMessage -> STATUS) e aggiorno open
 * - Notifico ad un contatto che sto scrivendo (evalSend -> WAITING)
 * - Invio un messaggio ad un contatto (evalSend -> MESSAGE)
 * - Ricevo la notifica che un contatto sta scrivendo (evalMessage -> WAITING)
 * - Ricevo un messaggio (evalMessage -> MESSAGE)
 */
export abstract class BaseChatSocketService extends BaseSocketService {
	environment: any;
	messages: MessageFromChatToSocketInterface[];
	contacts: ContactChatModel[];

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.environment = this.applicationLogger.environment;
		this.messages = [];
		this.contacts = [];
	}

	// abstracts
	/**
	 * Decodifica un messaggio del socket in un MessageFromChatToSocketInterface
	 * @param msg messaggio dal socket
	 */
	abstract decodeSocketMessage(msg: any): MessageFromChatToSocketInterface;
	/**
	 * Codifica un messaggio client nel formato socket
	 * @param msg messaggio client
	 */
	abstract encodeClientMessage(msg: MessageFromChatToSocketInterface): any;
	/**
	 * Costruisce il token da inviare al socket per la verifica di autenticazione
	 * @param tokenSocket token ricevuto dal socket
	 */
	abstract buildTokenForSocket(tokenSocket: string): string;
	/**
	 * Decodifica, se necessario, il token ricevuto dal socket
	 * @param tokenSocket token ricevuto dal socket
	 */
	abstract decodeTokenBySocket(tokenSocket: string): string;
	/**
	 * Converte una data nel formato stringa che vogliamo mostrare in chat per i messaggi.
	 * Da utilizzare in ricezione dei messaggi in decodeSocketMessage()
	 * @param dta data ricevuta
	 */
	abstract decodeDateFormat(dta: any): string;

	// overrides
	defineApi(): string {
		return this.environment.api.socket.chat;
	}
	/**
	 * Valuta un messaggi ricevuto dal socket basando sul tipo di messaggio
	 * @param msg message received
	 */
	evalMessage(msgSocket: any) {
		const msg = this.decodeSocketMessage(msgSocket);
		switch (msg.type) {
			case EnumMessageExchangeType.OPEN:
				this.evalAuthReceived(msg); // ricevo token e resourceId
				break;
			case EnumMessageExchangeType.MESSAGE:
				this.evalMessageReceived(msg); // ricevo un messaggio da un contatto
				break;
			case EnumMessageExchangeType.WAITING:
				this.evalWaitingReceived(msg); // ricevo un messaggio di waiting da un contatto
				break;
			case EnumMessageExchangeType.STATUS:
				this.evalStatusReceived(msg); // ricevo un messaggio di status di un contatto
				break;
			default:
				break;
		}
	}
	// RICEZIONE
	/**
	 * Prende il messaggio di autenticazione ricevuto dal socket (il socket manda un token al primo accesso)
	 * e invia un token costruito dal cliente per richiedere la verifica di autenticazione al socket
	 * @param msg messaggio di autenticazione ricevuto dal socket
	 */
	private evalAuthReceived(msg: MessageFromChatToSocketInterface) {
		this.applicationLogger.logChatSocketOpenReceived(this.log, msg.resourceId, msg.token);
		const tokenReceived: string = this.decodeTokenBySocket(msg.token);
		const tokenToSend: string = this.buildTokenForSocket(tokenReceived);
		this.evalAuthSend(msg.resourceId, tokenToSend);
		this.applicationLogger.logChatSocketAuthSended(this.log, this.userId);
	}
	/**
	 * Prende il messaggio ricevuto dal socket e lo aggiunge alla lista dei messaggi scambiati con un contatto
	 * @param msg messaggio ricevuto dal socket e decodificato in MessageFromChatToSocketInterface
	 */
	private evalMessageReceived(msg: MessageFromChatToSocketInterface) {
		const contact = this.getContact(msg.from);
		if (!contact) {
			this.addContactNotInList(msg.from, msg);
		} else {
			this.addMessageForContact(msg.from, msg);
		}
		this.setWaitingSenderForContact(msg.from, false);
		this.setWaitingForContact(msg.from, false);
	}
	/**
	 * Imposta la proprietà waiting di msg.from a true
	 * @param msg messaggio di waiting ricevuto dal socket
	 */
	private evalWaitingReceived(msg: MessageFromChatToSocketInterface) {
		this.setWaitingForContact(msg.from, true);
	}
	/**
	 * Aggiorna la proprietà status di msg.to
	 * @param msg messaggio di status ricevuto dal socket
	 */
	private evalStatusReceived(msg: MessageFromChatToSocketInterface) {
		this.setStatusForContact(msg.to, msg.status);
	}

	// INVIO
	/**
	 * Invia al socket un messaggio per la conferma di autenticazione
	 * @param resourceId id della risorsa mandata dal socket all'apertura della connessione
	 * @param token token da inviare al socket
	 */
	private evalAuthSend(resourceId: string, token: string) {
		const messageAuth: MessageFromChatToSocketInterface = {
			type: EnumMessageExchangeType.AUTH,
			from: this.userId,
			resourceId: resourceId,
			token: token,
		};
		const msg = this.encodeClientMessage(messageAuth);
		this.sendMessage(msg);
	}
	/**
	 * Invio un messaggio ad un contatto e lo aggiungo alla sua lista messaggi
	 * @param msgClient messaggio da inviare
	 */
	evalMessageSend(msgClient: MessageFromChatToSocketInterface) {
		const msg = this.encodeClientMessage(msgClient);
		this.sendMessage(msg);
		const contact = this.getContact(msg.to);
		if (!contact) {
			this.contacts.push(new ContactChatModel(msg.to, undefined, [msg]));
		} else {
			this.addMessageForContact(msg.to, msg);
		}
	}

	/**
	 * Notifico ad un contatto che sto scrivendo.
	 * Aggiorno la proprietà waitingSender del contatto a true
	 * @param contactId id del contatto a cui notificare
	 */
	evalWaitingSend(contactId: string) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1 && !this.contacts[index].waitingSender) {
			this.contacts[index].waitingSender = true;
			const messageWaiting: MessageFromChatToSocketInterface = {
				type: EnumMessageExchangeType.WAITING,
				from: this.userId,
				to: contactId,
			};
			const msg = this.encodeClientMessage(messageWaiting);
			this.sendMessage(msg);
		}
	}

	/**
	 * Notifico cho stato online ad un contatto.
	 * Invio al socket un messaggio di STATUS
	 * @param contactId id del contatto
	 */
	private evalStatusSend(contactId: string) {
		const messageWaiting: MessageFromChatToSocketInterface = {
			type: EnumMessageExchangeType.STATUS,
			from: this.userId,
			to: contactId,
		};
		const msg = this.encodeClientMessage(messageWaiting);
		this.sendMessage(msg);
	}

	/**
	 * Notifico che sono online a tutti i contatti in lista
	 */
	notifyStatusToAllContacts() {
		if (this.contacts && this.contacts.length) {
			this.contacts.forEach((contact) => {
				this.evalStatusSend(contact.contactId);
			});
		}
	}

	// gestione chat

	/**
	 * Apre la chat con un contatto e resetta le notifiche (messaggi non letti dal contatto)
	 * @param contactId id del contatto
	 */
	openChat(contactId: string) {
		this.setOpenCloseChatForContact(contactId, true);
		this.updateNotificationForContact(contactId, 0);
	}

	/**
	 * Chiude la chat con un contatto
	 * @param contactId id del contatto
	 */
	closeChat(contactId: string) {
		this.setOpenCloseChatForContact(contactId, false);
	}
	/**
	 * Apre tutte le chat
	 */
	openAll() {
		this.setOpenCloseAll(true);
	}
	/**
	 * Chiude tutte le chat
	 */
	closeAll() {
		this.setOpenCloseAll(false);
	}

	// gestione contatti

	/**
	 * Ritorna un contatto dalla lista dei contatti
	 * @param contactId id del contatto
	 */
	private getContact(contactId: string): ContactChatModel {
		return this.contacts.find((el) => el.contactId === contactId);
	}
	/**
	 * Inserisce un messaggio per un contatto non presente nella lista dei contatti
	 * e aggiunge il contatto alla lista
	 * @param contactId id del contatto
	 * @param msg messaggio per il contatto
	 */
	private addContactNotInList(contactId: string, msg: MessageFromChatToSocketInterface) {
		const addContact = new ContactChatModel(contactId, undefined, [msg]);
		addContact.notifications++;
		this.contacts.push(addContact);
	}
	/**
	 * Aggiunge un messaggio per un contatto e se la sua chat non è aperta aggiunge una notifica (messaggio non letto)
	 * @param contactId id del contatto
	 * @param msg messaggio per il contatto
	 * @param top se true inserisce il messaggio in cima alla lista dei messaggi (usato nel caricamento di messaggi precedenti)
	 */
	addMessageForContact(contactId: string, msg: MessageFromChatToSocketInterface, top?: boolean) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1) {
			top ? this.contacts[index].messages.unshift(msg) : this.contacts[index].messages.push(msg);
			if (!this.contacts[index].open) {
				this.addNotificationForContact(contactId);
			}
		}
	}
	/**
	 * Aggiunge una lista di messaggi per i contatti presenti in lista
	 * @param messages list dei messaggi
	 * @param top se true inserisce il messaggio in cima alla lista dei messaggi (usato nel caricamento di messaggi precedenti)
	 */
	addListMessagesForContacts(messages: MessageFromChatToSocketInterface[], top?: boolean) {
		messages.forEach((msg) => {
			this.addMessageForContact(msg.from, msg, top);
		});
	}

	// - proprietà

	/**
	 * Aggiorna la proprietà waiting (sta scrivendo o no) di un contatto
	 * @param contactId id del contatto
	 * @param waiting valore di waiting
	 */
	private setWaitingForContact(contactId: string, waiting: boolean) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1) {
			this.contacts[index].waiting = waiting;
		}
	}

	/**
	 * Aggiorna la proprietà waitingSender (sto scrivendo a lui o no) di un contatto
	 * @param contactId id del contatto
	 * @param waiting valore di waitingSender
	 */
	private setWaitingSenderForContact(contactId: string, waiting: boolean) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1) {
			this.contacts[index].waitingSender = waiting;
		}
	}

	/**
	 * Apre o chiude una chat aggiornando la proprietà open di un contatto
	 * @param contactId id del contatto
	 * @param open valore di open
	 */
	private setOpenCloseChatForContact(contactId: string, open: boolean) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1) {
			this.contacts[index].open = open;
		}
	}
	/**
	 * Apre o chiude tutte le chat
	 * @param openClose true per aprire e false per chiudere tutte le chat
	 */
	private setOpenCloseAll(openClose: boolean) {
		for (let i = 0; i < this.contacts.length; i++) {
			this.contacts[i].open = openClose;
		}
	}
	/**
	 * Aggiorna la proprietà notifications (notifiche messaggi non letti) di un contatto
	 * @param contactId id del contatto
	 * @param value valore di notifications
	 */
	private updateNotificationForContact(contactId: string, value: number) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1) {
			this.contacts[index].notifications = value;
		}
	}
	/**
	 * Incrementa il valore della proprietà notifications (notifiche messaggi non letti) di un contatto
	 * @param contactId id del contatto
	 * @param add valore di quanto incrementare notifications. Se non valorizzato di default è 1
	 */
	private addNotificationForContact(contactId: string, add?: number) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1) {
			this.contacts[index].notifications += add ? add : 1;
		}
	}
	/**
	 * Decrementa il valore della proprietà notifications (notifiche messaggi non letti) di un contatto
	 * @param contactId id del contatto
	 * @param remove valore di quanto decrementare notifications. Se non valorizzato di default è 1
	 */
	private removeNotificationForContact(contactId: string, remove?: number) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1) {
			this.contacts[index].notifications -= remove ? remove : 1;
		}
	}
	/**
	 * Aggiorna la proprietà status (online-offline) di un contatto
	 * @param contactId id del contatto
	 * @param status valore di status
	 */
	private setStatusForContact(contactId: string, status?: boolean) {
		const index = this.contacts.findIndex((el) => el.contactId === contactId);
		if (index !== -1) {
			this.contacts[index].status = status;
		}
	}
}
