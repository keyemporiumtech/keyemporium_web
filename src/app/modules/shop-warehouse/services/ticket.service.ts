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
import { TicketModel } from '../models/ticket.model';
import { TicketConverter, TicketUtilConverter } from '../converters/ticket.converter';
import { PriceModel } from '../models/price.model';
import { PriceUtilConverter } from '../converters/price.converter';
import { DiscountModel } from '../models/discount.model';
import { DiscountUtilConverter } from '../converters/discount.converter';
import { TickettaxModel } from '../models/tickettax.model';
import { TickettaxUtilConverter } from '../converters/tickettax.converter';

@Injectable()
export class TicketService extends ApiService {
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
	): Observable<TicketModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.ticket.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new TicketConverter(),
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
				: this.environment.api.services + shopWarehouseList.ticket.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new TicketConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		ticketIn: TicketModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'ticket',
			TicketUtilConverter.toDto(ticketIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.ticket.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		ticketIn: TicketModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'ticket',
			TicketUtilConverter.toDto(ticketIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.ticket.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopWarehouseList.ticket.delete;
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
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.tickets + shopWarehouseList.ticket.addPrice;
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
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.tickets + shopWarehouseList.ticket.editPrice;
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
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.tickets + shopWarehouseList.ticket.addDiscount;
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
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_discount', id_discount);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.tickets + shopWarehouseList.ticket.editDiscount;
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

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_discount', id_discount);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.tickets + shopWarehouseList.ticket.deleteDiscount;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ------------------ TAX
	addTax(
		taxIn: TickettaxModel,
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'tax',
			TickettaxUtilConverter.toDto(taxIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.tickets + shopWarehouseList.ticket.addTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	editTax(
		taxIn: TickettaxModel,
		id: string,
		id_tickettax: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'tax',
			TickettaxUtilConverter.toDto(taxIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_tickettax', id_tickettax);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.tickets + shopWarehouseList.ticket.editTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	deleteTax(
		id: string,
		id_tickettax: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_ticket', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_tickettax', id_tickettax);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.tickets + shopWarehouseList.ticket.deleteTax;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
