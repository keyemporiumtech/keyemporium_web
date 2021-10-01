import { DbFilterInterface } from './db-filter.interface';
import { DBOrderInterface } from './db-order.interface';
import { DBPaginateInterface } from './db-paginate.interface';

export interface RequestPaginatorInterface {
	filters: DbFilterInterface[];
	orders: DBOrderInterface[];
	paginate: DBPaginateInterface;
}
