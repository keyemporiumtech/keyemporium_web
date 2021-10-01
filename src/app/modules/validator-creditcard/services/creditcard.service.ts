import {
	RequestManagerInterface,
	ResponseManagerInterface,
	RequestUtility,
	EnumParamType,
	PaginatorConverter,
} from '@ddc/rest';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CreditcardModel } from '../models/creditcard.model';
import {
	ApplicationLoggerService,
	MessageService,
	ApplicationStorageService,
	InnerStorageService,
} from '@ddc/kit';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { Injectable } from '@angular/core';
import { validatorCreditcardList } from '../constants/validator-creditcard.list';
import { CreditcardConverter } from '../converters/creditcard.converter';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { map } from 'rxjs/operators';
import { CreditcardResponseInterface } from '../interfaces/creditcard-response.interface';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { TypologicalConverter } from '../../api/cakeutils-be/converters/typological.converter';

@Injectable()
export class CreditcardService extends ApiService {
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

	creditcard(
		creditcard: string,
		mm: string,
		yy: string,
		cvc: string,
		type?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<CreditcardModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'num_cc', creditcard);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'mm', mm);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'yy', yy);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cvc', cvc);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + validatorCreditcardList.creditcard.validator;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager).pipe(
			map((res: CreditcardResponseInterface) => {
				const converter = new CreditcardConverter();
				return res ? converter.convertToModel(res.payload) : undefined;
			}),
		);
	}

	validate(
		creditcard: string,
		mm: string,
		yy: string,
		cvc: string,
		type?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<CreditcardResponseInterface> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'num_cc', creditcard);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'mm', mm);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'yy', yy);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cvc', cvc);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'type', type);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + validatorCreditcardList.creditcard.validator;
		return this.get(this.httpHeaders, url, body, undefined, requestManager, responseManager);
	}

	// ---------------- TYPOLOGICAL
	tpcreditcard(
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<TypologicalModel[]> {
		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + validatorCreditcardList.creditcard.tpcreditcard;
		return this.getList(
			this.httpHeaders,
			url,
			new HttpParams(),
			new TypologicalConverter(),
			requestManager,
			responseManager,
		);
	}
}
