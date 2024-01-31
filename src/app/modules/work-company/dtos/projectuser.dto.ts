import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { ActivityprojectDTO } from './activityproject.dto';

export class ProjectuserDTO extends ApiDTO {
	public cod: string;
	public role: string;
	public user: string;
	public user_fk: UserDTO;
	public project: string;
	public project_fk: ActivityprojectDTO;
}
