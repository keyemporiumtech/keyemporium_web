import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from './activity.dto';
import { UserDTO } from './user.dto';

export class ApplicationDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public keytoken: string;
	public activity: string;
	public activity_fk: ActivityDTO;
	public user: string;
	public user_fk: UserDTO;
}
