import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class NationDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public capital: string;
	public continent: string;
	public currencycod: string;
	public tld: string;
	public type: string;
	public cod_iso3166: string;
	public geo1: string;
	public geo2: string;
	public tel: string;
	public flgiban: number; // boolean
	public flgused: number; // boolean
	public priority: number;
	public symbol: string;
	// added
	public iconimage: string; // base64
}
