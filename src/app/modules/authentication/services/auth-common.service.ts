import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import { RequestManagerInterface, ResponseManagerInterface } from '@ddc/rest';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';
import { authenticationList } from '../constants/authentication.list';

@Injectable()
export class AuthCommonService extends ApiService {
	private waitSession: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

	notifySession(val: boolean) {
		this.waitSession.next(val);
	}

	listenSession(): Observable<boolean> {
		return this.waitSession.asObservable();
	}
}
