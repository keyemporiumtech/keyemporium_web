import { ObjectUtility } from '@ddc/kit';
import { QueryUtility } from '@ddc/rest';
import { ApiInputQueryInterface } from '../interfaces/api-input-query.interface';
import { RequestConditionInterface } from '../interfaces/request-conditions.interface';

export class ApiQueryUtility extends QueryUtility {
	static fnConditions(
		inputQuery: ApiInputQueryInterface,
		...conditionsDefault: RequestConditionInterface[]
	): RequestConditionInterface {
		if (inputQuery && inputQuery.conditions) {
			return ObjectUtility.mergeDeep({}, ...conditionsDefault, inputQuery.conditions);
		} else if (conditionsDefault && conditionsDefault.length) {
			return ObjectUtility.mergeDeep({}, ...conditionsDefault);
		}
		return undefined;
	}
}
