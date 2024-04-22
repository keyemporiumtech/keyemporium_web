import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { ApiService } from '../../api/cakeutils/base/api.service';
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
import { authenticationList } from '../constants/authentication.list';
import { ApplicationModel } from '../models/application.model';
import {
	ApplicationConverter,
	ApplicationUtilConverter,
} from '../converters/application.converter';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';

@Injectable()
export class ApplicationService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.flgInnerToken = false;
	}

	unique(
		id?: string,
		cod?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<ApplicationModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_application', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.application.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ApplicationConverter(),
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
				: this.environment.api.services + authenticationList.application.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new ApplicationConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		applicationIn: ApplicationModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'application',
			ApplicationUtilConverter.toDto(applicationIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.application.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		applicationIn: ApplicationModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'application',
			ApplicationUtilConverter.toDto(applicationIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_application', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.application.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_application', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.application.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	generate(
		application: string,
		username: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		const key = btoa(application + '.' + btoa(username));

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'key', key);

		requestManager = ApiServiceUtility.setTypeBody('text', requestManager);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.application.generate;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	check(
		token: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'key', token);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.application.check;
		return this.get(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
