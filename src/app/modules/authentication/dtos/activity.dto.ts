import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';

export class ActivityDTO extends ApiDTO {
	public name: string;
	public namecod: string;
	public description: string;
	public piva: string;
	public born: string; // date
	public tpactivity: string;
	public tpactivity_fk: TypologicalDTO;
	public tpcat: string;
	public tpcat_fk: TypologicalDTO;
	public parent_id: string;
	public parent_fk: ActivityDTO;
	public lft: string;
	public rght: string;
}
