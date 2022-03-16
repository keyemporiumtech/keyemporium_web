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
import { BalanceModel } from '../models/balance.model';
import { BalanceConverter, BalanceUtilConverter } from '../converters/balance.converter';
import { PaymentModel } from '../models/payment.model';
import { PriceModel } from '../../shop-warehouse/models/price.model';
import { PaymentUtilConverter } from '../converters/payment.converter';
import { PriceUtilConverter } from '../../shop-warehouse/converters/price.converter';
import { BalanceFlowModel } from '../models/balance-flow.model';
import { BalanceFlowFilter } from '../dtos/balance-flow.filter';
import { BalanceFlowConverter } from '../converters/balance-flow.converter';

@Injectable()
export class BalanceService extends ApiService {
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
	): Observable<BalanceModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_balance', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.balance.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new BalanceConverter(),
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
				: this.environment.api.services + shopPaymentList.balance.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new BalanceConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		balanceIn: BalanceModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'balance',
			BalanceUtilConverter.toDto(balanceIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.balance.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		balanceIn: BalanceModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'balance',
			BalanceUtilConverter.toDto(balanceIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_balance', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.balance.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_balance', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.balance.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ------------------------- PAYMENTS
	addPayment(
		id: string,
		paymentIn?: PaymentModel,
		id_payment?: string,
		priceIn?: PriceModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'payment',
			PaymentUtilConverter.toDto(paymentIn),
		);
		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'price',
			PriceUtilConverter.toDto(priceIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_balance', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_payment', id_payment);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.balance.addPayment;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	payments(
		filtersIn: BalanceFlowFilter,
		id?: string,
		cod?: string,
		id_balances?: string[],
		cods?: string[],
		id_user?: string,
		username?: string,
		id_activity?: string,
		piva?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<BalanceFlowModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.OBJECT, 'filters', filtersIn);

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_balance', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestUtility.addParam(body, EnumParamType.ARRAY, 'id_balances', id_balances);
		body = RequestUtility.addParam(body, EnumParamType.ARRAY, 'cods', cods);

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id_activity);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'piva', piva);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopPaymentList.balance.payments;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new BalanceFlowConverter(),
			requestManager,
			responseManager,
		);
	}
}
