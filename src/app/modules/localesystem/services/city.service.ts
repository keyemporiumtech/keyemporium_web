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
import { CityModel } from '../models/city.model';
import { CityConverter, CityUtilConverter } from '../converters/city.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { localesystemList } from '../constants/localesysteml.list';
import { ApiFast } from '../../api/cakeutils/utility/api-fast.utility';

@Injectable()
export class CityService extends ApiService {
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
		id?: string,
		cod?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<CityModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_city', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.city.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new CityConverter(),
			requestManager,
			responseManager,
		);
	}

	uniqueByGeo(
		lat: string,
		lon: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<CityModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'lat', lat);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'lon', lon);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.city.uniquebygeo;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new CityConverter(),
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
				: this.environment.api.services + localesystemList.city.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new CityConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		cityIn: CityModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'city',
			CityUtilConverter.toDto(cityIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.city.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		cityIn: CityModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'city',
			CityUtilConverter.toDto(cityIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_city', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.city.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_city', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.city.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// utility
	regions(
		id_nation: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<CityModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_nation', id_nation);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.city.regions;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	provinces(
		id_nation: string,
		cod_region: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<CityModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_nation', id_nation);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod_region', cod_region);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.city.provinces;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	communities(
		id_nation: string,
		cod_region: string,
		cod_province: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<CityModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_nation', id_nation);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod_region', cod_region);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod_province', cod_province);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + localesystemList.city.communities;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new CityConverter(),
			requestManager,
			responseManager,
		);
	}
}
