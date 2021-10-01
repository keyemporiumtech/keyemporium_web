import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { WorkexperienceDTO } from './workexperience.dto';
import { WorkskillDTO } from './workskill.dto';

export class WorkexperienceskillDTO extends ApiDTO {
	public cod: string;
	public gg: number;
	public months: number;
	public skill: string;
	public skill_fk: WorkskillDTO;
	public levelval: number;
	public experience: string;
	public experience_fk: WorkexperienceDTO;
}
