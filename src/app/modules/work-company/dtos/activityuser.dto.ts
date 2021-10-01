import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { WorkroleDTO } from './workrole.dto';

export class ActivityuserDTO extends ApiDTO {
	public cod: string;
	public activity: string;
	public activity_fk: ActivityDTO;
	public user: string;
	public user_fk: UserDTO;
	public role: string;
	public role_fk: WorkroleDTO;
}
