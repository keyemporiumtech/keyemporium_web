import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { NationDTO } from './nation.dto';

export class CityDTO extends ApiDTO {
	public cod: string;
	public countrycod: string;
	public postalcode: string;
	public place: string;
	public region: string;
	public regioncode: string;
	public province: string;
	public provincecode: string;
	public community: string;
	public communitycode: string;
	public geo1: string;
	public geo2: string;
	public nation: string;
	public nation_fk: NationDTO;
	// added
	public nation_val: string;
	public nation_cod: string;
	public filter_search: string;
}
