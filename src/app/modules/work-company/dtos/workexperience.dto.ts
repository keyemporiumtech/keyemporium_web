import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';
import { CityDTO } from '../../localesystem/dtos/city.dto';
import { NationDTO } from '../../localesystem/dtos/nation.dto';
import { WorkroleDTO } from './workrole.dto';

export class WorkexperienceDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
	public company: string;
	public company_fk: ActivityDTO;
	public role: string;
	public role_fk: WorkroleDTO;
	public place: string;
	public city: string;
	public city_fk: CityDTO;
	public nation: string;
	public nation_fk: NationDTO;
	public dtainit: string; // date
	public dtaend: string; // date
}
