import { webSocket } from 'rxjs/webSocket';
import { BaseService } from '../base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
export abstract class BaseSocketService extends BaseService {
	private _userId: any;
	subject: any;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	connect(userId) {
		this.userId = userId;
		this.subject = webSocket(this.defineApi());

		this.subject.subscribe(
			(msg) => this.evalMessage(msg), // Called whenever there is a message from the server.
			(err) => this.evalError(err), // Called if at any point WebSocket API signals some kind of error.
			() => this.evalComplete(), // Called when connection is closed (for whatever reason).
		);
	}
	/**
	 * Valuta il messaggio ricevuto dal socket
	 * @param msg messaggio dal socket
	 */
	abstract evalMessage(msg: any);
	/**
	 * Valuta un errore ricevuto dal socket
	 * @param err errore dal socket
	 */
	abstract evalError(err: any);
	/**
	 * Comportamento alla chiusura del socket
	 */
	abstract evalComplete();
	/**
	 * Ritorna l'api di connessione al socket
	 */
	abstract defineApi(): string;

	/**
	 * Manda un messaggio al subject connesso al socket
	 * @param msg messaggio da inviare
	 */
	sendMessage(msg: any) {
		this.subject.next(msg);
	}
	/**
	 * Chiude la connessione con il socket
	 *
	 * Scatena evalComplete()
	 */
	closeConnection() {
		this.subject.complete();
	}

	/**
	 * Getter userId
	 * @return any
	 */
	public get userId(): any {
		return this._userId;
	}

	/**
	 * Setter userId
	 * @param any value
	 */
	public set userId(value: any) {
		this._userId = value;
	}
}
