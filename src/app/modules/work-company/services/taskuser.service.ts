import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { WorkCompanyList } from '../constants/work-company.list';
import { TaskuserConverter, TaskuserUtilConverter } from '../converters/taskuser.converter';
import { TaskuserModel } from '../models/taskuser.model';

@Injectable()
export class TaskuserService extends ApiService {
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
	): Observable<TaskuserModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_taskuser', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'cod', cod);

		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + WorkCompanyList.taskuser.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new TaskuserConverter(),
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
				: this.environment.api.services + WorkCompanyList.taskuser.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new TaskuserConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		taskuserIn: TaskuserModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'taskuser',
			TaskuserUtilConverter.toDto(taskuserIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + WorkCompanyList.taskuser.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		taskuserIn: TaskuserModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'taskuser',
			TaskuserUtilConverter.toDto(taskuserIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_taskuser', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + WorkCompanyList.taskuser.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_taskuser', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + WorkCompanyList.taskuser.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}
}
