import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';

export class ActivityprojectDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public dtainit: string;
	public dtaend: string;
	public activity: string;
	public activity_fk: ActivityDTO;
}
