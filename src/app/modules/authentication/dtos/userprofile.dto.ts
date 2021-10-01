import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';
import { ProfileDTO } from './profile.dto';

export class UserprofileDTO extends ApiDTO {
	public cod: string;
	public user: string;
	public user_fk: UserDTO;
	public profile: string;
	public profile_fk: ProfileDTO;
}
