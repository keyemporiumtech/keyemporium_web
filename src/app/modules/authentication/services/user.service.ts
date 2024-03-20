import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import {
	EnumParamType,
	PaginatorConverter,
	PaginatorModel,
	RequestManagerInterface,
	RequestUtility,
	ResponseManagerInterface,
} from '@ddc/rest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { AddressUtilConverter } from '../../localesystem/converters/address.converter';
import { AddressModel } from '../../localesystem/models/address.model';
import { AttachmentUtilConverter } from '../../resources/converters/attachment.converter';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { authenticationList } from '../constants/authentication.list';
import { ContactreferenceUtilConverter } from '../converters/contactreference.converter';
import { UserConverter, UserUtilConverter } from '../converters/user.converter';
import { ConfirmoperationRequest } from '../dtos/confirmoperation-request';
import { ContactreferenceModel } from '../models/contactreference.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
	}

	unique(
		id?: string,
		username?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<UserModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new UserConverter(),
			requestManager,
			responseManager,
		);
	}

	paginate(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<PaginatorModel> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new UserConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		userIn: UserModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'user',
			UserUtilConverter.toDto(userIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		userIn: UserModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'user',
			UserUtilConverter.toDto(userIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ------------ REGISTER

	register(
		userIn: UserModel,
		imageIn?: AttachmentModel,
		celIn?: ContactreferenceModel,
		homeIn?: AddressModel,
		bornIn?: AddressModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'user',
			UserUtilConverter.toDto(userIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'image',
			AttachmentUtilConverter.toDto(imageIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'cel',
			ContactreferenceUtilConverter.toDto(celIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'home',
			AddressUtilConverter.toDto(homeIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'born',
			AddressUtilConverter.toDto(bornIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.register;
		return this.post(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	// ------------ SESSION
	login(
		username: string,
		password: string,
		rememberme?: boolean,
		confirm?: ConfirmoperationRequest,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'password', password);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'rememberme', rememberme);
		body = RequestUtility.addParam(body, EnumParamType.OBJECT, 'confirmoperation_request', confirm);

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.login;
		return this.post(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	confirmLogin(
		username: string,
		pin: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'pin', pin);

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.confirmlogin;
		return this.post(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	checkSession(
		username: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.checksession;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	logout(
		username: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.logout;
		responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, responseManager);
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	restorePassword(
		id_user?: string,
		username?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.restorePassword;
		return this.post(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	remindPassword(
		id_user?: string,
		username?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.remindPassword;
		return this.post(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	changePassword(
		oldpassword: string,
		newpassword: string,
		id_user?: string,
		username?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'oldpassword', oldpassword);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'newpassword', newpassword);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.changePassword;
		return this.post(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	profile(
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		const body: HttpParams = new HttpParams();

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.profile;
		responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, responseManager);
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	changeProfile(
		profile: string,
		id?: string,
		username?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'profile', profile);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.user.changeProfile;
		responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, responseManager);
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
