import { EnumDBType } from '../enums/db-type.enum';

/**Equivalente di DBPaginate su service */
export interface DBPaginateInterface {
	// type: EnumDBType.PAGINATE;
	limit: number; // 0
	page: number; // 1
}
