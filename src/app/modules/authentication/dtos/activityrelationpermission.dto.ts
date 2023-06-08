import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityrelationDTO } from './activityrelation.dto';
import { PermissionDTO } from './permission.dto';

export class ActivityrelationpermissionDTO extends ApiDTO {
	public cod: string;
	public activityrelation: string;
	public activityrelation_fk: ActivityrelationDTO;
	public permission: string;
	public permission_fk: PermissionDTO;
}
