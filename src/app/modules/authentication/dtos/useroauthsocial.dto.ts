import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';

export class UseroauthsocialDTO extends ApiDTO {
	public cod: string;
	public user: string;
	public user_fk: UserDTO;
	public tpsocialreference: string;
	public tpsocialreference_fk: TypologicalDTO;
	public oauthid: string;
}
