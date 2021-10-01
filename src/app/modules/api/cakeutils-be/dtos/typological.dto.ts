import { ApiDTO } from '../../cakeutils/base/api.dto';

export class TypologicalDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public symbol: string;
	public flgused: number; // boolean
	// added
	public iconimage: string; // base64
}
