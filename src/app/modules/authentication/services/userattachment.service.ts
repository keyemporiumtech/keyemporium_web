import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
} from '@ddc/kit';
import { Observable } from 'rxjs';
import {
	EnumParamType,
	PaginatorConverter,
	PaginatorModel,
	RequestManagerInterface,
	RequestUtility,
	ResponseManagerInterface,
} from '@ddc/rest';
import { Injectable } from '@angular/core';
import { UserattachmentModel } from '../models/userattachment.model';
import {
	UserattachmentConverter,
	UserattachmentUtilConverter,
} from '../converters/userattachment.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { authenticationList } from '../constants/authentication.list';
import { AttachmentModel } from '../../resources/models/attachment.model';
import { EnumAttachmentType } from '../../resources/enums/attachment-type.enum';
import { AttachmentUtilConverter } from '../../resources/converters/attachment.converter';

@Injectable()
export class UserattachmentService extends ApiService {
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
		cod?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<UserattachmentModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_userattachment', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userattachment.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new UserattachmentConverter(),
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
				: this.environment.api.services + authenticationList.userattachment.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new UserattachmentConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		userattachmentIn: UserattachmentModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'userattachment',
			UserattachmentUtilConverter.toDto(userattachmentIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userattachment.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		userattachmentIn: UserattachmentModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'userattachment',
			UserattachmentUtilConverter.toDto(userattachmentIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_userattachment', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userattachment.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_userattachment', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userattachment.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	principal(
		id_user?: string,
		username?: string,
		type?: EnumAttachmentType,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<UserattachmentModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type.toString());
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userattachment.principal;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new UserattachmentConverter(),
			requestManager,
			responseManager,
		);
	}

	setPrincipal(
		id_user?: string,
		username?: string,
		id?: string,
		cod?: string,
		type?: EnumAttachmentType,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_userattachment', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod_userattachment', cod);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type.toString());
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userattachment.setprincipal;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	saveRelation(
		id_user: string,
		attachmentIn: AttachmentModel,
		tpattachment: EnumAttachmentType,
		flgprincipal?: boolean,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id_user);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'attachment',
			AttachmentUtilConverter.toDto(attachmentIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'tpattachment',
			tpattachment.toString(),
		);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprincipal', flgprincipal);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userattachment.saverelation;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}
}
