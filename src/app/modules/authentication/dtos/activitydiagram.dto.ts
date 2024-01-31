import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from './activity.dto';

export class ActivitydiagramDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public jsonmodel: string;
	public tpdiagram: string;
	public tpdiagram_fk: TypologicalDTO;
	public activity: string;
	public activity_fk: ActivityDTO;
}
