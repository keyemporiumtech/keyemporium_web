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
import { shopWarehouseList } from '../constants/shop-warehouse.list';
import { ServiceModel } from '../models/service.model';
import { ServiceConverter, ServiceUtilConverter } from '../converters/service.converter';
import { PriceModel } from '../models/price.model';
import { PriceUtilConverter } from '../converters/price.converter';
import { DiscountModel } from '../models/discount.model';
import { DiscountUtilConverter } from '../converters/discount.converter';
import { ServicetaxModel } from '../models/servicetax.model';
import { ServicetaxUtilConverter } from '../converters/servicetax.converter';

@Injectable()
export class ServiceService extends ApiService {
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
	): Observable<ServiceModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ServiceConverter(),
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
				: this.environment.api.services + shopWarehouseList.service.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new ServiceConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		serviceIn: ServiceModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'service',
			ServiceUtilConverter.toDto(serviceIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		serviceIn: ServiceModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'service',
			ServiceUtilConverter.toDto(serviceIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ----------------- PRICE
	addPrice(
		priceIn: PriceModel,
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'price',
			PriceUtilConverter.toDto(priceIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.addPrice;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	editPrice(
		priceIn: PriceModel,
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'price',
			PriceUtilConverter.toDto(priceIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.editPrice;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ------------------ DISCOUNT
	addDiscount(
		discountIn: DiscountModel,
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'discount',
			DiscountUtilConverter.toDto(discountIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.addDiscount;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	editDiscount(
		discountIn: DiscountModel,
		id: string,
		id_discount: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'discount',
			DiscountUtilConverter.toDto(discountIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_discount', id_discount);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.editDiscount;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	deleteDiscount(
		id: string,
		id_discount: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_discount', id_discount);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.deleteDiscount;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ------------------ TAX
	addTax(
		taxIn: ServicetaxModel,
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'tax',
			ServicetaxUtilConverter.toDto(taxIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.addTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	editTax(
		taxIn: ServicetaxModel,
		id: string,
		id_servicetax: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'tax',
			ServicetaxUtilConverter.toDto(taxIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_servicetax', id_servicetax);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.editTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	deleteTax(
		id: string,
		id_servicetax: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_service', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_servicetax', id_servicetax);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.service.deleteTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
