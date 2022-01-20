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
import { MultilanguageModel } from '../models/multilanguage.model';
import {
	MultilanguageConverter,
	MultilanguageUtilConverter,
} from '../converters/multilanguage.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { localesystemList } from '../constants/localesysteml.list';

@Injectable()
export class MultilanguageService extends ApiService {
	constructor(
		applicationLogger: ApplicationLoggerService,
		messageService: MessageService,
		applicationStorage: ApplicationStorageService,
		innerStorage: InnerStorageService,
		http: HttpClient,
	) {
		super(applicationLogger, messageService, applicationStorage, innerStorage, http);
		this.flgInnerToken = true;
	}

	unique(
		id_multilanguage: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<MultilanguageModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.STRING,
			'id_multilanguage',
			id_multilanguage,
		);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.multilanguage.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new MultilanguageConverter(),
			requestManager,
			responseManager,
		);
	}

	uniqueByField(
		table: string,
		field: string,
		objraw: string,
		languageid?: string,
		languagecod?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<MultilanguageModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'table', table);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'field', field);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'objraw', objraw);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'languageid', languageid);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'languagecod', languagecod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.multilanguage.uniquebyfield;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new MultilanguageConverter(),
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
				: this.environment.api.services + localesystemList.multilanguage.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new MultilanguageConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		multilanguageIn: MultilanguageModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'multilanguage',
			MultilanguageUtilConverter.toDto(multilanguageIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.multilanguage.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		multilanguageIn: MultilanguageModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'multilanguage',
			MultilanguageUtilConverter.toDto(multilanguageIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_multilanguage', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.multilanguage.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_multilanguage', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.multilanguage.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// TYPOLOGICAL
	tplanguagesfield(
		table: string,
		field: string,
		objraw: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'table', table);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'field', field);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'objraw', objraw);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.multilanguage.tplanguagesfield;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}
}
