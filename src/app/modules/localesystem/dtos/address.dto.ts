import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { NationDTO } from './nation.dto';
import { CityDTO } from './city.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';

export class AddressDTO extends ApiDTO {
	public cod: string;
	public street: string;
	public number: string;
	public zip: string;
	public city: string;
	public province: string;
	public region: string;
	public geo1: string;
	public geo2: string;
	public nation: string;
	public nation_fk: NationDTO;
	public cityid: string;
	public city_fk: CityDTO;
	public tpaddress: string;
	public tpaddress_fk: TypologicalDTO;
	// added
	public nation_val: string;
	public nation_cod: string;
	public city_val: string;
}
