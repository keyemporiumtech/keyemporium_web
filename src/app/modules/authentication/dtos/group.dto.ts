import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';
import { ActivityDTO } from './activity.dto';

export class GroupDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public description: string;
	public user: string;
	public user_fk: UserDTO;
	public activity: string;
	public activity_fk: ActivityDTO;
	public symbol: string;
	public flgused: number; // boolean
}
