import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';

export class UserreportDTO extends ApiDTO {
	public codoperation: string;
	public description: string;
	public sessionid: string;
	public ip: string;
	public os: string;
	public browser: string;
	public browser_version: string;
	public user: string;
	public user_fk: UserDTO;
}
