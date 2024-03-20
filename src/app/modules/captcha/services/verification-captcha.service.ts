import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import { RequestManagerInterface, ResponseManagerInterface } from '@ddc/rest';
import { ApiKeysService } from '../../api/cakeutils/base/api-keys.service';
import { captchaList } from '../constants/captcha.list';
import { CaptchaService } from './captcha.service';
import { Observable } from 'rxjs';

@Injectable()
export class VerificationCaptchaService extends ApiKeysService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
		private captchaService: CaptchaService,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		// this.applicationService = applicationService;
		// this.auth2faService = auth2faService;
		// this.userService = userService;
		this.flgInnerToken = false;
	}

	generateCode(
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.url = this.environment.api.servicesKeys + captchaList.captcha.generate;
		requestManager.headerParams = [
			{
				key: this.getRequestNameForAppTokenAuthentication(),
				value: this.getRequestValueForAppTokenAuthentication(),
			},
		];
		return this.captchaService.generate(this.environment.clientId, requestManager, responseManager);
	}

	verifyCode(
		token: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		if (!requestManager) {
			requestManager = {};
		}
		requestManager.url = this.environment.api.servicesKeys + captchaList.captcha.generate;

		requestManager.headerParams = [
			{
				key: this.getRequestNameForAppTokenAuthentication(),
				value: this.getRequestValueForAppTokenAuthentication(),
			},
		];

		return this.captchaService.verify(token, requestManager, responseManager);
	}
}
