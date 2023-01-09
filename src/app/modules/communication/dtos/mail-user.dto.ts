import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class MailUserDTO extends ApiDTO {
	public id_user?: string;
	public name?: string;
	public email?: string;
	public nickname?: string;
}
