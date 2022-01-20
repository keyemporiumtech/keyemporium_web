import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestGroupsConditionsInterface } from '../../cakeutils/interfaces/request-groups-conditions.interface';
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
import { ApiService } from '../../cakeutils/base/api.service';
import { RequestConditionInterface } from '../../cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../cakeutils/utility/request-cake.utility';
import { cakeutilsBeList } from '../constants/cakeutils-be.list';
import { Injectable } from '@angular/core';
import { RequestPaginatorInterface } from '../../cakeutils/interfaces/request-paginator.interface';
import { TypologicalModel } from '../models/typological.model';
import {
	TypologicalConverter,
	TypologicalUtilConverter,
} from '../converters/typological.converter';
import { map } from 'rxjs/operators';

@Injectable()
export class TypologicalService extends ApiService {
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
		symbol?: string,
		entity_name?: string,
		entity_module?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<TypologicalModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_name', entity_name);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_module', entity_module);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_typological', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'symbol', symbol);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.typological.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new TypologicalConverter(),
			requestManager,
			responseManager,
		);
	}

	paginate(
		entity_name: string,
		entity_module: string,
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<PaginatorModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_name', entity_name);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_module', entity_module);

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.typological.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new TypologicalConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		entity_name: string,
		entity_module: string,
		typologicalIn: TypologicalModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_name', entity_name);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_module', entity_module);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'typological',
			TypologicalUtilConverter.toDto(typologicalIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.typological.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		entity_name: string,
		entity_module: string,
		typologicalIn: TypologicalModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_name', entity_name);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_module', entity_module);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'typological',
			TypologicalUtilConverter.toDto(typologicalIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_typological', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.typological.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		entity_name: string,
		entity_module: string,
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_name', entity_name);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'entity_module', entity_module);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_typological', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + cakeutilsBeList.typological.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
