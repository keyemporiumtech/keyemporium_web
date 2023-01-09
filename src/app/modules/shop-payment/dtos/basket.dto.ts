import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { ActivityDTO } from '../../authentication/dtos/activity.dto';

export class BasketDTO extends ApiDTO {
	public cod: string;
	public website: string;
	public title: string;
	public flgclosed: number;
	public flgreserve: number;
	public user: string;
	public user_fk: UserDTO;
	public activity: string;
	public activity_fk: ActivityDTO;
	public email: string;
	public phone: string;
	public emailto: string;
	public phoneto: string;
	public strto: string;
	public note: string;
}
