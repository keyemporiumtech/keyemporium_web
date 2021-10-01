import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class WorkskillDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public tpskill: string;
	public tpskill_fk: TypologicalDTO;
	public levelmax: number;
	public leveldesc: string;
}
