import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { WorkroleDTO } from '../../work-company/dtos/workrole.dto';
import { ProfessionDTO } from './profession.dto';

export class ProfessionroleDTO extends ApiDTO {
	public cod: string;
	public gg: number;
	public months: number;
	public role: string;
	public role_fk: WorkroleDTO;
	public profession: string;
	public profession_fk: ProfessionDTO;
}
