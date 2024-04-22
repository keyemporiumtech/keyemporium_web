import {
	ApplicationLoggerService,
	MessageService,
	ApplicationStorageService,
	EnumMessageType,
	InnerStorageService,
} from '@ddc/kit';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { EnumStaticStatusCode } from '../enums/status-code.enum';
import { Injectable } from '@angular/core';
import { ResponseManagerInterface } from '@ddc/rest';
import { ApiService } from './api.service';
import { TranslateService } from '@ngx-translate/core';
/**
 * Definisce il comportamento generico di chiamate per il backend keyemporiumattachment e ddcgoole.
 *
 * Rispetto all'implementazione di ApiService necessita di gestire gli errori in fase di eval response,
 * in quanto il messaggio viene inviato in body con status 200
 */

export class ApiStaticService extends ApiService {
	translate: TranslateService;
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
		translate: TranslateService,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.translate = translate;
	}

	evalResponse(res: HttpResponse<any> | any, responseManager?: ResponseManagerInterface): boolean {
		if (responseManager && responseManager.fnOk && responseManager.fnOk.flag) {
			responseManager.fnOk.fn();
		}
		const body = res.body;
		const status = body.codestatus;
		const msg = body.message
			? this.translate.instant(body.message, body.message_params ? body.message_params : undefined)
			: '';
		if (status && +status === EnumStaticStatusCode.ERROR) {
			if (this.environment.enable.apiLogError) {
				console.error(
					'[' + res.url + ']',
					status.applicationMessage && status.applicationMessage.type.toString() !== ''
						? status.applicationMessage.type
						: EnumMessageType.WARNING,
					status.responseCod,
					status.applicationMessage ? status.applicationMessage.message : '',
					status.exceptionMessage ? status.exceptionMessage.message : '',
				);
			}
			if (responseManager && responseManager.fnError && responseManager.fnError.flag) {
				responseManager.fnError.fn();
			}
			if (responseManager && responseManager.toMessage && responseManager.toMessage.skipError) {
				return true;
			}
			const exception = body.exception ? this.translate.instant(body.exception) : '';
			this.getBehaviourMessageModel().evalMessage(
				responseManager && responseManager.toMessage,
				this.getDefaultMessageModel(EnumMessageType.WARNING, undefined, undefined, msg, exception),
			);
			res.body = undefined;
			return false;
		} else if (
			+status === EnumStaticStatusCode.OK &&
			responseManager &&
			responseManager.toMessage &&
			responseManager.toMessage.handlePositiveMessage
		) {
			this.getBehaviourMessageModel().evalMessage(
				responseManager && responseManager.toMessage,
				this.getDefaultMessageModel(EnumMessageType.INFO, undefined, undefined, msg),
			);
			res.body = undefined;
			return false;
		}
		return true;
	}

	getClassName(): string {
		return 'ApiStaticService';
	}
}
