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
import { PermissionModel } from '../models/permission.model';
import { PermissionConverter, PermissionUtilConverter } from '../converters/permission.converter';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { authenticationList } from '../constants/authentication.list';

@Injectable()
export class PermissionService extends ApiService {
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
	): Observable<PermissionModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_permission', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);
		body = RequestCakeUtility.addConditions(body, conditions);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.permission.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PermissionConverter(),
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
				: this.environment.api.services + authenticationList.permission.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new PermissionConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		permissionIn: PermissionModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'permission',
			PermissionUtilConverter.toDto(permissionIn),
		);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.permission.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		permissionIn: PermissionModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'permission',
			PermissionUtilConverter.toDto(permissionIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_permission', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.permission.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_permission', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.permission.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
