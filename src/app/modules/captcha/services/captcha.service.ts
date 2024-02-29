import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { captchaList } from '../constants/captcha.list';
import { Observable, map } from 'rxjs';
import {
	EnumParamType,
	RequestManagerInterface,
	RequestUtility,
	ResponseManagerInterface,
} from '@ddc/rest';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';

@Injectable()
export class CaptchaService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.flgInnerToken = false;
	}

	generate(
		clientid: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'key', clientid);

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + captchaList.captcha.generate;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	verify(
		token: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'key', token);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + captchaList.captcha.verify;
		return this.get(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
