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
import { ActivityreferenceModel } from '../models/activityreference.model';
import {
	ActivityreferenceConverter,
	ActivityreferenceUtilConverter,
} from '../converters/activityreference.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { authenticationList } from '../constants/authentication.list';
import { EnumContactreferenceType } from '../enums/contactreference-type.enum';
import { ContactreferenceModel } from '../models/contactreference.model';
import { ContactreferenceUtilConverter } from '../converters/contactreference.converter';

@Injectable()
export class ActivityreferenceService extends ApiService {
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
	): Observable<ActivityreferenceModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activityreference', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityreference.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ActivityreferenceConverter(),
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
				: this.environment.api.services + authenticationList.activityreference.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new ActivityreferenceConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		activityreferenceIn: ActivityreferenceModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'activityreference',
			ActivityreferenceUtilConverter.toDto(activityreferenceIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityreference.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		activityreferenceIn: ActivityreferenceModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'activityreference',
			ActivityreferenceUtilConverter.toDto(activityreferenceIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activityreference', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityreference.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activityreference', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityreference.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	principal(
		id_activity?: string,
		activityname?: string,
		type?: EnumContactreferenceType,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<ActivityreferenceModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id_activity);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'activityname', activityname);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type.toString());
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityreference.principal;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ActivityreferenceConverter(),
			requestManager,
			responseManager,
		);
	}

	setPrincipal(
		id_activity?: string,
		activityname?: string,
		id?: string,
		cod?: string,
		type?: EnumContactreferenceType,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id_activity);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'activityname', activityname);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activityreference', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod_activityreference', cod);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type.toString());
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activityreference.setprincipal;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	saveRelation(
		id_activity: string,
		referenceIn: ContactreferenceModel,
		tpreference: EnumContactreferenceType,
		flgprincipal?: boolean,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id_activity);
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
				: this.environment.api.services + authenticationList.activityreference.saverelation;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}
}
