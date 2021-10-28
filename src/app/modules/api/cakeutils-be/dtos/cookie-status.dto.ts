import { ApiDTO } from '../../cakeutils/base/api.dto';

export class CookieStatusDTO extends ApiDTO {
	public isNecessary?: number; // boolean
	public isPreference?: number; // boolean
	public isStatistic?: number; // boolean
	public isMarketing?: number; // boolean
	public isNotClassified?: number; // boolean
	public value?: number; // boolean
}
