import { ApiDTO } from '../../api/cakeutils/base/api.dto';
import { ContactreferenceDTO } from '../../authentication/dtos/contactreference.dto';
import { UserDTO } from '../../authentication/dtos/user.dto';
import { AddressDTO } from '../../localesystem/dtos/address.dto';
import { AttachmentDTO } from '../../resources/dtos/attachment.dto';

export class ProfessionDTO extends ApiDTO {
	public cod: string;
	public name: string;
	public description: string;
	public user: string;
	public user_fk: UserDTO;
	public address: string;
	public address_fk: AddressDTO;
	public email: string;
	public email_fk: ContactreferenceDTO;
	public phone: string;
	public phone_fk: ContactreferenceDTO;
	public image: string;
	public image_fk: AttachmentDTO;
}
