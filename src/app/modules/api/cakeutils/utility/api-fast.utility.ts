import { DbFilterInterface } from '../interfaces/db-filter.interface';
import { DBOrderInterface } from '../interfaces/db-order.interface';
import { RequestPaginatorInterface } from '../interfaces/request-paginator.interface';
import { DBPaginateInterface } from '../interfaces/db-paginate.interface';

export class ApiFast {
	static queryField(key: string, value: any): DbFilterInterface {
		return {
			type: 0,
			operator: null,
			key: key,
			value: value,
			sign: null,
			like: null,
			between: [],
			children: [],
		};
	}

	static paginatorList(
		filters?: DbFilterInterface[],
		orders?: DBOrderInterface[],
		paginate?: DBPaginateInterface,
	): RequestPaginatorInterface {
		return {
			filters: filters,
			orders: orders,
			paginate: paginate,
		};
	}
}
