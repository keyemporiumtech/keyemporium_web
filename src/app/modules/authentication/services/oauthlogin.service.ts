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
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserConverter } from '../converters/user.converter';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { authenticationList } from '../constants/authentication.list';
import { SocialUserModel } from '../lib/social-user.model';
import { EnumSocialreferenceType } from '../enums/socialreference-type.enum';
import { SocialUserUtilConverter } from '../converters/social-user.converter';
import { ConfirmoperationRequest } from '../dtos/confirmoperation-request';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';

@Injectable()
export class OauthloginService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
	}

	check(
		socialuserIn: SocialUserModel,
		tpsocialreference: EnumSocialreferenceType,
		id_user?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<UserModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'socialuser',
			SocialUserUtilConverter.toDto(socialuserIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id_user);
		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'tpsocialreference',
			tpsocialreference.toString(),
		);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.oauthlogin.check;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new UserConverter(),
			requestManager,
			responseManager,
		);
	}

	login(
		username: string,
		oauthid: string,
		tpsocialreference: EnumSocialreferenceType,
		rememberme?: boolean,
		confirm?: ConfirmoperationRequest,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'oauthid', oauthid);
		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'tpsocialreference',
			tpsocialreference.toString(),
		);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'rememberme', rememberme);
		body = RequestUtility.addParam(body, EnumParamType.OBJECT, 'confirmoperation_request', confirm);

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.oauthlogin.login;
		return this.post(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}
}
