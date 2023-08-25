import {
  HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse
} from '@angular/common/http';
import {
  ApplicationLoggerService, ApplicationStorageService, BaseConverter, BaseService, EnumMessageType, InnerStorageService,
  MessageModel, MessageService
} from '@ddc/kit';
import { Observable, of } from 'rxjs';
import { TokenDecodeInterface } from '../auth/interfaces/token-decode.interface';
import { AuthUtility } from '../auth/utility/auth.utility';
import { EnumParamType } from '../request/enums/param-type.enum';
import { RequestManagerInterface } from '../request/interfaces/request-manager.interface';
import { RequestUtility } from '../request/utility/request.utility';
import { ResponseManagerInterface } from '../response/interfaces/response-manager.interface';
import { BehaviourMessageModel } from '../response/models/behaviour-message.model';

/**
 * Definisce il comportamento generico di chiamate per il backend.
 *
 * Questa classe non deve essere estesa dentro il modulo rest, ma usata da altri servizi astratti del modulo rest.
 * Deve essere estesa in un modulo api da un servizio che sarà l'input delle api che usano BaseRestService.
 *
 * Nella definizione di getBehaviourMessageModel(), per il ResponseMessageRoutingModel se non vengono
 * specificate urlTo e urlBack, il messageService userà di default le url definite in environment per message=urlTo e home=urlBack.
 */
