import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ActivityDTO } from './activity.dto';
import { UserDTO } from './user.dto';

export class ActivityrelationDTO extends ApiDTO {
	public cod: string;
	public user: string;
	public user_fk: UserDTO;
	public activity: string;
	public activity_fk: ActivityDTO;
	public tprelation: string;
	public tprelation_fk: TypologicalDTO;
	public inforelationuser: string;
	public inforelationactivity: string;
}
