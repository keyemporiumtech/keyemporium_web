import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';

export class ConfirmoperationDTO extends ApiDTO {
	public codoperation: string;
	public description: string;
	public phone: string;
	public codsms: string;
	public email: string;
	public codemail: string;
	public user: string;
	public user_fk: UserDTO;
	public token: string;
	public flgaccepted: number; // boolean
	public flgclosed: number; // boolean
}
