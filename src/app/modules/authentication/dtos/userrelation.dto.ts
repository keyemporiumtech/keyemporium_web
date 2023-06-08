import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';

export class UserrelationDTO extends ApiDTO {
	public cod: string;
	public user1: string;
	public user1_fk: UserDTO;
	public user2: string;
	public user2_fk: UserDTO;
	public tprelation: string;
	public tprelation_fk: TypologicalDTO;
	public inforelation1: string;
	public inforelation2: string;
}
