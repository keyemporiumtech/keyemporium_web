import { ApiDTO } from '../../cakeutils/base/api.dto';

export class CookieDTO extends ApiDTO {
	public name?: string;
	public description?: string;
	public link?: string;
	public duration?: number;
	public durationDesc?: string;
	public protocol?: string;
	public type?: string; // EnumCookieType
	public value?: any; // any
	public hash?: number; // boolean
}
