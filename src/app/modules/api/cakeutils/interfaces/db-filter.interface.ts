import { EnumDBType } from '../enums/db-type.enum';
import { EnumDBLike } from '../enums/db-like.enum';
import { EnumDBOperator } from '../enums/db-operator.enum';
import { EnumDBSign } from '../enums/db-sign.enum';

export interface DbFilterInterface {
	type: EnumDBType.CONDITION;
	operator: EnumDBOperator;
	key: string;
	value: any;
	sign: EnumDBSign;
	like: EnumDBLike;
	between: number[];
	children: DbFilterInterface[];
}
