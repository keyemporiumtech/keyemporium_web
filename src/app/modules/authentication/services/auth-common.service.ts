import { Injectable } from '@angular/core';
import { ApiService } from '../../api/cakeutils/base/api.service';
import {
	ApplicationLoggerService,
	MessageService,
	ApplicationStorageService,
	InnerStorageService,
} from '@ddc/kit';
import { RequestManagerInterface, ResponseManagerInterface } from '@ddc/rest';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { authenticationList } from '../constants/authentication.list';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';

@Injectable()
export class AuthCommonService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
	}

	tokenValid(
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		const body: HttpParams = new HttpParams();

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);
		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.authentication.tokenvalid;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	loginValid(
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<any> {
		const body: HttpParams = new HttpParams();

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);
		responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, responseManager);
		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.authentication.loginvalid;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}
}
