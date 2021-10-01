import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';
import { ProfileDTO } from '../../authentication/dtos/profile.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';

export class ActivityuserprofileDTO extends ApiDTO {
	public cod: string;
	public activity: string;
	public activity_fk: ActivityDTO;
	public user: string;
	public user_fk: UserDTO;
	public profile: string;
	public profile_fk: ProfileDTO;
}
