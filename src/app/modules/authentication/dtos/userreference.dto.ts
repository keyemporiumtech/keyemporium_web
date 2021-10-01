import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { UserDTO } from './user.dto';
import { ContactreferenceDTO } from './contactreference.dto';
import { TypologicalDTO } from '../../api/cakeutils-be/dtos/typological.dto';

export class UserreferenceDTO extends ApiDTO {
	public cod: string;
	public flgprincipal: number; // boolean
	public user: string;
	public user_fk: UserDTO;
	public contactreference: string;
	public contactreference_fk: ContactreferenceDTO;
	public tpcontactreference: string;
	public tpcontactreference_fk: TypologicalDTO;
	public group: string;
}
