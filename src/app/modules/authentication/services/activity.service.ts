import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ApplicationLoggerService,
	ApplicationStorageService,
	InnerStorageService,
	MessageService,
	TreeHtmlModel,
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
import { TreeConverter } from '../../api/cakeutils-be/converters/tree.converter';
import { TypologicalConverter } from '../../api/cakeutils-be/converters/typological.converter';
import { TypologicalModel } from '../../api/cakeutils-be/models/typological.model';
import { ApiService } from '../../api/cakeutils/base/api.service';
import { DbFilterInterface } from '../../api/cakeutils/interfaces/db-filter.interface';
import { DBOrderInterface } from '../../api/cakeutils/interfaces/db-order.interface';
import { RequestConditionInterface } from '../../api/cakeutils/interfaces/request-conditions.interface';
import { RequestGroupsConditionsInterface } from '../../api/cakeutils/interfaces/request-groups-conditions.interface';
import { RequestPaginatorInterface } from '../../api/cakeutils/interfaces/request-paginator.interface';
import { ApiServiceUtility } from '../../api/cakeutils/utility/api-service.utility';
import { RequestCakeUtility } from '../../api/cakeutils/utility/request-cake.utility';
import { authenticationList } from '../constants/authentication.list';
import { ActivityConverter, ActivityUtilConverter } from '../converters/activity.converter';
import { UserConverter } from '../converters/user.converter';
import { ActivityModel } from '../models/activity.model';

@Injectable()
export class ActivityService extends ApiService {
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
		piva?: string,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<ActivityModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'piva', piva);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.unique;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new ActivityConverter(),
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
				: this.environment.api.services + authenticationList.activity.paginate;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new ActivityConverter()),
			requestManager,
			responseManager,
		);
	}

	save(
		activityIn: ActivityModel,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'activity',
			ActivityUtilConverter.toDto(activityIn),
		);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.save;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	edit(
		activityIn: ActivityModel,
		id?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<string> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(
			body,
			EnumParamType.OBJECT,
			'activity',
			ActivityUtilConverter.toDto(activityIn),
		);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.edit;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	delete(
		id: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.delete;
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ---------------- TYPOLOGICAL
	tpactivity(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<TypologicalModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.tpactivity;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new TypologicalConverter()),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				return res ? res.list : [];
			}),
		);
	}

	tpcat(
		paginator: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<TypologicalModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.tpcat;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new TypologicalConverter()),
			requestManager,
			responseManager,
		).pipe(
			map((res) => {
				return res ? res.list : [];
			}),
		);
	}

	// ---------------- TREE
	tree(
		id_root: string,
		async?: boolean,
		filters?: DbFilterInterface[],
		orders?: DBOrderInterface[],
		fields?: string[],
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<TreeHtmlModel[]> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id_root);
		body = RequestUtility.addParam(body, EnumParamType.BOOLEAN, 'async', async);
		body = RequestUtility.addParam(body, EnumParamType.ARRAY, 'fields', fields);
		const paginator: RequestPaginatorInterface = {
			filters: filters,
			orders: orders,
			paginate: undefined,
		};
		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.tree;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new TreeConverter(),
			requestManager,
			responseManager,
		);
	}

	profile(
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<string> {
		const body: HttpParams = new HttpParams();

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.profile;
		responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, responseManager);
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager);
	}

	changeProfile(
		id?: string,
		piva?: string,
		id_user?: string,
		username?: string,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
	): Observable<boolean> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'piva', piva);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_user', id_user);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'username', username);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.changeProfile;
		responseManager = ApiServiceUtility.sendTokenBuildRM(this.applicationStorage, responseManager);
		return this.post(this.httpHeaders, url, body, undefined, undefined, responseManager).pipe(
			map((res) => (res === 1 ? true : false)),
		);
	}

	// ------------------ employers
	employers(
		id?: string,
		piva?: string,
		paginator?: RequestPaginatorInterface,
		conditions?: RequestConditionInterface,
		requestManager?: RequestManagerInterface,
		responseManager?: ResponseManagerInterface,
		conditionsGroup?: RequestGroupsConditionsInterface,
	): Observable<PaginatorModel> {
		let body: HttpParams = new HttpParams();

		body = RequestUtility.addParam(body, EnumParamType.STRING, 'id_activity', id);
		body = RequestUtility.addParam(body, EnumParamType.STRING, 'piva', piva);

		body = RequestCakeUtility.addPaginator(body, paginator);
		body = RequestCakeUtility.addConditions(body, conditions);
		body = RequestCakeUtility.addConditionsGroups(body, conditionsGroup);

		const url =
			requestManager && requestManager.url
				? requestManager.url
				: this.environment.api.services + authenticationList.activity.employers;
		return this.get(
			this.httpHeaders,
			url,
			body,
			new PaginatorConverter(new UserConverter()),
			requestManager,
			responseManager,
		);
	}
}
