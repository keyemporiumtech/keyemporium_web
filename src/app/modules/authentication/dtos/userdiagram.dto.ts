import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';

export class UserdiagramDTO extends ApiDTO {
	public cod: string;
	public title: string;
	public jsonmodel: string;
	public tpdiagram: string;
	public tpdiagram_fk: TypologicalDTO;
	public user: string;
	public user_fk: UserDTO;
}
