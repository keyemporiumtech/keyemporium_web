import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from './activity.dto';
import { ProfileDTO } from './profile.dto';

export class ActivityprofileDTO extends ApiDTO {
	public cod: string;
	public activity: string;
	public activity_fk: ActivityDTO;
	public profile: string;
	public profile_fk: ProfileDTO;
}
