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
import { shopPaymentList } from '../constants/shop-payment.list';
import { BasketModel } from '../models/basket.model';
import { BasketConverter, BasketUtilConverter } from '../converters/basket.converter';
import { BasketproductModel } from '../models/basketproduct.model';
import { BasketserviceModel } from '../models/basketservice.model';
import { BasketticketModel } from '../models/basketticket.model';
import { BasketpocketModel } from '../models/basketpocket.model';
import { BasketproductUtilConverter } from '../converters/basketproduct.converter';
import { BasketserviceUtilConverter } from '../converters/basketservice.converter';
import { BasketticketUtilConverter } from '../converters/basketticket.converter';
import { BasketpocketUtilConverter } from '../converters/basketpocket.converter';

@Injectable()
export class BasketService extends ApiService {
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
	): Observable<BasketModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_basket', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.basket.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new BasketConverter(),
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
				: this.environment.api.services + shopPaymentList.basket.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new BasketConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		basketIn: BasketModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'basket',
			BasketUtilConverter.toDto(basketIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.basket.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		basketIn: BasketModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'basket',
			BasketUtilConverter.toDto(basketIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_basket', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.basket.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		all?: boolean,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_basket', id);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'all', all);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.basket.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	saveBasket(
		basketIn: BasketModel,
		basketproductsIn?: BasketproductModel[],
		basketservicesIn?: BasketserviceModel[],
		basketticketsIn?: BasketticketModel[],
		basketpocketsIn?: BasketpocketModel[],
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'basket',
			BasketUtilConverter.toDto(basketIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'basketproducts',
			BasketproductUtilConverter.toDtoList(basketproductsIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'basketservices',
			BasketserviceUtilConverter.toDtoList(basketservicesIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'baskettickets',
			BasketticketUtilConverter.toDtoList(basketticketsIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'basketpockets',
			BasketpocketUtilConverter.toDtoList(basketpocketsIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.basket.saveBasket;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	editBasket(
		basketIn: BasketModel,
		id?: string,
		basketproductsIn?: BasketproductModel[],
		basketservicesIn?: BasketserviceModel[],
		basketticketsIn?: BasketticketModel[],
		basketpocketsIn?: BasketpocketModel[],
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'basket',
			BasketUtilConverter.toDto(basketIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_basket', id);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'basketproducts',
			BasketproductUtilConverter.toDtoList(basketproductsIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'basketservices',
			BasketserviceUtilConverter.toDtoList(basketservicesIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'baskettickets',
			BasketticketUtilConverter.toDtoList(basketticketsIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.ARRAY,
			'basketpockets',
			BasketpocketUtilConverter.toDtoList(basketpocketsIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.basket.editBasket;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}
}
