import { UserDTO } from '../dtos/user.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';
import { ContactreferenceDTO } from '../dtos/contactreference.dto';
import { ApiDTO } from '../../api/cakeutils/base/api.dto';

export class SocialUserDTO extends ApiDTO {
	public id: string;
	public provider: string;
	public photoUrl: string;
	public authToken: string;
	public idToken: string;
	public authorizationCode: string;
	public user: UserDTO;
	public addresses: AddressDTO[];
	public phones: ContactreferenceDTO[];
}
