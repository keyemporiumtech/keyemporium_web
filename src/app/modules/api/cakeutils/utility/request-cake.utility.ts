import { HttpParams } from '@angular/common/http';
import { RequestConditionInterface } from '../interfaces/request-conditions.interface';
import { RequestPaginatorInterface } from '../interfaces/request-paginator.interface';
import { RequestGroupsConditionsInterface } from '../interfaces/request-groups-conditions.interface';

export class RequestCakeUtility {
	static addConditions(httpParam: HttpParams, conditions: RequestConditionInterface): HttpParams {
		if (conditions) {
			httpParam = httpParam.append(
				'belongs',
				conditions.belongs ? JSON.stringify(conditions.belongs) : null,
			);
			httpParam = httpParam.append(
				'virtualfields',
				conditions.virtualfields ? JSON.stringify(conditions.virtualfields) : null,
			);
			httpParam = httpParam.append(
				'flags',
				conditions.flags ? JSON.stringify(conditions.flags) : null,
			);
			httpParam = httpParam.append(
				'properties',
				conditions.properties ? JSON.stringify(conditions.properties) : null,
			);
		}
		return httpParam;
	}

	static addPaginator(httpParam: HttpParams, paginator: RequestPaginatorInterface): HttpParams {
		if (paginator) {
			httpParam = httpParam.append(
				'filters',
				paginator.filters ? JSON.stringify(paginator.filters) : null,
			);
			httpParam = httpParam.append(
				'orders',
				paginator.orders ? JSON.stringify(paginator.orders) : null,
			);
			httpParam = httpParam.append(
				'paginate',
				paginator.paginate ? JSON.stringify(paginator.paginate) : null,
			);
		}
		return httpParam;
	}

	static addConditionsGroups(
		httpParam: HttpParams,
		conditions: RequestGroupsConditionsInterface,
	): HttpParams {
		if (conditions) {
			httpParam = httpParam.append(
				'groupssave',
				conditions.groupssave ? JSON.stringify(conditions.groupssave) : null,
			);
			httpParam = httpParam.append(
				'groupsdel',
				conditions.groupsdel ? JSON.stringify(conditions.groupsdel) : null,
			);
			httpParam = httpParam.append(
				'groups',
				conditions.groups ? JSON.stringify(conditions.groups) : null,
			);
			httpParam = httpParam.append(
				'likegroups',
				conditions.likegroups ? conditions.likegroups.toString() : null,
			);
		}
		return httpParam;
	}
}
