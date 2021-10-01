import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { WorkexperienceDTO } from './workexperience.dto';
import { WorkroleDTO } from './workrole.dto';

export class WorkexperienceroleDTO extends ApiDTO {
	public cod: string;
	public gg: number;
	public months: number;
	public role: string;
	public role_fk: WorkroleDTO;
	public experience: string;
	public experience_fk: WorkexperienceDTO;
}
