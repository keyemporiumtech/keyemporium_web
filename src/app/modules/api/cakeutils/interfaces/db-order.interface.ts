import { EnumDBType } from '../enums/db-type.enum';

/**Equivalente di DBCondition su service */
export interface DBOrderInterface {
	// type: EnumDBType.ORDER;
	key: string;
	value: string;
}
