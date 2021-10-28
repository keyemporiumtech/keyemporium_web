import { HttpClient, HttpParams } from '@angular/common/http';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import { Observable } from 'rxjs';
import {
	EnumParamType,
	RequestManagerInterface,
	RequestUtility,
	ResponseManagerInterface,
} from '@ddc/rest';
import { ApiService } from '../../cakeutils/base/api.service';
import { cakeutilsBeList } from '../constants/cakeutils-be.list';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EnumCookieType } from '../../../../shared/enums/cookie/cookie-type.enum';
import { CookieConverter } from '../converters/cookie.converter';
import { CookieModel } from '../models/cookie.model';
import { CookieStatusConverter } from '../converters/cookie-status.converter';
import { CookieStatusModel } from '../models/cookie-status.model';

@Injectable()
export class CookiemanagerService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
	}

	update(
		preference: boolean,
		statistic: boolean,
		marketing: boolean,
		not_classified: boolean,
		necessary?: boolean,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgPreference', preference);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgStatistic', statistic);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgMarketing', marketing);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgNotClassified', not_classified);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgNecessary', necessary);

		// requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cookiemanager.update;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	cookies(
		type?: EnumCookieType,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<CookieModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'type',
			type ? type.toString() : undefined,
		);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cookiemanager.cookies;
		return this.getList(
			this.httpHeaders,
			url,
			body,
			new CookieConverter(),
			requestManager,
			responseManager,
		);
	}

	cookie(
		key: string,
		type?: EnumCookieType,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<CookieModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'key', key);
		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'type',
			type ? type.toString() : undefined,
		);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cookiemanager.cookie;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new CookieConverter(),
			requestManager,
			responseManager,
		);
	}

	status(
		key?: string,
		type?: EnumCookieType,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<CookieStatusModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'key', key);
		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'type',
			type ? type.toString() : undefined,
		);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.cookiemanager.status;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new CookieStatusConverter(),
			requestManager,
			responseManager,
		);
	}
}
