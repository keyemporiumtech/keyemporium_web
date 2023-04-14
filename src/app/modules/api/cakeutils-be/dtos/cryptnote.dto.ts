import { ApiDTO } from '../../cakeutils/base/api.dto';

export class CryptnoteDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
	public crypt: string;
	public symbol: string;
	public flgused: number; // boolean
}
