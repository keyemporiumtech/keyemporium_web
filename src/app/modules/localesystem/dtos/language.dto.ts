import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class LanguageDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public symbol: string;
	public flgused: number; // boolean
	// added
	public iconimage: string; // base64
	public country: string;
	public language: string;
	public locale: string;
	public currencycod: string;
	public currencysymbol: string;
}
