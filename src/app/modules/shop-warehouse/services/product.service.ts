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
import { ProductModel } from '../models/product.model';
import { ProductConverter, ProductUtilConverter } from '../converters/product.converter';
import { PriceModel } from '../models/price.model';
import { PriceUtilConverter } from '../converters/price.converter';
import { DiscountModel } from '../models/discount.model';
import { DiscountUtilConverter } from '../converters/discount.converter';
import { ProducttaxModel } from '../models/producttax.model';
import { ProducttaxUtilConverter } from '../converters/producttax.converter';

@Injectable()
export class ProductService extends ApiService {
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
	): Observable<ProductModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ProductConverter(),
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
				: this.environment.api.services + shopWarehouseList.product.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new ProductConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		productIn: ProductModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'product',
			ProductUtilConverter.toDto(productIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		productIn: ProductModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'product',
			ProductUtilConverter.toDto(productIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.delete;
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
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.addPrice;
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
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.editPrice;
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
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.addDiscount;
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
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_discount', id_discount);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.editDiscount;
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

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_discount', id_discount);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.deleteDiscount;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ------------------ TAX
	addTax(
		taxIn: ProducttaxModel,
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'tax',
			ProducttaxUtilConverter.toDto(taxIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.addTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	editTax(
		taxIn: ProducttaxModel,
		id: string,
		id_producttax: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'tax',
			ProducttaxUtilConverter.toDto(taxIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_producttax', id_producttax);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.editTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	deleteTax(
		id: string,
		id_producttax: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_product', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_producttax', id_producttax);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.product.deleteTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
