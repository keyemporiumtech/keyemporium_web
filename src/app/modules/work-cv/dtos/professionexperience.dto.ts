import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { WorkexperienceDTO } from '../../work-company/dtos/workexperience.dto';
import { ProfessionDTO } from './profession.dto';

export class ProfessionexperienceDTO extends ApiDTO {
	public cod: string;
	public profession: string;
	public profession_fk: ProfessionDTO;
	public experience: string;
	public experience_fk: WorkexperienceDTO;
}
