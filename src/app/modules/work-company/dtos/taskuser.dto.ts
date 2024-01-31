import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { ProjecttaskDTO } from './projecttask.dto';

export class TaskuserDTO extends ApiDTO {
	public cod: string;
	public role: string;
	public user: string;
	public user_fk: UserDTO;
	public task: string;
	public task_fk: ProjecttaskDTO;
}
