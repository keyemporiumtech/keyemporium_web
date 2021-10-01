import { HttpClient, HttpParams } from '@angular/common/http';
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
import { ProfileModel } from '../models/profile.model';
import { ProfileConverter, ProfileUtilConverter } from '../converters/profile.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { authenticationList } from '../constants/authentication.list';

@Injectable()
export class ProfileService extends ApiService {
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
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<ProfileModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_profile', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestCakeUtility.addConditions(body, conditions);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.profile.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ProfileConverter(),
			requestManager,
			responseManager,
		);
	}

	paginate(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<PaginatorModel> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.profile.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new ProfileConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		profileIn: ProfileModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'profile',
			ProfileUtilConverter.toDto(profileIn),
		);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.profile.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		profileIn: ProfileModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'profile',
			ProfileUtilConverter.toDto(profileIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_profile', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.profile.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_profile', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.profile.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
