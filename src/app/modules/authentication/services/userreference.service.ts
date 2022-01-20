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
import { UserreferenceModel } from '../models/userreference.model';
import {
	UserreferenceConverter,
	UserreferenceUtilConverter,
} from '../converters/userreference.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { authenticationList } from '../constants/authentication.list';
import { ContactreferenceUtilConverter } from '../converters/contactreference.converter';
import { ContactreferenceModel } from '../models/contactreference.model';
import { EnumContactreferenceType } from '../enums/contactreference-type.enum';

@Injectable()
export class UserreferenceService extends ApiService {
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
	): Observable<UserreferenceModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_userreference', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userreference.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new UserreferenceConverter(),
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
				: this.environment.api.services + authenticationList.userreference.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new UserreferenceConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		userreferenceIn: UserreferenceModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'userreference',
			UserreferenceUtilConverter.toDto(userreferenceIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userreference.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		userreferenceIn: UserreferenceModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'userreference',
			UserreferenceUtilConverter.toDto(userreferenceIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_userreference', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userreference.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_userreference', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userreference.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	principal(
		id_user?: string,
		username?: string,
		type?: EnumContactreferenceType,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<UserreferenceModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type.toString());
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userreference.principal;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new UserreferenceConverter(),
			requestManager,
			responseManager,
		);
	}

	setPrincipal(
		id_user?: string,
		username?: string,
		id?: string,
		cod?: string,
		type?: EnumContactreferenceType,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_userreference', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod_userreference', cod);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type.toString());
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userreference.setprincipal;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	saveRelation(
		id_user: string,
		referenceIn: ContactreferenceModel,
		tpreference: EnumContactreferenceType,
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
			'contactreference',
			ContactreferenceUtilConverter.toDto(referenceIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'tpcontactreference',
			tpreference.toString(),
		);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'flgprincipal', flgprincipal);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.userreference.saverelation;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}
}
