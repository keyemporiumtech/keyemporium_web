import { InputQueryInterface } from '@ddc/rest';
import { RequestConditionInterface } from './request-conditions.interface';

export interface ApiInputQueryInterface extends InputQueryInterface {
	conditions?: RequestConditionInterface;
}
