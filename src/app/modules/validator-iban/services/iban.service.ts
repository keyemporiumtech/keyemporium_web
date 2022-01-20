import {
	RequestManagerInterface,
	ResponseManagerInterface,
	RequestUtility,
	EnumParamType,
	PaginatorConverter,
} from '@ddc/rest';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { IbanModel } from '../models/iban.model';
import {
	ApplicationLoggerService,
	MessageService,
	ApplicationStorageService,
	InnerStorageService,
} from '@ddc/kit';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { Injectable } from '@angular/core';
import { validatorIbanList } from '../constants/validator-iban.list';
import { IbanConverter } from '../converters/iban.converter';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { map } from 'rxjs/operators';
import { NationModel } from '../../localesystem/models/nation.model';
import { NationConverter } from '../../localesystem/converters/nation.converter';
import { IbanResponseInterface } from '../interfaces/iban-response.interface';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';

@Injectable()
export class IbanService extends ApiService {
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

	iban(
		iban?: string,
		cod?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<IbanModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'iban', iban);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + validatorIbanList.iban.validator;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager).pipe(
			map((res: IbanResponseInterface) => {
				const converter = new IbanConverter();
				return res ? converter.convertToModel(res.payload) : undefined;
			}),
		);
	}

	validate(
		iban?: string,
		cod?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<IbanResponseInterface> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'iban', iban);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + validatorIbanList.iban.validator;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	// ---------------- TYPOLOGICAL
	tpiban(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<NationModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + validatorIbanList.iban.tpiban;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new NationConverter()),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				return res ? res.list : [];
			}),
		);
	}
}
