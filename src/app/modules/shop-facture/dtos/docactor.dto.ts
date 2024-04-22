import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';
import { CityDTO } from '../../localesystem/dtos/city.dto';
import { NationDTO } from '../../localesystem/dtos/nation.dto';

export class DocactorDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public cf: string;
	public addresstext: string;
	public address: string;
	public address_fk: AddressDTO;
	public citytext: string;
	public city: string;
	public city_fk: CityDTO;
	public nation: string;
	public nation_fk: NationDTO;
	public zip: string;
	public flgsender: number;
	public flgreceiver: number;
	public tel: string;
	public fax: string;
	public email: string;
	// virtualfields
	public nation_val: string;
	public nation_cod: string;
	public city_val: string;
}
