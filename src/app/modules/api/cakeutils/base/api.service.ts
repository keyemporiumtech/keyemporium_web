import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpParams,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	BaseConverter,
	EnumMessageType,
	InnerStorageService,
	MessageModel,
	MessageService,
} from '@ddc/kit';
import {
	BaseRestService,
	BehaviourMessageModel,
	EnumParamType,
	RequestManagerInterface,
	RequestUtility,
	ResponseManagerInterface,
	TokenDecodeInterface,
} from '@ddc/rest';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { restConstants } from '../constants/rest.constants';
import { EnumStatusCode } from '../enums/status-code.enum';
import { ApiServiceUtility } from '../utility/api-service.utility';
import { ResponseCakeUtility } from '../utility/response-cake.utility';
/**
 * Definisce il comportamento generico di chiamate per il backend.<br/>
 * <i>Si interfaccia con il comportamento di AppGenericUI del be mod_rest ed usa </i>
 *
 * E' possibile estendere il comportamento di questo servizio ridefinendo semplicemente
 * il behaviour dei messaggi con l'override della funzione getBehaviourMessageModel()
 */
@Injectable({
	providedIn: 'root',
})
export class ApiService extends BaseRestService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
	}

	flgInnerToken: boolean;

	getRequestContentType(): string {
		return 'application/x-www-form-urlencoded; charset=UTF-8';
	}
	getRequestNameForAppTokenAuthentication(): string {
		return this.flgInnerToken ? 'innerToken' : restConstants.clienttokenname;
	}
	getRequestValueForAppTokenAuthentication(): string {
		return this.flgInnerToken ? restConstants.innertoken : restConstants.clienttoken;
	}

	evalResponse(res: HttpResponse<any> | any, responseManager?: ResponseManagerInterface): boolean {
		if (responseManager && responseManager.fnOk && responseManager.fnOk.flag) {
			responseManager.fnOk.fn();
		}
		const status = ResponseCakeUtility.buildMessageStatus(res);
		// const status = res.headers.get("statuscod");
		// const msg = res.headers.get("message");
		if (status && +status.statusCod === EnumStatusCode.ERROR) {
			if (responseManager && responseManager.fnError && responseManager.fnError.flag) {
				responseManager.fnError.fn();
			}
			if (responseManager && responseManager.toMessage && responseManager.toMessage.skipError) {
				return true;
			}
			this.getBehaviourMessageModel().evalMessage(
				responseManager && responseManager.toMessage,
				this.getDefaultMessageModel(
					status.applicationMessage && status.applicationMessage.type.toString() !== ''
						? status.applicationMessage.type
						: EnumMessageType.WARNING,
					status.responseCod,
					undefined,
					status.applicationMessage ? status.applicationMessage.message : '',
					status.exceptionMessage ? status.exceptionMessage.message : '',
				),
			);
			return false;
		} else if (
			status &&
			+status.statusCod === EnumStatusCode.OK &&
			responseManager &&
			responseManager.toMessage &&
			responseManager.toMessage.handlePositiveMessage
		) {
			this.getBehaviourMessageModel().evalMessage(
				responseManager && responseManager.toMessage,
				this.getDefaultMessageModel(
					status.applicationMessage ? status.applicationMessage.type : EnumMessageType.INFO,
					status.responseCod,
					undefined,
					status.applicationMessage ? status.applicationMessage.message : '',
				),
			);
			return false;
		}
		return true;
	}

	/**
	 * Decodifica il token ricevuto dal servizio rest a fronte di un login
	 *
	 * L'interfaccia del objectToken.payload è [PayloadDataInterface]{@link PayloadDataInterface}
	 * @param objectToken token ricevuto dal servizio rest a fronte di un login
	 * @param responseManager oggetto di gestione dei parametri di valutazione della response
	 */
	manageTokenAuth(
		objectToken: TokenDecodeInterface,
		responseManager?: ResponseManagerInterface,
	): boolean {
		if (objectToken.auth && objectToken.payload) {
			this.memoToken(objectToken);
			return true;
		} else {
			this.getBehaviourMessageModel().evalMessage(
				responseManager && responseManager.toMessage ? responseManager.toMessage : undefined,
				this.getDefaultMessageModel(
					EnumMessageType.WARNING,
					undefined,
					undefined,
					'MESSAGE.SESSION_INVALID',
					'EXCEPTION.TOKEN_ERROR',
				),
			);
			return false;
		}
	}
	handleError(error: HttpErrorResponse, responseManager?: ResponseManagerInterface) {
		if (responseManager && responseManager.fnError && responseManager.fnError.flag) {
			responseManager.fnError.fn();
		}
		if (responseManager && responseManager.toMessage && responseManager.toMessage.skipError) {
			throw error;
		} else {
			let body = error.error;
			// caso di errore non gestito dal server
			if (body && !body.title && !body.message) {
				body = {};
				body.title = this.getTitleByType(EnumMessageType.WARNING);
				body.message = 'MESSAGE.GENERIC_ERROR';
				body.exception = error.statusText + '<br/>' + error.message;
			} else if (typeof error === 'string' && !body) {
				body = {};
				body.title = this.getTitleByType(EnumMessageType.WARNING);
				body.message = 'MESSAGE.GENERIC_ERROR';
				body.exception = error;
			} else if (error && error.message && !body) {
				body = {};
				body.title = this.getTitleByType(EnumMessageType.WARNING);
				body.message = 'MESSAGE.GENERIC_ERROR';
				body.exception = error.message;
			} else if (!body) {
				body = {};
				body.title = this.getTitleByType(EnumMessageType.WARNING);
				body.message = 'MESSAGE.GENERIC_ERROR';
				body.exception = JSON.stringify(error);
			}
			this.getBehaviourMessageModel().evalMessage(
				responseManager && responseManager.toMessage ? responseManager.toMessage : undefined,
				new MessageModel(
					EnumMessageType.WARNING,
					error && error.status ? error.status : this.getDefaultErrorResponseCode(),
					body.title,
					body.message,
					body.exception,
				),
			);
		}
	}
	getBehaviourMessageModel(): BehaviourMessageModel {
		return new BehaviourMessageModel(this.messageService, {
			subject: {
				flg: true,
				idComponent: this.environment.messages.idMessagePrincipal,
			},
			routing: undefined,
		});
	}
	getDefaultMessageModel(
		type: EnumMessageType,
		code: number,
		title: string,
		text: string,
		exception?: string,
	): MessageModel {
		return new MessageModel(
			type,
			code ? code : this.getDefaultErrorResponseCode(),
			title ? title : this.getTitleByType(type),
			text,
			exception,
		);
	}
	getSpecificDecodeTokenSession(token: string) {
		return undefined;
	}
	getClassName(): string {
		return 'ApiService';
	}

	// calls
	callGet(
		headers: HttpHeaders,
		url: string,
		params: HttpParams,
		flgList: boolean,
		converter?: BaseConverter<any, any>,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		if (
			this.evalGetStorage(requestManager) &&
			this.existStorage(requestManager) &&
			this.environment.enable.innerStorage
		) {
			return this.getStorage(requestManager);
		}
		headers = this.sendTokenSession(responseManager, headers);
		headers = this.setHeaderParams(requestManager, headers);
		const options: any = this.buildOptionsRequest(
			headers,
			params,
			'response',
			requestManager && requestManager.responseType ? requestManager.responseType : undefined,
		);
		if (responseManager && responseManager.setEmptyModelIfNull && converter) {
			converter['getEmptyIfNull'] = true;
		}
		params = this.manageFixedParams(requestManager, params);
		params = this.sendUserInfo(requestManager, params);
		params = this.sendActivityInfo(requestManager, params);
		return this.http.get(url, options as {}).pipe(
			map((res: HttpResponse<any>) => {
				if (this.evalResponse(res, responseManager)) {
					if (this.receiveTokenSession(responseManager, res)) {
						this.setStorage(requestManager, res.body);
						return converter
							? flgList
								? converter.convertToModelList(res.body)
								: converter.convertToModel(res.body)
							: res.body;
					} else {
						return undefined;
					}
				}
				return res ? res.body : undefined;
			}),
			catchError((err: HttpErrorResponse) => {
				this.handleError(err, responseManager);
				return undefined;
			}),
		);
	}

	callPost(
		headers: HttpHeaders,
		url: string,
		params: HttpParams,
		flgList: boolean,
		converter?: BaseConverter<any, any>,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		if (
			this.evalGetStorage(requestManager) &&
			this.existStorage(requestManager) &&
			this.environment.enable.innerStorage
		) {
			return this.getStorage(requestManager);
		}
		headers = this.sendTokenSession(responseManager, headers);
		headers = this.setHeaderParams(requestManager, headers);
		const options: any = this.buildOptionsRequest(
			headers,
			undefined,
			'response',
			requestManager && requestManager.responseType ? requestManager.responseType : undefined,
		);
		if (responseManager && responseManager.setEmptyModelIfNull && converter) {
			converter['getEmptyIfNull'] = true;
		}
		params = this.manageFixedParams(requestManager, params);
		params = this.sendUserInfo(requestManager, params);
		params = this.sendActivityInfo(requestManager, params);
		return this.http.post(url, params, options as {}).pipe(
			map((res: HttpResponse<any>) => {
				if (this.evalResponse(res, responseManager)) {
					if (this.receiveTokenSession(responseManager, res)) {
						this.setStorage(requestManager, res.body);
						return converter
							? flgList
								? converter.convertToModelList(res.body)
								: converter.convertToModel(res.body)
							: res.body;
					} else {
						return undefined;
					}
				}
				return res ? res.body : undefined;
			}),
			catchError((err: HttpErrorResponse) => {
				this.handleError(err, responseManager);
				return undefined;
			}),
		);
	}

	getDefaultErrorResponseCode(): number {
		return 404;
	}

	// utils
	/**
	 * Utility di supporto alla funzione getDefaultMessageModel() per definire un titolo generico
	 * per un messaggio, basandosi sul tipo di messaggio da mostrare
	 * @param type tipo di messaggio
	 */
	getTitleByType(type: EnumMessageType): string {
		switch (type) {
			case EnumMessageType.INFO:
				return 'MESSAGE.TITLE.INFO';
			case EnumMessageType.WARNING:
				return 'MESSAGE.TITLE.WARNING';
			case EnumMessageType.ERROR:
				return 'MESSAGE.TITLE.ERROR';
			default:
				return 'MESSAGE.TITLE.WARNING';
		}
	}

	/**
	 * Invia il token di sessione e ritorna l'oggetto ResponseManagerInterface.
	 * Usabile direttamente come parametro responseManager delle api call
	 * @param responseManager oggetto ResponseManagerInterface esistente se previsto, altrimenti lo crea
	 */
	sendTokenApi(responseManager?: ResponseManagerInterface) {
		if (!responseManager) {
			responseManager = {};
		}
		super.sendToken(
			restConstants.sessiontokenname,
			this.applicationStorage.authtoken.get(),
			responseManager,
		);
	}
	/**
	 * Riceve il token di sessione e ritorna l'oggetto ResponseManagerInterface.
	 * Usabile direttamente come parametro responseManager delle api call
	 * @param responseManager oggetto ResponseManagerInterface esistente se previsto, altrimenti lo crea
	 */
	receiveTokenApi(responseManager?: ResponseManagerInterface) {
		if (!responseManager) {
			responseManager = {};
		}
		super.receiveToken(restConstants.sessiontokenname, responseManager);
	}

	// OVERRIDES TOKENAUTH
	sendTokenSession(responseManager?: ResponseManagerInterface, headers?: HttpHeaders): HttpHeaders {
		if (this.applicationStorage.passauthtoken.get()) {
			headers = headers.append(
				restConstants.sessiontokenname,
				this.applicationStorage.authtoken.get(),
			);
			return headers;
		}
		return super.sendTokenSession(responseManager, headers);
	}

	// SEND INFO USER AND ACTIVITY
	sendUserInfo(requestManager?: RequestManagerInterface, params?: HttpParams): HttpParams {
		if (ApiServiceUtility.isSendUserInfo(requestManager)) {
			if (params && !params.has('username')) {
				const userLogged = this.applicationStorage.userLogged.getObj();
				RequestUtility.addParam(
					params,
					EnumParamType.STRING,
					'username',
					userLogged ? userLogged.username : '',
				);
			}
		}
		return params;
	}

	sendActivityInfo(requestManager?: RequestManagerInterface, params?: HttpParams): HttpParams {
		if (ApiServiceUtility.isSendActivityInfo(requestManager)) {
			if (params && !params.has('username')) {
				const userLogged = this.applicationStorage.userLogged.getObj();
				RequestUtility.addParam(
					params,
					EnumParamType.STRING,
					'username',
					userLogged ? userLogged.username : '',
				);
			}
			if (params && !params.has('piva')) {
				const pivaLogged = this.applicationStorage.activityPIVA.get();
				RequestUtility.addParam(params, EnumParamType.STRING, 'piva', pivaLogged);
			}
		}
		return params;
	}
}
