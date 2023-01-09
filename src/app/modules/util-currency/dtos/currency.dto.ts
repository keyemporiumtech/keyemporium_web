import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class CurrencyDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public symbol: string;
	public flgused: number;
	// added
	public iconimage: string; // base64
}
