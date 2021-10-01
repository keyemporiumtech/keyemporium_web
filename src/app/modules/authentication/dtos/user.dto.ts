import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class UserDTO extends ApiDTO {
	public username: string;
	public password: string;
	public passclean: string;
	public cf: string;
	public name: string;
	public surname: string;
	public sex: string;
	public born: string; // date
}
