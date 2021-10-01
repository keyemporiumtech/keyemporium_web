import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ProfileDTO } from './profile.dto';
import { PermissionDTO } from './permission.dto';

export class ProfilepermissionDTO extends ApiDTO {
	public cod: string;
	public profile: string;
	public profile_fk: ProfileDTO;
	public permission: string;
	public permission_fk: PermissionDTO;
}