export abstract class BaseRestService extends BaseService {
	private _environment: any;
	_httpHeaders: HttpHeaders;
	messageService: MessageService; // per la gestione dei messaggi informativi e di errore
	applicationStorage: ApplicationStorageService; // per la memorizzazione di un messaggio
	innerStorage: InnerStorageService; // per la gestione della cache di chiamate
	http: HttpClient;

	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger);
		this.messageService = messageService;
		this.applicationStorage = applicationStorage;
		this.innerStorage = innerStorage;
		this.http = http;
		this.environment = applicationLogger.environment;
	}

	get httpHeaders() {
		this._httpHeaders = new HttpHeaders({
			'Content-Type': this.getRequestContentType(),
		});
		if (this.getRequestNameForAppTokenAuthentication()) {
			this._httpHeaders = this._httpHeaders.append(
				this.getRequestNameForAppTokenAuthentication(),
				this.getRequestValueForAppTokenAuthentication()
					? this.getRequestValueForAppTokenAuthentication()
					: this.environment.api.tokenApp,
			);
		}
		this._httpHeaders = this._httpHeaders.append('clientId', this.environment.security.servername);
		return this._httpHeaders;
	}

	/**
	 * Decodifica un token di autenticazione ricevuto dal server in un oggetto da gestire per la memorizzazione
	 * dei parametri di autenticazione (payload, expiration, ...)
	 * @param token token da decodificare
	 */
	decodeTokenSession(token: string): TokenDecodeInterface {
		return this.getSpecificDecodeTokenSession(token)
			? this.getSpecificDecodeTokenSession(token)
			: AuthUtility.decodeTokenAuth(token, this.environment.security.servername);
	}

	/**
	 * Valuta e gestisce la decodifica del token e le eventuali azioni da intraprendere
	 * a seguito della valutazione
	 * @param token token ricevuto dal servizio rest a fronte di un login
	 * @param responseManager oggetto di gestione dei parametri di valutazione della response
	 */
	evalToken(token: string, responseManager?: ResponseManagerInterface): boolean {
		const objectToken = this.decodeTokenSession(token);
		return this.manageTokenAuth(objectToken, responseManager);
	}

	/**
	 * Memorizza in cache i valori del token generato dal server in <b>authtoken</b>
	 * e del payload utente in <b>payload</b>.
	 * @param objectToken oggetto token decodificato
	 */
	memoToken(objectToken: TokenDecodeInterface) {
		this.applicationStorage.authtoken.set(objectToken.tokenSended);
		this.applicationStorage.payload.setObj(objectToken.payload);
	}

	/**
	 * Indica se è richiesta la valutazione del risultato in cache
	 * @param requestManager oggetto di gestione delle richieste
	 */
	evalGetStorage(requestManager: RequestManagerInterface): boolean {
		if (
			requestManager &&
			requestManager.storage &&
			requestManager.storage.flgEval &&
			requestManager.storage.name
		) {
			if (requestManager.storage.reset) {
				this.innerStorage.remove(requestManager.storage.name);
				return false;
			}
			return true;
		}
		return false;
	}
	/**
	 * Ritorna l'observable di un risultato cachato
	 * @param requestManager oggetto di gestione delle richieste
	 */
	getStorage(requestManager: RequestManagerInterface): Observable<any> {
		if (this.evalGetStorage(requestManager)) {
			return this.innerStorage.evaluateGetObserver(requestManager.storage.name);
		}
		return of(undefined);
	}
	/**
	 * Valuta se bisogna cachare un risultato
	 * @param requestManager oggetto di gestione delle richieste
	 * @param body risultato da cachare
	 */
	setStorage(requestManager: RequestManagerInterface, body: any) {
		if (
			requestManager &&
			requestManager.storage &&
			requestManager.storage.flgEval &&
			requestManager.storage.name
		) {
			this.innerStorage.evaluatePut(requestManager.storage.name, body);
		}
	}

	/**
	 * Verifica se esiste una specifica chiave nell'innerStorage
	 * @param requestManager oggetto di gestione delle richieste
	 */
	existStorage(requestManager: RequestManagerInterface): boolean {
		return requestManager &&
			requestManager.storage &&
			requestManager.storage.name &&
			this.innerStorage.get(requestManager.storage.name)
			? true
			: false;
	}

	/**
	 * Aggiunge parametri applicativi (quali skip_internal_db per esempio) ai parametri passati ad una call
	 * @param requestManager oggetto di gestione delle richieste
	 * @param params parametri di body presenti nella richiesta
	 */
	manageFixedParams(requestManager: RequestManagerInterface, params: HttpParams): HttpParams {
		if (requestManager && requestManager.skipInternalDb) {
			params = RequestUtility.addParam(params, EnumParamType.BOOLEAN, 'skip_internal_db', true);
		}
		return params;
	}

	// --------------- MANAGER
	/**
	 * Da usare prima di una call per inviare il token di sessione al servizio rest
	 * @param paramName nome del parametro token da inviare in header
	 * @param tokenValue valore del token
	 * @param responseManager oggetto per la gestione della call
	 */
	sendToken(paramName: string, tokenValue: string, responseManager?: ResponseManagerInterface) {
		if (!responseManager) {
			responseManager = {};
		}
		if (!responseManager.tokenManager) {
			responseManager.tokenManager = {};
		}
		responseManager.tokenManager.tokenKeyRequest = paramName;
		responseManager.tokenManager.tokenValue = tokenValue;
	}

	/**
	 * Da usare prima di una call per ricevere il token di sessione dal servizio rest
	 * @param paramName nome del parametro token che riceviamo in header
	 * @param responseManager oggetto per la gestione della call
	 */
	receiveToken(paramName: string, responseManager?: ResponseManagerInterface) {
		if (!responseManager) {
			responseManager = {};
		}
		responseManager.tokenManager.tokenKeyResponse = paramName;
	}
	/**
	 * Gestisce se richiesto da <b>responseManager</b> la ricezione del token di autenticazione dal servizio rest
	 * e ne guida la decodifica e memorizzazione
	 * @param responseManager oggetto di gestione dei parametri di valutazione della response
	 * @param res response ricevuto dal servizio rest
	 */
	receiveTokenSession(
		responseManager?: ResponseManagerInterface,
		res?: HttpResponse<any>,
	): boolean {
		if (
			responseManager &&
			responseManager.tokenManager &&
			responseManager.tokenManager.tokenKeyResponse
		) {
			const tokenSessionByResponse = res.headers.get(responseManager.tokenManager.tokenKeyResponse);
			return this.evalToken(tokenSessionByResponse, responseManager);
		}
		return true;
	}

	/**
	 * Aggiunge se richiesto da <b>responseManager</b> il token di verifica autenticazione all'header di una request
	 * al fine di inviare il token da controllare al servizio rest
	 * @param responseManager oggetto di gestione dei parametri di valutazione della response
	 * @param headers headers della request
	 */
	sendTokenSession(responseManager?: ResponseManagerInterface, headers?: HttpHeaders): HttpHeaders {
		if (
			responseManager &&
			responseManager.tokenManager &&
			responseManager.tokenManager.tokenKeyRequest
		) {
			headers = headers.append(
				responseManager.tokenManager.tokenKeyRequest,
				responseManager.tokenManager.tokenValue ? responseManager.tokenManager.tokenValue : '',
			);
		}
		return headers;
	}

	get(
		headers: HttpHeaders,
		url: string,
		params: HttpParams,
		converter?: BaseConverter<any, any>,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		return this.callGet(headers, url, params, false, converter, requestManager, responseManager);
	}
	getList(
		headers: HttpHeaders,
		url: string,
		params: HttpParams,
		converter?: BaseConverter<any, any>,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		return this.callGet(headers, url, params, true, converter, requestManager, responseManager);
	}

	post(
		headers: HttpHeaders,
		url: string,
		params: HttpParams,
		converter?: BaseConverter<any, any>,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	) {
		return this.callPost(headers, url, params, false, converter, requestManager, responseManager);
	}
	postList(
		headers: HttpHeaders,
		url: string,
		params: HttpParams,
		converter?: BaseConverter<any, any>,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	) {
		return this.callPost(headers, url, params, true, converter, requestManager, responseManager);
	}

	buildOptionsRequest(
		headers: HttpHeaders,
		params?: HttpParams,
		observe?: string,
		responseType?: string,
	): any {
		const options: any = {};
		options.headers = headers;
		if (params) {
			options.params = params;
		}
		if (observe) {
			options.observe = observe;
		}
		if (responseType) {
			options.responseType = responseType;
		}
		return options;
	}

	/**
	 * Ritorna un headers con l'aggiunta dei parametri presenti nell'array headerParams del manager request
	 * @param responseManager oggetto di gestione dei parametri di valutazione della request
	 * @param headers header a cui aggiungere i parametri
	 */
	setHeaderParams(request: RequestManagerInterface, headers?: HttpHeaders): HttpHeaders {
		if (request && request.headerParams && request.headerParams.length > 0) {
			request.headerParams.forEach((param) => {
				headers = headers.append(param.key, param.value);
			});
		}
		return headers;
	}

	/**
	 * Definisce il content-type da passare ad ogni request
	 */
	abstract getRequestContentType(): string;
	/**
	 * Definisce il nome del campo da passare al servizio rest per identificare il token di autenticazione all'applicazione
	 */
	abstract getRequestNameForAppTokenAuthentication(): string;

	/**
	 * Definisce il valore del campo da passare al servizio rest per identificare il token di autenticazione all'applicazione
	 */
	abstract getRequestValueForAppTokenAuthentication(): string;
	/**
	 * Valutazione della response ad una chiamata rest.
	 * Deve ritornare true se la response è stata valutata correttamente senza errori o dati inconsistenti.
	 * @param res response della chiamata rest
	 * @param responseManager oggetto di gestione dei parametri di valutazione della response
	 */
	abstract evalResponse(
		res: HttpResponse<any>,
		responseManager?: ResponseManagerInterface,
	): boolean;
	/**
	 * Valutazione e decodifica del token ricevuto, a seguito di una autenticazione, nell'header della response di una chiamata rest
	 * @param tokenObject oggetto decodificato del token ricevuto nell'header della response
	 * @param responseManager oggetto di gestione dei parametri di valutazione della response
	 */
	abstract manageTokenAuth(
		token: TokenDecodeInterface,
		responseManager?: ResponseManagerInterface,
	): boolean;

	/**
	 * Valutazione dell'eccezione di una chiamata
	 * @param error body della response di errore ricevuta
	 * @param responseManager oggetto di gestione dei parametri di valutazione della response
	 */
	abstract handleError(error: HttpErrorResponse, responseManager?: ResponseManagerInterface);
	/**
	 * Ritorna un BehaviourMessageModel per richiamare la sua funzione evalMessage()
	 * e definire il comportamento da eseguire per la notifica di messaggi post calls
	 */
	abstract getBehaviourMessageModel(): BehaviourMessageModel;
	/**
	 * Ritorna un MessageModel da passare al BehaviourMessageModel.evalMessage()
	 * e costruito decodificando i parametri di ingresso
	 */
	abstract getDefaultMessageModel(
		type: EnumMessageType,
		code: number,
		title: string,
		text: string,
		exception?: string,
	): MessageModel;
	/**
	 * Funzione specifica per la decodifica del token di sessione.
	 * Se non definita viene usata la decodifica di default di AuthUtility
	 * @param token token da decodificare
	 */
	abstract getSpecificDecodeTokenSession(token: string): TokenDecodeInterface;

	// CALLS
	abstract callGet(
		headers: HttpHeaders,
		url: string,
		params: HttpParams,
		flgList: boolean,
		converter?: BaseConverter<any, any>,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;

	abstract callPost(
		headers: HttpHeaders,
		url: string,
		params: HttpParams,
		flgList: boolean,
		converter?: BaseConverter<any, any>,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any>;

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
