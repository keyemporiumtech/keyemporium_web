import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';
import { WorkexperienceDTO } from './workexperience.dto';

export class WorkexperiencecompanyDTO extends ApiDTO {
	public cod: string;
	public company: string;
	public company_fk: ActivityDTO;
	public experience: string;
	public experience_fk: WorkexperienceDTO;
}
