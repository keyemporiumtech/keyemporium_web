import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';
import { ProfessionDTO } from './profession.dto';

export class ProfessionschoolDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public profession: string;
	public profession_fk: ProfessionDTO;
	public institute: string;
	public institute_fk: ActivityDTO;
	public levelval: number;
	public levelmax: number;
	public leveldesc: string;
	public dtainit: string; // date
	public dtaend: string; // date
}
