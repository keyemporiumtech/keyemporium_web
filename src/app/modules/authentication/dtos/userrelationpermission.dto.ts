import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { PermissionDTO } from './permission.dto';
import { UserrelationDTO } from './userrelation.dto';

export class UserrelationpermissionDTO extends ApiDTO {
	public cod: string;
	public userrelation: string;
	public userrelation_fk: UserrelationDTO;
	public permission: string;
	public permission_fk: PermissionDTO;
	public direction: number;
}
