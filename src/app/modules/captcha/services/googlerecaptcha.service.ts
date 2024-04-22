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
import { GooglerecaptchaVerifyConverter } from '../converters/googlerecaptcha-verify.converter';
import { GooglerecaptchaVerifyModel } from '../models/googlerecaptcha-verify.model';
import { GooglerecaptchaErrorConverter } from '../converters/googlerecaptcha-error.converter';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GooglerecaptchaService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
		private translate: TranslateService,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
	}

	verify(
		token: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<GooglerecaptchaVerifyModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'key', token);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + captchaList.googlerecaptcha.verify;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new GooglerecaptchaVerifyConverter(),
			requestManager,
			responseManager,
		).pipe(
			map((res: GooglerecaptchaVerifyModel) => {
				const googlerecaptchaErrorConverter = new GooglerecaptchaErrorConverter();
				res.messages = googlerecaptchaErrorConverter.toModelList(res.errors, this.translate);
				return res;
			}),
		);
	}
}
