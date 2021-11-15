import {
	RequestManagerInterface,
	ResponseManagerInterface,
	RequestUtility,
	EnumParamType,
} from '@ddc/rest';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PasswordModel } from '../models/password.model';
import {
	ApplicationLoggerService,
	MessageService,
	ApplicationStorageService,
	InnerStorageService,
} from '@ddc/kit';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { Injectable } from '@angular/core';
import { validatorPasswordList } from '../constants/validator-password.list';
import { PasswordResponseInterface } from '../interfaces/password-response.interface';

@Injectable()
export class PasswordService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.flgInnerToken = true;
	}

	validate(
		password: string,
		level?: number,
		min?: number,
		max?: number,
		separator?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<PasswordResponseInterface> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'password', password);
		body = RequestUtility.addParam(body, EnumParamType.NUMBER, 'level', level);
		body = RequestUtility.addParam(body, EnumParamType.NUMBER, 'min', min);
		body = RequestUtility.addParam(body, EnumParamType.NUMBER, 'max', max);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'separator', separator);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + validatorPasswordList.password.validator;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}
}
