import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { WorkskillDTO } from '../../work-company/dtos/workskill.dto';
import { ProfessionDTO } from './profession.dto';

export class ProfessionskillDTO extends ApiDTO {
	public cod: string;
	public gg: number;
	public months: number;
	public skill: string;
	public skill_fk: WorkskillDTO;
	public levelval: number;
	public profession: string;
	public profession_fk: ProfessionDTO;
}
