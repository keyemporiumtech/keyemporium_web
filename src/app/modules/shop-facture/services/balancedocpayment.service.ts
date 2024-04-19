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
import { shopFactureList } from '../constants/shop-facture.list';
import { BalancedocpaymentModel } from '../models/balancedocpayment.model';
import {
	BalancedocpaymentConverter,
	BalancedocpaymentUtilConverter,
} from '../converters/balancedocpayment.converter';

@Injectable()
export class BalancedocpaymentService extends ApiService {
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
	): Observable<BalancedocpaymentModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_balancedocpayment', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopFactureList.balancedocpayment.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new BalancedocpaymentConverter(),
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
				: this.environment.api.services + shopFactureList.balancedocpayment.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new BalancedocpaymentConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		balancedocpaymentIn: BalancedocpaymentModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'balancedocpayment',
			BalancedocpaymentUtilConverter.toDto(balancedocpaymentIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopFactureList.balancedocpayment.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		balancedocpaymentIn: BalancedocpaymentModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'balancedocpayment',
			BalancedocpaymentUtilConverter.toDto(balancedocpaymentIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_balancedocpayment', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopFactureList.balancedocpayment.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_balancedocpayment', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + shopFactureList.balancedocpayment.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
